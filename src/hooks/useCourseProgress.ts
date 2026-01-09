import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollment } from '@/hooks/useEnrollment';
import { courseDays } from '@/data/courseData';
import { getQuizForDay } from '@/data/quizData';

export const useCourseProgress = () => {
    const { user } = useAuth();
    const { courseLocked } = useEnrollment();
    const [completedDays, setCompletedDays] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchProgress();
        } else {
            setCompletedDays([]);
            setLoading(false);
        }
    }, [user]);

    const fetchProgress = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // 1. Fetch Lesson Progress to check if videos are watched
            const { data: lessonData, error: lessonError } = await supabase
                .from('lesson_progress')
                .select('day_number, video_id, completed')
                .eq('user_id', user.id)
                .eq('completed', true);

            if (lessonError) throw lessonError;

            // 2. Fetch Quiz Progress
            const { data: quizData, error: quizError } = await supabase
                .from('quiz_attempts')
                .select('day_number, passed')
                .eq('user_id', user.id)
                .eq('passed', true);

            if (quizError) throw quizError;

            // 3. Compute Completed Days
            // A day is completed if:
            // a) All videos for that day are in lessonData
            // b) The quiz for that day is in quizData (if quiz exists)

            const completedDayNumbers: number[] = [];

            courseDays.forEach(day => {
                const dayVideos = day.videos;
                const videosWatched = dayVideos.every(v =>
                    (lessonData || []).some(ld => ld.day_number === day.dayNumber && ld.video_id === v.id)
                );

                const dayQuiz = getQuizForDay(day.dayNumber);
                const quizPassed = dayQuiz ? (quizData || []).some(qd => qd.day_number === day.dayNumber) : true; // If no quiz, considered passed

                if (videosWatched && quizPassed) {
                    completedDayNumbers.push(day.dayNumber);
                }
            });

            // Merge with passed quizzes (since a day is only truly "complete" if quiz is passed)
            // For now, we are just using lesson_progress for "completedDays" in the UI often, 
            // but strict locking uses both. Let's make completedDays be the set of days where logic is satisfied.

            const realCompletedDays = Array.from(new Set(completedDayNumbers));

            // Inject Admin Progress
            if (user.email === 'hacksergeb@gmail.com') {
                // Mark 1-63 as complete
                for (let i = 1; i <= 63; i++) {
                    if (!realCompletedDays.includes(i)) realCompletedDays.push(i);
                }
            }
            if (user.email === 'intarefiston09@gmail.com') {
                // Mark 1-18 as complete
                for (let i = 1; i <= 18; i++) {
                    if (!realCompletedDays.includes(i)) realCompletedDays.push(i);
                }
            }

            setCompletedDays(realCompletedDays);

        } catch (error) {
            console.error("Error fetching course progress:", error);
        } finally {
            setLoading(false);
        }
    };

    const isDayUnlocked = (dayNumber: number): boolean => {
        if (dayNumber === 1) return true; // Day 1 always unlocked

        // Check for specific user overrides
        if (user?.email === 'hacksergeb@gmail.com') {
            if (dayNumber <= 63) return true;
        }

        if (user?.email === 'intarefiston09@gmail.com') {
            // For this user, enforce lock after day 18, even if they have progress (if strict payment lock is desired)
            // or just ensure they are unlocked UP TO 18.
            // Request said: "unlock course up to day 18... Lock platfom for user intarefiston09@gmail.com"
            // This implies standard behavior (free trial) applies, but we ensure it's unlocked.
            // Standard behavior unlocks 1-18. So we just need to make sure we don't accidentally lock 1-18.
            if (dayNumber <= 18) return true;
        }

        // Check if previous day is completed
        const prevDayCompleted = completedDays.includes(dayNumber - 1);

        // Also check global course lock (payment)
        // If courseLocked is true, days > 18 are locked regardless of progress
        if (courseLocked && dayNumber > 18) {
            // Explicitly unlock for hacksergeb even if payment is required (already handled above)
            return false;
        }

        return prevDayCompleted;
    };

    return {
        completedDays,
        isDayUnlocked,
        loading,
        refetch: fetchProgress
    };
};
