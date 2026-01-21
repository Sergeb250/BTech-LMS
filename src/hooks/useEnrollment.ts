import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { courseInfo } from '@/data/courseData';

interface Enrollment {
  id: string;
  course_id: string;
  enrolled_at: string;
  is_active: boolean;
  payment_verified: boolean;
  user_id: string;
  unlock_code?: string;
}

export const useEnrollment = () => {
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [courseLocked, setCourseLocked] = useState(false);

  useEffect(() => {
    if (user) {
      fetchEnrollment();
    } else {
      setEnrollment(null);
      setCourseLocked(false);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const isBypassUser = (email?: string | null) => {
    const bypassEmails = ['hacksergeb@gmail.com', 'intarefiston09@gmail.com'];
    return !!email && bypassEmails.includes(email.toLowerCase());
  };

  const makeBypassEnrollment = (): Enrollment => ({
    id: 'admin-override',
    course_id: 'ccna-200-301',
    user_id: user!.id,
    enrolled_at: new Date().toISOString(),
    is_active: true,
    payment_verified: true,
    unlock_code: 'ADMIN-BYPASS'
  });

  const fetchEnrollment = async () => {
    if (!user) return;

    try {
      // ---------------------------------------------------------
      // ADMIN BYPASS (Hacksergeb + Intare Fiston)
      // ---------------------------------------------------------
      if (isBypassUser(user.email)) {
        setEnrollment(makeBypassEnrollment());
        setCourseLocked(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', 'ccna-200-301')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching enrollment:', error);
      }

      setEnrollment(data);

      // ---------------------------------------------------------
      // OFFLINE LOCAL OVERRIDE
      // ---------------------------------------------------------
      const localOverride = localStorage.getItem(`payment_verified_${user.id}`);
      const isLocalVerified = localOverride === 'true';
      const effectivePaymentVerified = !!(data?.payment_verified || isLocalVerified);

      // Sync local -> state
      if (isLocalVerified && data && !data.payment_verified) {
        data.payment_verified = true;
        setEnrollment({ ...(data as Enrollment) });
      } else if (isLocalVerified && !data) {
        setEnrollment({
          id: 'local-override',
          course_id: 'ccna-200-301',
          user_id: user.id,
          enrolled_at: new Date().toISOString(),
          is_active: true,
          payment_verified: true,
          unlock_code: 'OFFLINE-MODE'
        });
      }

      // ---------------------------------------------------------
      // RECURRING PAYMENT LOGIC (GENERAL USERS)
      // ---------------------------------------------------------
      let isSubscriptionExpired = false;
      const now = new Date();
      const enrolledDate = data?.enrolled_at ? new Date(data.enrolled_at) : new Date(0);

      // General User Logic: 30-day Rolling Window
      const expirationDate = new Date(enrolledDate);
      expirationDate.setDate(expirationDate.getDate() + 30);

      if (now > expirationDate) {
        isSubscriptionExpired = true;
      }

      // ---------------------------------------------------------
      // DETERMINE LOCK STATUS
      // ---------------------------------------------------------
      // Course is locked IF:
      // 1) Never paid (server/local)
      // OR
      // 2) Subscription expired
      if (!effectivePaymentVerified || isSubscriptionExpired) {
        setCourseLocked(true);
      } else {
        setCourseLocked(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setCourseLocked(true);
    } finally {
      setLoading(false);
    }
  };

  const enroll = async () => {
    if (!user) return { error: new Error('Not authenticated') };

    // If bypass user, instantly enroll locally without touching DB
    if (isBypassUser(user.email)) {
      setEnrollment(makeBypassEnrollment());
      setCourseLocked(false);
      return { error: null };
    }

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: 'ccna-200-301',
          enrolled_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setEnrollment(data);
      return { error: null };
    } catch (error) {
      console.error('Error enrolling:', error);
      return { error: error as Error };
    }
  };

  const verifyUnlockCode = async (code: string) => {
    if (!user) return { success: false };

    // If bypass user, always succeed without asking for payment / DB
    if (isBypassUser(user.email)) {
      setEnrollment(makeBypassEnrollment());
      setCourseLocked(false);
      return { success: true };
    }

    if (!enrollment) return { success: false };

    if (courseInfo.unlockCodes.includes(code.toUpperCase())) {
      try {
        const newEnrolledAt = new Date();

        const { error } = await supabase
          .from('enrollments')
          .update({
            payment_verified: true,
            unlock_code: code,
            enrolled_at: newEnrolledAt.toISOString()
          })
          .eq('id', enrollment.id);

        if (error) throw error;

        setEnrollment({
          ...enrollment,
          payment_verified: true,
          unlock_code: code,
          enrolled_at: newEnrolledAt.toISOString()
        });

        setCourseLocked(false);
        return { success: true };
      } catch (error) {
        console.error('Error verifying code:', error);

        // Fail-Safe: Offline Mode
        console.warn('Server error detected. Enabling offline access mode.');
        localStorage.setItem(`payment_verified_${user.id}`, 'true');

        setEnrollment({ ...enrollment, payment_verified: true });
        setCourseLocked(false);
        return { success: true };
      }
    }

    return { success: false };
  };

  return {
    enrollment,
    loading,
    courseLocked,
    enroll,
    verifyUnlockCode,
    refetch: fetchEnrollment
  };
};
