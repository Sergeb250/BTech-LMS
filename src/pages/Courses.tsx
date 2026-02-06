import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollment } from '@/hooks/useEnrollment';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DayCard } from '@/components/course/DayCard';
import { ProgressOverview } from '@/components/course/ProgressOverview';
import { CourseResources } from '@/components/course/CourseResources';
import { PaymentModal } from '@/components/course/PaymentModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { courseDays, courseInfo } from '@/data/courseData';
import { Lock, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Courses = () => {
  const { user } = useAuth();
  const { enrollment, courseLocked, verifyUnlockCode } = useEnrollment();
  const { completedDays, isDayUnlocked } = useCourseProgress();
  const navigate = useNavigate();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPart, setSelectedPart] = useState('all');

  const parts = Array.from(new Set(courseDays.map(day => day.part)));

  const filteredDays = selectedPart === 'all'
    ? courseDays
    : courseDays.filter(day => day.part === selectedPart);

  const handleDayClick = (dayNumber: number) => {
    // Always allow access to Day 65 (Goal)
    if (dayNumber === 65 || isDayUnlocked(dayNumber)) {
      navigate(`/lesson/${dayNumber}`);
    } else {
      if (courseLocked && dayNumber > 18) {
        setShowPaymentModal(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-1">
        {!enrollment ? (
          /* Not Enrolled View */
          <div className="max-w-4xl mx-auto text-center py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold mb-4">{courseInfo.title}</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {courseInfo.description}
              </p>
              <Button size="lg" className="h-12 px-8 text-lg" onClick={() => setShowPaymentModal(true)}>
                Enroll Now
              </Button>
            </motion.div>
          </div>
        ) : (
          /* Enrolled Dashboard View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {courseLocked && (
                <Alert variant="destructive" className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200">
                  <ShieldAlert className="h-4 w-4 stroke-amber-600 dark:stroke-amber-400" />
                  <AlertTitle className="text-amber-800 dark:text-amber-300 font-bold">Payment Required</AlertTitle>
                  <AlertDescription className="flex items-center justify-between flex-wrap gap-4 mt-1">
                    <span>Your free trial has ended. Please complete payment to verify your account.</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent border-amber-500/50 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-200"
                      onClick={() => setShowPaymentModal(true)}
                    >
                      Pay Now
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{courseInfo.title}</h1>
                  <p className="text-muted-foreground mt-1">{courseInfo.totalDays} days of comprehensive training</p>
                </div>
              </div>

              <Tabs defaultValue="all" value={selectedPart} onValueChange={setSelectedPart} className="w-full">
                <TabsList className="w-full justify-start h-auto flex-wrap p-2 gap-2 bg-muted/50">
                  <TabsTrigger value="all" className="rounded-md">All Parts</TabsTrigger>
                  {parts.map(part => (
                    <TabsTrigger key={part} value={part} className="rounded-md">{part}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDays.map((day, index) => {
                  // Special handling for Day 65 (Goal) - Always unlocked
                  const isGoalDay = day.dayNumber === 65;
                  const locked = isGoalDay ? false : !isDayUnlocked(day.dayNumber);

                  return (
                    <DayCard
                      key={day.dayNumber}
                      day={day}
                      index={index}
                      isCompleted={completedDays.includes(day.dayNumber)}
                      isLocked={locked}
                      onClick={() => handleDayClick(day.dayNumber)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 space-y-6">
                <ProgressOverview completedDays={completedDays} />
                <CourseResources isEnrolled={!!enrollment} />
              </div>
            </div>
          </div>
        )}
      </main>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onVerify={verifyUnlockCode}
      />
      <Footer />
    </div>
  );
};

export default Courses;
