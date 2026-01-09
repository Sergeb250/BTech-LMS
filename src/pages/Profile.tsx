import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { courseDays } from '@/data/courseData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { User, Mail, Award, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Profile: React.FC = () => {
    const { user } = useAuth();
    const { completedDays } = useCourseProgress();
    const [profile, setProfile] = useState<{ full_name?: string; email?: string } | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();
            setProfile(data);
        };
        fetchProfile();
    }, [user]);

    // Ensure completedDays is array
    const safeCompletedDays = Array.isArray(completedDays) ? completedDays : [];
    const progressPercentage = Math.round((safeCompletedDays.length / courseDays.length) * 100);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-8 max-w-4xl flex-1">
                <h1 className="text-3xl font-bold mb-8">My Profile</h1>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                            <Avatar className="h-12 w-12 border-2 border-primary/10">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-primary/5 text-primary">
                                    <User className="h-6 w-6" />
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                <p className="text-lg font-semibold">{profile?.full_name || 'Not set'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <p className="font-medium">{user?.email}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <CardTitle>Course Progress</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Completion</span>
                                    <span className="font-bold">{progressPercentage}%</span>
                                </div>
                                <Progress value={progressPercentage} className="h-3" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-muted p-3 rounded-lg text-center">
                                    <p className="text-2xl font-bold text-primary">{safeCompletedDays.length}</p>
                                    <p className="text-xs text-muted-foreground">Days Completed</p>
                                </div>
                                <div className="bg-muted p-3 rounded-lg text-center">
                                    <p className="text-2xl font-bold text-muted-foreground">{courseDays.length - safeCompletedDays.length}</p>
                                    <p className="text-xs text-muted-foreground">Days Remaining</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
