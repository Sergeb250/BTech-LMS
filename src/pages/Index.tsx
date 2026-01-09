import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { courseInfo } from '@/data/courseData';
import { BookOpen, Play, Award, Clock, Users, Globe, Zap, CheckCircle } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/courses');
    } else {
      navigate('/auth?mode=signup');
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: '65 Days of Training',
      description: 'Comprehensive curriculum covering all CCNA 200-301 exam topics'
    },
    {
      icon: Play,
      title: 'Video Lessons + Labs',
      description: 'Learn by watching and practice with hands-on Packet Tracer labs'
    },
    {
      icon: Award,
      title: 'Course Certificate',
      description: 'Receive a completion certificate from B Technologies Africa'
    },
    {
      icon: Clock,
      title: 'Learn at Your Pace',
      description: 'Self-paced learning with progress tracking and sequential unlocking'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center p-2 mb-8 rounded-full bg-primary/10 text-primary">
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-background shadow-sm">New</span>
              <span className="ml-2 text-sm font-medium">Updated for CCNA 200-301 v1.1</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400">
              Master Networking with <br /> CCNA Training
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {courseInfo.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="h-12 px-8 text-lg gap-2" onClick={handleGetStarted}>
                <Zap className="w-5 h-5" />
                {user ? 'Continue Learning' : 'Start Free Today'}
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg" onClick={() => navigate('/courses')}>
                View Curriculum
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">500+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="font-medium">Africa-Wide</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="font-medium">Certified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Course Syllabus</h2>
            <p className="text-muted-foreground text-lg">A structured journey to CCNA mastery</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Networking Fundamentals",
              "Routing & IP Connectivity",
              "Switching & VLANs",
              "Dynamic Routing",
              "IP Services & Security",
              "Advanced Services & Automation"
            ].map((topic, index) => (
              <div key={index} className="flex items-center p-4 border rounded-lg hover:border-primary/50 transition-colors bg-card shadow-sm">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-4 shrink-0">
                  {index + 1}
                </div>
                <span className="font-semibold text-lg">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-muted-foreground text-lg">Our comprehensive training program gives you all the tools to master networking</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="bg-background border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
