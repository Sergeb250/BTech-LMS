import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '@/data/quizData';
import { cn } from '@/lib/utils';

interface QuizProps {
  questions: QuizQuestion[];
  dayNumber: number;
  onComplete: (passed: boolean, score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, dayNumber, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      const correctCount = newAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
      const passed = correctCount >= 4;
      setShowResults(true);
      onComplete(passed, correctCount);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  const correctCount = answers.filter((ans, idx) => ans === questions[idx]?.correctAnswer).length;
  const passed = correctCount >= 4;
  const question = questions[currentQuestion];

  if (showResults) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className={cn("text-center py-8", passed ? "border-green-500 bg-green-50/50" : "border-red-500 bg-red-50/50")}>
          <CardContent className="space-y-4">
            {passed ? (
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            ) : (
              <XCircle className="w-16 h-16 text-red-600 mx-auto" />
            )}
            <h2 className="text-2xl font-bold">
              {passed ? "Congratulations!" : "Keep Trying!"}
            </h2>
            <p className="text-lg">
              Your Score: <span className="font-bold">{correctCount}/{questions.length}</span>
            </p>
            <p className="text-muted-foreground">
              {passed ? "You've passed this quiz and can continue to the next day!" : "You need 4/5 correct to pass. Try again!"}
            </p>
            {!passed && (
              <Button onClick={handleRetry} className="mt-4 gap-2">
                <RotateCcw className="w-4 h-4" /> Retry Quiz
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Day {dayNumber} Quiz</CardTitle>
          <span className="text-sm text-muted-foreground">Question {currentQuestion + 1}/{questions.length}</span>
        </div>
        <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg font-medium">{question.question}</h3>

        <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => setSelectedAnswer(parseInt(val))}>
          {question.options.map((option, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center space-x-2 border rounded-lg p-4 transition-colors cursor-pointer hover:bg-muted/50",
                selectedAnswer === idx && "border-primary bg-primary/5"
              )}
              onClick={() => setSelectedAnswer(idx)}
            >
              <RadioGroupItem value={idx.toString()} id={`opt-${idx}`} />
              <Label htmlFor={`opt-${idx}`} className="flex-1 cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handleNext}
          disabled={selectedAnswer === null}
        >
          {currentQuestion < questions.length - 1 ? (
            <>Next Question <ArrowRight className="ml-2 w-4 h-4" /></>
          ) : (
            <>Submit Quiz <CheckCircle className="ml-2 w-4 h-4" /></>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
