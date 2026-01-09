import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface LessonProgress {
  day_number: number;
  video_id: string;
  watch_percentage: number;
  completed: boolean;
}

export const useLessonProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgress();
    } else {
      setProgress([]);
      setLoading(false);
    }
  }, [user]);

  const fetchProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('day_number, video_id, watch_percentage, completed')
        .eq('user_id', user.id);

      if (error) throw error;

      setProgress(data || []);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (dayNumber: number, videoId: string, watchPercentage: number) => {
    if (!user) return;

    const completed = watchPercentage >= 90;

    try {
      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          day_number: dayNumber,
          video_id: videoId,
          watch_percentage: watchPercentage,
          completed,
          completed_at: completed ? new Date().toISOString() : null
        }, {
          onConflict: 'user_id,day_number,video_id'
        });

      if (error) throw error;

      // Update local state
      setProgress(prev => {
        const existing = prev.find(p => p.day_number === dayNumber && p.video_id === videoId);
        if (existing) {
          return prev.map(p => 
            p.day_number === dayNumber && p.video_id === videoId
              ? { ...p, watch_percentage: watchPercentage, completed }
              : p
          );
        }
        return [...prev, { day_number: dayNumber, video_id: videoId, watch_percentage: watchPercentage, completed }];
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const isDayCompleted = (dayNumber: number, totalVideos: number): boolean => {
    const dayProgress = progress.filter(p => p.day_number === dayNumber && p.completed);
    return dayProgress.length >= totalVideos;
  };

  const getCompletedDays = (): number[] => {
    const completedDays = new Set<number>();
    progress.forEach(p => {
      if (p.completed) completedDays.add(p.day_number);
    });
    return Array.from(completedDays);
  };

  const getVideoProgress = (dayNumber: number, videoId: string): number => {
    const videoProgress = progress.find(p => p.day_number === dayNumber && p.video_id === videoId);
    return videoProgress?.watch_percentage || 0;
  };

  const isVideoCompleted = (dayNumber: number, videoId: string): boolean => {
    const videoProgress = progress.find(p => p.day_number === dayNumber && p.video_id === videoId);
    return videoProgress?.completed || false;
  };

  return {
    progress,
    loading,
    updateProgress,
    isDayCompleted,
    getCompletedDays,
    getVideoProgress,
    isVideoCompleted,
    refetch: fetchProgress
  };
};
