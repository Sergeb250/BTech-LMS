import React, { useState, useEffect } from 'react';
import { NavLink } from '@/components/NavLink';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ChevronRight, LayoutDashboard, UserCircle, Settings, Moon, Sun, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider'; // Assuming this exists or will be replaced by local logic if context differs

export const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-border/40"
          : "bg-background/0 border-transparent"
      )}
    >
      {/* ... rest of the component content ... */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <img
            src="https://i.postimg.cc/yxM0kwjY/Gemini-Generated-Image-h2a51fh2a51fh2a5.png"
            alt="B Technologies Africa"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-serif font-bold text-lg leading-none tracking-tight">B Technologies Africa</span>
            <span className="text-[10px] items-center gap-1 font-medium text-muted-foreground uppercase tracking-widest flex">
              CCNA Training <span className="w-1 h-1 rounded-full bg-primary/50" /> v1.1
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/courses" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-accent/50">
            <LayoutDashboard className="w-4 h-4" />
            Courses
          </NavLink>

          <Button onClick={() => navigate('/settings')} variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-4 pl-4 border-l border-border/50">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b bg-background/95 backdrop-blur-xl absolute w-full top-20 left-0 overflow-hidden shadow-xl"
          >
            <div className="container px-6 py-6 space-y-6">
              <div className="flex flex-col space-y-2">
                <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
                <MobileNavLink to="/courses" onClick={() => setIsMenuOpen(false)}>Courses</MobileNavLink>
                {user && <MobileNavLink to="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</MobileNavLink>}
              </div>

              <div className="h-px w-full bg-border/50" />

              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Appearance</span>
                  <ThemeToggle />
                </div>

                <Button onClick={() => navigate('/settings')} variant="outline" className="w-full justify-start gap-2">
                  <Settings className="w-4 h-4" /> Settings
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

function MobileNavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => cn(
        "flex items-center p-4 text-base font-medium rounded-xl transition-all",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </RouterNavLink>
  )
}
