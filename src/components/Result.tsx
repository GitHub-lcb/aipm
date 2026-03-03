import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, XCircle, RotateCcw, Award, AlertCircle } from "lucide-react"
import type { Question } from "@/types/quiz"

interface ResultProps {
  score: number;
  answers: Record<number, number[]>;
  questions: Question[];
  onRestart: () => void;
}

export function Result({ score, answers, questions, onRestart }: ResultProps) {
  const isPassed = score >= 80;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-4xl">
        <Card className="border-none shadow-2xl overflow-hidden">
          <CardHeader className={`text-center py-10 text-white ${isPassed ? "bg-green-600" : "bg-orange-600"}`}>
            <div className="flex justify-center mb-4">
              {isPassed ? <Award size={64} /> : <AlertCircle size={64} />}
            </div>
            <CardTitle className="text-4xl font-bold mb-2">测试结果: {score} 分</CardTitle>
            <CardDescription className="text-white/80 text-lg">
              {isPassed ? "恭喜！您已获得 AI 编辑器授权资格。" : "很遗憾，您的得分未达到 80 分。请复习后再试。"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] px-8 py-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <RotateCcw className="mr-2 h-4 w-4" /> 答题回顾
              </h3>
              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const userAnswers = answers[q.id] || [];
                  const isCorrect = userAnswers.length === q.answer.length && 
                                    userAnswers.every(v => q.answer.includes(v));
                  
                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex gap-2 items-center">
                          <span className="font-bold text-slate-400">#{idx + 1}</span>
                          <p className="font-semibold text-slate-800">{q.question}</p>
                        </div>
                        {isCorrect ? (
                          <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                        ) : (
                          <XCircle className="text-red-500 shrink-0" size={20} />
                        )}
                      </div>
                      
                      <div className="text-sm space-y-2 pl-8">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-slate-500">您的答案:</span>
                          {userAnswers.length > 0 ? (
                            userAnswers.map(ansIdx => (
                              <Badge key={ansIdx} variant={q.answer.includes(ansIdx) ? "outline" : "destructive"}>
                                {q.options ? q.options[ansIdx] : (ansIdx === 0 ? "正确" : "错误")}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-red-400 italic">未回答</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-slate-500">正确答案:</span>
                          {q.answer.map(ansIdx => (
                            <Badge key={ansIdx} className="bg-green-100 text-green-700 border-green-200">
                              {q.options ? q.options[ansIdx] : (ansIdx === 0 ? "正确" : "错误")}
                            </Badge>
                          ))}
                        </div>
                        <Separator className="my-2" />
                        <p className="text-xs text-slate-500 leading-relaxed italic bg-white p-2 rounded border border-slate-100">
                          <span className="font-bold text-blue-600 not-italic mr-1">解析:</span>
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-center py-8 bg-slate-50 border-t">
            <Button size="lg" onClick={onRestart} variant="outline" className="px-10 rounded-full">
              重新开始测试
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
