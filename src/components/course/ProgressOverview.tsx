import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { courseInfo } from '@/data/courseData';
import { Trophy, Calendar, Clock, TrendingUp } from 'lucide-react';

interface ProgressOverviewProps {
  completedDays: number[];
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({ completedDays }) => {
  // Ensure completedDays is an array
  const safeCompletedDays = Array.isArray(completedDays) ? completedDays : [];
  const progressPercentage = Math.round((safeCompletedDays.length / courseInfo.totalDays) * 100);
  const unlockedDays = Math.min(safeCompletedDays.length + 1, courseInfo.totalDays);
  const remainingDays = courseInfo.totalDays - safeCompletedDays.length;

  const stats = [
    {
      label: 'Progress',
      value: `${progressPercentage}%`,
      icon: TrendingUp,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      label: 'Completed',
      value: `${safeCompletedDays.length}/${courseInfo.totalDays}`,
      icon: Trophy,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Unlocked',
      value: `${unlockedDays} Days`,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Remaining',
      value: `${remainingDays} Days`,
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">
            {progressPercentage === 100
              ? "🎉 Congratulations! You've completed the course!"
              : `${remainingDays} days remaining to complete the course`
            }
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                <div className={`p-2 rounded-full ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="font-bold text-sm leading-none mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
