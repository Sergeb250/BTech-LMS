import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollment } from '@/hooks/useEnrollment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { courseInfo, courseFiles } from '@/data/courseData';
import { Lock, LogOut, Loader2, ShieldCheck, BookOpen, CheckCircle2, Book, FileText, Download, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Footer } from '@/components/layout/Footer';

const Locked: React.FC = () => {
    const { user, signOut } = useAuth();
    const { verifyUnlockCode } = useEnrollment();
    const navigate = useNavigate();
    const [unlockCode, setUnlockCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [lastAttemptTime, setLastAttemptTime] = useState(0);

    const handleUnlock = async () => {
        // [OWASP] Input Sanitization & Rate Limiting
        const cleanCode = unlockCode.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');

        if (!cleanCode) return;

        // Rate Limiting (Simple Throttling - 2 seconds)
        const now = Date.now();
        if (now - lastAttemptTime < 2000) {
            toast.warning("Please wait a moment before trying again.");
            return;
        }
        setLastAttemptTime(now);

        setLoading(true);
        const { success } = await verifyUnlockCode(cleanCode);
        setLoading(false);

        if (success) {
            toast.success("Account unlocked successfully! Welcome back.");
            navigate('/courses');
        } else {
            toast.error("Invalid unlock code. Please verify and try again.");
            setUnlockCode(''); // Clear on failure for security
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error("Error signing out:", error);
            navigate('/');
        }
    };

    const showLockedToast = (feature: string) => {
        toast.info(`Unlock the full course to access ${feature}.`, {
            description: "Instant access upon payment verification.",
            duration: 3000,
        });
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-black to-black" />
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            {/* Main Content Container - Poster Style */}
            <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-8 relative z-10">

                {/* Left Poster Area: Hero & Value */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-8 p-4 lg:p-12">

                    {/* Logos & Trust Signals */}
                    <div className="flex items-center gap-6 mb-4">
                        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all cursor-pointer hover:scale-105 duration-300">
                            <img
                                src="https://i.postimg.cc/yxM0kwjY/Gemini-Generated-Image-h2a51fh2a51fh2a5.png"
                                alt="B Technologies Africa"
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                        <div className="w-px h-10 bg-white/20" />
                        <div className="bg-white p-3 rounded-xl border border-white/10 hover:scale-105 transition-transform cursor-pointer duration-300">
                            <img
                                src="https://i.postimg.cc/zXtGS9R4/cisco-logo.jpg"
                                alt="Cisco"
                                className="h-10 w-auto object-contain mix-blend-multiply"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-medium text-sm animate-pulse">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Premium CCNA Training</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Networking</span><br />
                            Build Your Future.
                        </h1>

                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl border-l-4 border-blue-500 pl-6">
                            Don't let your free trial expiration stop your career growth.
                            Unlock the complete 65-Day journey, featuring hands-on labs,
                            comprehensive guides, and expert-led video lessons.
                        </p>
                    </div>

                    {/* Features Grid - CLICKABLE / INTERACTIVE */}
                    <div className="grid sm:grid-cols-2 gap-4 mt-8">
                        <div
                            onClick={() => showLockedToast("the Full Syllabus")}
                            className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group active:scale-95 duration-200"
                        >
                            <div className="flex justify-between items-start">
                                <BookOpen className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">Course Syllabus</h3>
                            <p className="text-sm text-slate-400 group-hover:text-slate-300">From Fundamentals to Network Automation. Full coverage of the 200-301 Exam topics.</p>
                        </div>
                        <div
                            onClick={() => showLockedToast("Career Resources")}
                            className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group active:scale-95 duration-200"
                        >
                            <div className="flex justify-between items-start">
                                <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-200 transition-colors">Career Ready Skills</h3>
                            <p className="text-sm text-slate-400 group-hover:text-slate-300">Practical labs, real-world scenarios, and interview preparation resources included.</p>
                        </div>
                    </div>

                    {/* Resources Preview - CLICKABLE BUTTONS */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 pt-4">
                        <button
                            onClick={() => showLockedToast("Study Guides")}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-blue-100 transition-all cursor-pointer active:scale-95 shadow-sm hover:shadow-blue-900/20"
                        >
                            <Book className="w-4 h-4 text-blue-400" />
                            <span>Complete Cert Guides</span>
                        </button>
                        <button
                            onClick={() => showLockedToast("Packet Tracer Labs")}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-blue-100 transition-all cursor-pointer active:scale-95 shadow-sm hover:shadow-blue-900/20"
                        >
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span>Packet Tracer Labs</span>
                        </button>
                        <button
                            onClick={() => showLockedToast("Practice Exams")}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-blue-100 transition-all cursor-pointer active:scale-95 shadow-sm hover:shadow-blue-900/20"
                        >
                            <Download className="w-4 h-4 text-blue-400" />
                            <span>Practice Questions</span>
                        </button>
                    </div>
                </div>

                {/* Right Area: Call to Action Card */}
                <div className="lg:col-span-5 flex items-center">
                    <Card className="w-full shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] border border-blue-500/20 bg-slate-900/80 backdrop-blur-xl relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
                        {/* Shimmer Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-pulse" />

                        <CardHeader className="text-center pb-8 pt-8 border-b border-white/5">
                            <CardTitle className="text-3xl font-bold text-white">Secure Your Access</CardTitle>
                            <CardDescription className="text-lg mt-2 text-slate-400">
                                Investment in your professional career
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-8 pt-8 px-8">
                            {/* Price / Payment */}
                            <div className="text-center space-y-6">
                                <div>
                                    <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-2">
                                        {user?.email === 'intarefiston09@gmail.com' ? 'Monthly Payment' : 'One-Time Payment'}
                                    </p>
                                    <div className="text-5xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                                        {courseInfo.price.toLocaleString()}
                                        <span className="text-xl text-blue-400 font-normal self-end mb-2">RWF</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-0.5 shadow-lg shadow-blue-500/20 group hover:shadow-blue-500/40 transition-shadow duration-300">
                                    <div className="bg-slate-900/95 rounded-lg p-5">
                                        <p className="text-blue-200 font-medium mb-1 flex items-center justify-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                                            MoMo Pay Merchant Code
                                        </p>
                                        <p className="text-4xl font-mono font-bold text-white tracking-widest select-all my-2 group-hover:scale-105 transition-transform duration-300">729421/0791822315</p>
                                        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-2 border-t border-white/5 pt-2">
                                            <span>Registered Name:</span>
                                            <span className="font-semibold text-slate-300">Serge Benit</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Unlock Form */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1 flex justify-between">
                                        <span>Enter Unlock Code</span>
                                    </label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                        <Input
                                            placeholder="XXXX-XXXX-XXXX"
                                            value={unlockCode}
                                            onChange={(e) => setUnlockCode(e.target.value.toUpperCase())}
                                            className="text-center font-mono uppercase text-lg h-14 pl-12 tracking-widest bg-black/50 border-white/10 text-white focus-visible:ring-blue-500 placeholder:text-slate-700 transition-all hover:bg-black/70 hover:border-blue-500/30"
                                            maxLength={20}
                                        />
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-14 text-lg font-bold bg-white text-blue-900 hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                                    onClick={handleUnlock}
                                    disabled={loading || !unlockCode.trim()}
                                >
                                    {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : "Verify Code & Start Learning"}
                                </Button>

                                <p className="text-xs text-center text-slate-500 flex items-center justify-center gap-3">
                                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Instant Validation</span>
                                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure Access</span>
                                </p>
                            </div>
                        </CardContent>

                        <CardFooter className="bg-black/40 p-4 border-t border-white/5 flex justify-between items-center backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 ring-1 ring-white/20">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-slate-800 text-slate-300 text-xs font-bold">
                                        {user?.email?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-xs text-slate-400 flex flex-col">
                                    <span className="font-medium text-slate-300">Logged in as</span>
                                    <span className="max-w-[150px] truncate opacity-75">{user?.email}</span>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-slate-400 hover:text-white hover:bg-white/10">
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className="w-full relative z-10 mt-12 mb-4">
                <Footer />
            </div>
        </div>
    );
};

export default Locked;
