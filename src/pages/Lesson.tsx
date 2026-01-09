import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollment } from '@/hooks/useEnrollment';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VideoPlayer } from '@/components/course/VideoPlayer';
import { PaymentModal } from '@/components/course/PaymentModal';
import { Quiz } from '@/components/course/Quiz';
import { Certificate } from '@/components/course/Certificate';
import { courseDays } from '@/data/courseData';
import { getQuizForDay } from '@/data/quizData';
import { supabase } from '@/integrations/supabase/client';
import { CourseSidebar } from '@/components/course/CourseSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  CheckCircle,
  Play,
  Flag,
  BookOpen,
  Award
} from 'lucide-react';

const Lesson: React.FC = () => {
  const { dayNumber } = useParams<{ dayNumber: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { enrollment, courseLocked, verifyUnlockCode } = useEnrollment();
  const { getVideoProgress, isVideoCompleted, updateProgress } = useLessonProgress();
  const { isDayUnlocked } = useCourseProgress();

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [userProfile, setUserProfile] = useState<{ full_name?: string; email?: string } | null>(null);
  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  const isHacksergeb = user?.email === 'hacksergeb@gmail.com';
  const isFiston = user?.email === 'intarefiston09@gmail.com';

  const dayNum = parseInt(dayNumber || '1');
  const day = courseDays.find(d => d.dayNumber === dayNum);

  useEffect(() => {
    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchQuizStatus = async () => {
      if (!user) return;
      if (dayNum === 64) {
        setQuizPassed(true);
        return;
      }
      const { data } = await supabase
        .from('quiz_attempts')
        .select('passed')
        .eq('user_id', user.id)
        .eq('day_number', dayNum)
        .eq('passed', true)
        .maybeSingle();
      setQuizPassed(!!data);
    };
    fetchQuizStatus();

    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase.from('profiles').select('full_name, email').eq('user_id', user.id).maybeSingle();
      setUserProfile(data);
    };
    fetchProfile();
  }, [user, dayNum]);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!day) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Day not found</h1>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const currentVideo = day.videos[currentVideoIndex];
  const isPremiumContent = day.isLocked || dayNum > 18;
  const isPaymentLocked = courseLocked && isPremiumContent;
  const isProgressionLocked = !isDayUnlocked(dayNum);
  const isLocked = isPaymentLocked || isProgressionLocked;

  // New logic: Show certificate even if progression locked, provided payment is not the issue (or free days)
  const showCertificateLocked = dayNum === 65 && !isPaymentLocked && isProgressionLocked;

  const handlePrevDay = () => {
    if (dayNum > 1) {
      navigate(`/lesson/${dayNum - 1}`);
      setCurrentVideoIndex(0);
    }
  };

  const handleNextDay = () => {
    if (dayNum < 65) {
      const nextDay = courseDays.find(d => d.dayNumber === dayNum + 1);
      if (nextDay && !(!isDayUnlocked(dayNum + 1)) && !(courseLocked && dayNum + 1 > 18)) {
        navigate(`/lesson/${dayNum + 1}`);
        setCurrentVideoIndex(0);
      }
    }
  };

  const handleProgressUpdate = (percentage: number) => {
    if (currentVideo) {
      updateProgress(dayNum, currentVideo.id, percentage);
    }
  };

  const isDayVideosComplete = day.videos.every(v => isVideoCompleted(dayNum, v.id));
  const isQuizRequired = getQuizForDay(dayNum) && dayNum !== 64;
  const isDayComplete = isDayVideosComplete && (!isQuizRequired || quizPassed);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {dayNum === 65 && !isProgressionLocked && <Confetti width={windowDimensions.width} height={windowDimensions.height} recycle={true} />}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <CourseSidebar currentDay={dayNum} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            {/* Nav Bar */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" className="gap-2" onClick={() => navigate('/courses')}>
                <ChevronLeft className="w-4 h-4" /> Back to Course
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevDay} disabled={dayNum === 1}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium text-muted-foreground w-24 text-center">Day {dayNum} of 65</span>
                <Button variant="outline" size="icon" onClick={handleNextDay} disabled={dayNum === 65 || !isDayUnlocked(dayNum + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {isLocked && !showCertificateLocked ? (
              <Card className="max-w-md mx-auto mt-20 text-center p-8">
                <CardContent className="space-y-4">
                  <div className="mx-auto bg-muted p-4 rounded-full w-fit">
                    <Lock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold">{isPaymentLocked ? "Payment Required" : "Lesson Locked"}</h2>
                  <p className="text-muted-foreground">
                    {isPaymentLocked
                      ? "Complete payment to unlock this and all remaining lessons."
                      : "Complete previous days' videos and quiz to unlock this day."}
                  </p>
                  {isPaymentLocked ? (
                    <Button onClick={() => setShowPaymentModal(true)} className="w-full">Unlock Course</Button>
                  ) : (
                    <Button variant="outline" onClick={() => navigate('/courses')} className="w-full">View Roadmap</Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  {dayNum === 65 ? (
                    <div className="text-center py-10">
                      {isProgressionLocked ? (
                        <>
                          <h1 className="text-3xl font-bold text-muted-foreground mb-4">Certificate Locked</h1>
                          <p className="text-lg text-muted-foreground mb-8">Complete all previous lessons to unlock your certificate of completion.</p>
                        </>
                      ) : (
                        <>
                          <h1 className="text-4xl font-bold text-primary mb-4">🎉 Congratulations, {userProfile?.full_name?.split(' ')[0] || "Champion"}!</h1>
                          <p className="text-xl text-muted-foreground mb-8">You have successfully completed the CCNA Networking Journey!</p>
                        </>
                      )}

                      <div className="border rounded-lg overflow-hidden shadow-2xl">
                        <Certificate
                          studentName={userProfile?.full_name || 'Student'}
                          completionDate={new Date().toLocaleDateString()}
                          locked={isProgressionLocked}
                        />
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="mb-6">
                        <Badge className="mb-2">{day.part}</Badge>
                        <h1 className="text-3xl font-bold">{day.title}</h1>
                      </div>

                      {currentVideo && currentVideoIndex < day.videos.length && (
                        <div className="mb-8">
                          <VideoPlayer
                            youtubeId={currentVideo.youtubeId}
                            title={currentVideo.title}
                            onProgress={handleProgressUpdate}
                            isCompleted={isVideoCompleted(dayNum, currentVideo.id)}
                            currentProgress={getVideoProgress(dayNum, currentVideo.id)}
                          />
                        </div>
                      )}

                      {getQuizForDay(dayNum) && dayNum !== 64 && currentVideoIndex === day.videos.length && (
                        <Quiz
                          questions={getQuizForDay(dayNum)?.questions || []}
                          dayNumber={dayNum}
                          onComplete={async (passed, score) => {
                            if (user) {
                              await supabase.from('quiz_attempts').insert({ user_id: user.id, day_number: dayNum, passed, score });
                              if (passed) setQuizPassed(true);
                            }
                          }}
                        />
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Sidebar Content List */}
                {dayNum !== 65 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Lesson Content</h3>
                    <div className="space-y-2">
                      {day.videos.map((video, index) => {
                        const completed = isVideoCompleted(dayNum, video.id);
                        const isActive = index === currentVideoIndex;
                        return (
                          <div
                            key={video.id}
                            onClick={() => setCurrentVideoIndex(index)}
                            className={`
                                                            flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all
                                                            ${isActive ? 'bg-primary/10 border-primary shadow-sm' : 'hover:bg-muted border-transparent bg-card'}
                                                        `}
                          >
                            <div className={`p-1.5 rounded-full ${completed ? 'text-green-600 bg-green-100' : isActive ? 'text-primary bg-background' : 'text-muted-foreground bg-muted'}`}>
                              {completed ? <CheckCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${isActive ? 'text-primary' : ''}`}>{video.title}</p>
                              <p className="text-xs text-muted-foreground capitalize">{video.type}</p>
                            </div>
                          </div>
                        );
                      })}

                      {getQuizForDay(dayNum) && dayNum !== 64 && (
                        <div
                          onClick={() => (isFiston || day.videos.every(v => isVideoCompleted(dayNum, v.id))) && setCurrentVideoIndex(day.videos.length)}
                          className={`
                                                        flex items-center gap-3 p-3 rounded-lg border transition-all
                                                        ${currentVideoIndex === day.videos.length ? 'bg-primary/10 border-primary' : 'bg-card border-transparent'}
                                                        ${!isFiston && !day.videos.every(v => isVideoCompleted(dayNum, v.id)) ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-muted'}
                                                    `}
                        >
                          <div className={`p-1.5 rounded-full ${quizPassed ? 'text-green-600 bg-green-100' : 'text-muted-foreground bg-muted'}`}>
                            {quizPassed ? <CheckCircle className="w-4 h-4" /> : <Flag className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Daily Quiz</p>
                            <p className="text-xs text-muted-foreground">
                              {(isFiston || day.videos.every(v => isVideoCompleted(dayNum, v.id))) ? "Available" : "Locked - Watch videos first"}
                            </p>
                          </div>
                          {!(isFiston || day.videos.every(v => isVideoCompleted(dayNum, v.id))) && <Lock className="w-4 h-4 text-muted-foreground" />}
                        </div>
                      )}
                    </div>

                    {isDayComplete && (
                      <Button
                        className="w-full mt-6"
                        size="lg"
                        onClick={handleNextDay}
                        disabled={dayNum === 65 || !isDayUnlocked(dayNum + 1)}
                      >
                        {dayNum === 64 ? "Get Certificate" : `Continue to Day ${dayNum + 1}`}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onVerify={verifyUnlockCode}
      />
    </div >
  );
};

export default Lesson;
