import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { courseDays } from '@/data/courseData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';

interface CourseSidebarProps {
    currentDay: number;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({ currentDay }) => {
    const navigate = useNavigate();
    const { isDayUnlocked, completedDays } = useCourseProgress();

    return (
        <div className="h-[calc(100vh-80px)] w-80 border-r bg-muted/10 hidden lg:flex flex-col sticky top-20">
            <div className="p-4 border-b bg-background">
                <h2 className="font-semibold text-lg">Course Content</h2>
                <p className="text-sm text-muted-foreground">{courseDays.length} Days • 6 Parts</p>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-2">
                    {courseDays.map((day) => {
                        const isLocked = !isDayUnlocked(day.dayNumber);
                        const isCompleted = completedDays.includes(day.dayNumber);
                        const isActive = currentDay === day.dayNumber;

                        return (
                            <button
                                key={day.dayNumber}
                                disabled={isLocked}
                                onClick={() => navigate(`/lesson/${day.dayNumber}`)}
                                className={cn(
                                    "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "hover:bg-muted",
                                    isLocked && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                )}
                            >
                                <div className="mt-0.5 shrink-0">
                                    {isCompleted ? (
                                        <CheckCircle className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-green-600")} />
                                    ) : isLocked ? (
                                        <Lock className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                        <PlayCircle className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-primary")} />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={cn("text-sm font-medium leading-none mb-1", isActive ? "text-primary-foreground" : "")}>
                                        Day {day.dayNumber}: {day.title}
                                    </p>
                                    <p className={cn("text-xs truncate", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>
                                        {day.videos.length} Lessons
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
};
