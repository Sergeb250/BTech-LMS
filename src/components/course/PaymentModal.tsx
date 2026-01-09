import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Phone, Key, Lock, AlertTriangle, Copy, Loader2, Check } from 'lucide-react';
import { courseInfo } from '@/data/courseData';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => Promise<{ success: boolean; error?: unknown }>;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onVerify }) => {
  const [unlockCode, setUnlockCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(courseInfo.momoPayNumber);
    setCopied(true);
    toast({
      title: 'Number copied!',
      description: 'MoMo Pay number copied to clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = async () => {
    if (!unlockCode.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter the unlock code',
        variant: 'destructive',
      });
      return;
    }

    setIsVerifying(true);
    try {
      const { success, error } = await onVerify(unlockCode);
      if (success) {
        toast({
          title: 'Success!',
          description: 'Payment verified successfully. Welcome to the full course!',
        });
        onClose();
      } else {
        toast({
          title: 'Verification failed',
          description: 'Invalid code. Please check and try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">Unlock Full Access</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Get unlimited access to all {courseInfo.totalDays} days of content, including quizzes, labs, and certification.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Payment Instructions */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 font-semibold">
              <Phone className="w-4 h-4" />
              <span>MoMo Pay Instructions</span>
            </div>
            <div className="text-sm text-amber-900 dark:text-amber-100/90 space-y-2 pl-6">
              <p>1. Dial *182*1*1#</p>
              <div className="flex items-center gap-2">
                <p>2. Enter Number:</p>
                <button
                  onClick={handleCopyNumber}
                  className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded font-mono font-bold hover:bg-amber-200 transition-colors"
                >
                  {courseInfo.momoPayNumber}
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <span>Payment of <span className="font-bold">{courseInfo.price?.toLocaleString()} RWF</span></span>
              <p>4. Enter Reference: CCNA</p>
              <p className="font-bold text-red-600 dark:text-red-400 mt-2">Payment Due: 21st of the Month</p>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Important:</p>
              After payment, you will receive an unlock code via SMS or WhatsApp. Enter it below to activate your account immediately.
            </div>
          </div>

          {/* Verification Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-base font-semibold">Enter Unlock Code</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="code"
                  placeholder="e.g. BTA-8823-X9Y2"
                  className="pl-9 h-11 text-center font-mono uppercase tracking-widest text-lg"
                  value={unlockCode}
                  onChange={(e) => setUnlockCode(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full h-11 text-lg font-semibold"
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verifying Payment...
                </>
              ) : (
                'Verify & Unlock Course'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
