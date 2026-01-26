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
import { Lock, ShieldAlert, Sparkles, BookOpen, LogIn } from 'lucide-react';
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
    if (!user) {
      navigate('/auth?mode=signin');
      return;
    }

    if (isDayUnlocked(dayNumber)) {
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
        {/* Banner for Non-Authenticated Users */}
        {!user && (
          <div className="mb-8 p-6 bg-primary/5 rounded-xl border border-primary/20 text-center">
            <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to {courseInfo.title}</h1>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore the curriculum below. Sign in to track your progress and access the full course content.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/auth?mode=signup')}>
                Start for Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/auth?mode=signin')}>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Payment Alert for Enrolled but Locked Users */}
            {user && enrollment && courseLocked && (
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

            {/* Enrollment Banner for Authenticated but Not Enrolled Users */}
            {user && !enrollment && (
              <Alert className="bg-primary/5 border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <AlertTitle className="font-bold text-primary">Free Access Active</AlertTitle>
                <AlertDescription className="flex items-center justify-between flex-wrap gap-4 mt-1">
                  <span>You have access to the first 18 days of the course. Enroll fully to unlock everything.</span>
                  <Button size="sm" onClick={() => setShowPaymentModal(true)}>Enroll Now</Button>
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
              {filteredDays.map((day, index) => (
                <DayCard
                  key={day.dayNumber}
                  day={day}
                  index={index}
                  isCompleted={completedDays.includes(day.dayNumber)}
                  isLocked={!isDayUnlocked(day.dayNumber)}
                  onClick={() => handleDayClick(day.dayNumber)}
                />
              ))}
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
