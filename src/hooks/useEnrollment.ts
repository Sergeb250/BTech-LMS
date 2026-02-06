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

  // Old useEffect removed due to open access overwrite below


  const isBypassUser = (email?: string | null) => {
    const bypassEmails = [
      'hacksergeb@gmail.com',
      'intarefiston09@gmail.com'
    ];
    // The user provided config string: 'hacksergeb@gmail.com{123456)', 'intarefiston09@gmail.com pass{fiston2026)'
    // We just need the email part for checking.
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
    // ---------------------------------------------------------
    // FORCE UNLOCKED MODE (Guest Access)
    // ---------------------------------------------------------
    // We simply ignore Supabase and grant full access.

    setEnrollment({
      id: 'guest-enrollment',
      course_id: 'ccna-200-301',
      user_id: user?.id || 'guest',
      enrolled_at: new Date().toISOString(),
      is_active: true,
      payment_verified: true, // <--- KEY: Always true
      unlock_code: 'GUEST-ACCESS'
    });
    setCourseLocked(false); // <--- KEY: Always unlocked
    setLoading(false);
  };

  // Auto-fetch on mount, regardless of auth state
  useEffect(() => {
    fetchEnrollment();
  }, []); // Run once on mount

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
