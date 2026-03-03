import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, XCircle, RotateCcw, Award, AlertCircle, Share2, Trophy } from "lucide-react"
import { motion } from "framer-motion"
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-slate-200 p-4 font-sans selection:bg-blue-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl z-10"
      >
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
          <CardHeader className={`text-center py-16 px-8 relative overflow-hidden ${isPassed ? "bg-emerald-500/10" : "bg-orange-500/10"}`}>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-current" />
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <div className="flex justify-center mb-6">
                {isPassed ? (
                  <div className="p-6 bg-emerald-500/20 rounded-full text-emerald-400 ring-8 ring-emerald-500/5 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                    <Trophy size={80} strokeWidth={1.5} />
                  </div>
                ) : (
                  <div className="p-6 bg-orange-500/20 rounded-full text-orange-400 ring-8 ring-orange-500/5">
                    <AlertCircle size={80} strokeWidth={1.5} />
                  </div>
                )}
              </div>
              <CardTitle className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                {score} <span className="text-2xl font-medium text-slate-500">/ 100</span>
              </CardTitle>
              <CardDescription className="text-xl md:text-2xl font-bold text-slate-100">
                {isPassed ? "评估通过：卓越的 AI 专家" : "评估未通过：仍需进修"}
              </CardDescription>
              <p className="mt-4 text-slate-400 max-w-md mx-auto">
                {isPassed 
                  ? "恭喜！您对 2026 年 AI 编辑器生态有极深的理解，已获得高级授权资格。" 
                  : "很遗憾，您的得分未达到 80 分。建议详细查看下方的答题回顾进行针对性复习。"}
              </p>
            </motion.div>
          </CardHeader>

          <CardContent className="p-0 border-y border-slate-800/50">
            <ScrollArea className="h-[450px] px-8 md:px-12 py-10 bg-slate-900/20">
              <h3 className="font-bold text-slate-100 mb-8 flex items-center gap-3 text-lg">
                <RotateCcw className="text-blue-400 h-5 w-5" /> 答题回顾
              </h3>
              <div className="space-y-8 pb-10">
                {questions.map((q, idx) => {
                  const userAnswers = answers[q.id] || [];
                  const isCorrect = userAnswers.length === q.answer.length && 
                                    userAnswers.every(v => q.answer.includes(v));
                  
                  return (
                    <motion.div 
                      key={q.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 group hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-6 mb-6">
                        <div className="flex gap-4">
                          <span className="font-mono text-blue-500/50 font-bold text-lg">#{String(idx + 1).padStart(2, '0')}</span>
                          <p className="font-bold text-slate-100 text-lg leading-snug">{q.question}</p>
                        </div>
                        {isCorrect ? (
                          <div className="bg-emerald-500/10 p-1.5 rounded-full">
                            <CheckCircle2 className="text-emerald-500 shrink-0" size={24} />
                          </div>
                        ) : (
                          <div className="bg-red-500/10 p-1.5 rounded-full">
                            <XCircle className="text-red-500 shrink-0" size={24} />
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
                        <div className="space-y-3">
                          <span className="text-[10px] uppercase tracking-widest font-black text-slate-500">您的答案</span>
                          <div className="flex flex-wrap gap-2">
                            {userAnswers.length > 0 ? (
                              userAnswers.map(ansIdx => (
                                <Badge key={ansIdx} variant="outline" className={`px-3 py-1 rounded-lg ${q.answer.includes(ansIdx) ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" : "border-red-500/30 text-red-400 bg-red-500/5"}`}>
                                  {q.options ? q.options[ansIdx] : (ansIdx === 0 ? "正确" : "错误")}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-red-400/60 italic text-sm">未回答</span>
                            )}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <span className="text-[10px] uppercase tracking-widest font-black text-slate-500">正确答案</span>
                          <div className="flex flex-wrap gap-2">
                            {q.answer.map(ansIdx => (
                              <Badge key={ansIdx} className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 border-blue-500/20">
                                {q.options ? q.options[ansIdx] : (ansIdx === 0 ? "正确" : "错误")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 ml-11 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <p className="text-sm text-slate-400 leading-relaxed italic">
                          <span className="font-black text-blue-400 not-italic mr-2 text-[10px] uppercase tracking-tighter border border-blue-400/30 px-1.5 py-0.5 rounded">解析</span>
                          {q.explanation}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-center py-10 px-8 bg-slate-900/30 gap-4">
            <Button 
              size="lg" 
              onClick={onRestart} 
              variant="outline" 
              className="w-full sm:w-auto px-10 h-14 rounded-2xl border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-bold"
            >
              <RotateCcw className="mr-2 h-5 w-5" /> 重新开始评估
            </Button>
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-10 h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-900/20"
            >
              <Share2 className="mr-2 h-5 w-5" /> 分享我的成就
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
