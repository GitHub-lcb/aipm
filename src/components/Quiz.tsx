import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Send } from "lucide-react"
import type { Question } from "@/types/quiz"

interface QuizProps {
  question: Question;
  currentAnswer: number[];
  currentIndex: number;
  totalQuestions: number;
  progress: number;
  onAnswer: (indices: number[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Quiz({
  question,
  currentAnswer,
  currentIndex,
  totalQuestions,
  progress,
  onAnswer,
  onNext,
  onPrev
}: QuizProps) {
  const isLast = currentIndex === totalQuestions - 1;

  const handleToggleOption = (index: number) => {
    if (question.type === 'single' || question.type === 'boolean') {
      onAnswer([index]);
    } else {
      const newAnswer = currentAnswer.includes(index)
        ? currentAnswer.filter(i => i !== index)
        : [...currentAnswer, index];
      onAnswer(newAnswer);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-3xl space-y-4">
        <div className="flex items-center justify-between px-2">
          <Badge variant="outline" className="bg-white">
            题目 {currentIndex + 1} / {totalQuestions}
          </Badge>
          <Badge className="bg-blue-600">{question.category}</Badge>
        </div>
        
        <Progress value={progress} className="h-2" />

        <div className="w-full">
          <Card className="border-none shadow-xl min-h-[400px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl leading-relaxed text-slate-800">
                {question.question}
              </CardTitle>
              <CardDescription>
                {question.type === 'multiple' ? '(多选题)' : question.type === 'boolean' ? '(判断题)' : '(单选题)'}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              {question.type === 'single' || question.type === 'boolean' ? (
                <RadioGroup 
                  value={currentAnswer[0]?.toString() || ""} 
                  onValueChange={(val) => handleToggleOption(parseInt(val))}
                  className="space-y-3"
                >
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} className="sr-only" />
                      <Label
                        htmlFor={`option-${index}`}
                        className={`flex items-center w-full p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          currentAnswer.includes(index)
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center text-xs font-bold ${
                          currentAnswer.includes(index) ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 text-slate-400"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-3">
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <Checkbox
                        id={`option-${index}`}
                        checked={currentAnswer.includes(index)}
                        onCheckedChange={() => handleToggleOption(index)}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className={`flex items-center w-full p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          currentAnswer.includes(index)
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-md border-2 mr-3 flex items-center justify-center text-xs font-bold ${
                          currentAnswer.includes(index) ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 text-slate-400"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6 bg-slate-50/50 rounded-b-xl">
              <Button variant="ghost" onClick={onPrev} disabled={currentIndex === 0}>
                <ChevronLeft className="mr-2 h-4 w-4" /> 上一题
              </Button>
              <Button onClick={onNext} className={isLast ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}>
                {isLast ? (
                  <>提交测试 <Send className="ml-2 h-4 w-4" /></>
                ) : (
                  <>下一题 <ChevronRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
