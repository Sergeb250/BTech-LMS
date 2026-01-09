import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, Play, BookOpen, FlaskConical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Day as CourseDay } from '@/data/courseData';

interface DayCardProps {
  day: CourseDay;
  isCompleted: boolean;
  isLocked: boolean;
  onClick: () => void;
  index: number;
}

export const DayCard: React.FC<DayCardProps> = ({ day, isCompleted, isLocked, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all hover:shadow-lg group relative overflow-hidden border-l-4",
          isLocked ? "opacity-75 bg-muted/50 border-l-muted-foreground" :
            isCompleted ? "border-l-green-500 bg-green-50/10" : "border-l-primary hover:border-l-8"
        )}
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <Badge variant={isLocked ? "secondary" : isCompleted ? "success" : "default"} className={cn("mb-2", isCompleted && "bg-green-100 text-green-800 hover:bg-green-100")}>
              Day {day.dayNumber}
            </Badge>
            {isCompleted ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            ) : isLocked ? (
              <Lock className="text-muted-foreground w-5 h-5" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Play className="w-4 h-4 ml-0.5" />
              </div>
            )}
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {day.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{day.videos.filter(v => v.type === 'lesson').length} Lessons</span>
            </div>
            {day.videos.some(v => v.type === 'lab') && (
              <div className="flex items-center gap-1">
                <FlaskConical className="w-4 h-4" />
                <span>Labs</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
