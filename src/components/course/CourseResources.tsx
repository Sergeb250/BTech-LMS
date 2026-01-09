import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, ExternalLink, Lock, BookOpen, FileQuestion } from 'lucide-react';
import { courseFiles } from '@/data/courseData';

interface CourseResourcesProps {
  isEnrolled: boolean;
}

export const CourseResources: React.FC<CourseResourcesProps> = ({ isEnrolled }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'book': return BookOpen;
      case 'labs': return Download;
      case 'questions': return FileQuestion;
      default: return FileText;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courseFiles.map((resource) => {
            const Icon = getIcon(resource.type);
            return (
              <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{resource.title}</h4>
                    <p className="text-xs text-muted-foreground capitalize">{resource.type} • {resource.description}</p>
                  </div>
                </div>

                {isEnrolled ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                ) : (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
