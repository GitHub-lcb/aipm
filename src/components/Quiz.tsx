import { useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronLeft, ChevronRight, Send, Keyboard, Zap, User, Video, VideoOff, Download, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Question } from "@/types/quiz"
import { useScreenRecorder } from "@/hooks/useScreenRecorder"

interface QuizProps {
  question: Question;
  currentAnswer: number[];
  currentIndex: number;
  totalQuestions: number;
  progress: number;
  timeRemaining: number;
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
  timeRemaining,
  onAnswer,
  onNext,
  onPrev
}: QuizProps) {
  const isLast = currentIndex === totalQuestions - 1;
  const { recordingStatus, videoBlob, startRecording, stopRecording, downloadRecording } = useScreenRecorder();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining < 300; // less than 5 mins

  const handleToggleOption = useCallback((index: number) => {
    if (question.type === 'single' || question.type === 'boolean') {
      onAnswer([index]);
    } else {
      const newAnswer = currentAnswer.includes(index)
        ? currentAnswer.filter(i => i !== index)
        : [...currentAnswer, index];
      onAnswer(newAnswer);
    }
  }, [question.type, currentAnswer, onAnswer]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const index = parseInt(e.key) - 1;
        if (question.options && index < question.options.length) {
          handleToggleOption(index);
        } else if (question.type === 'boolean' && index < 2) {
          handleToggleOption(index);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, currentIndex, question, handleToggleOption]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200 p-4 font-sans selection:bg-blue-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-4xl z-10 space-y-6">
        <header className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/30">
                <Badge variant="outline" className="border-none text-blue-400 font-mono text-sm px-0">
                  Q{String(currentIndex + 1).padStart(2, '0')}
                </Badge>
              </div>
              <div className="h-4 w-px bg-slate-700" />
              <span className="text-slate-400 text-sm font-medium tracking-wide uppercase">
                {question.category}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                isLowTime 
                  ? "bg-red-500/10 border-red-500/30 text-red-400 animate-pulse" 
                  : "bg-slate-800/50 border-slate-700/50 text-slate-300"
              }`}>
                <Clock size={16} />
                <span className="font-mono font-bold text-lg">{formatTime(timeRemaining)}</span>
              </div>
              <div className="text-slate-500 text-xs font-mono hidden sm:block">
                {currentIndex + 1} / {totalQuestions}
              </div>
            </div>
          </div>
          
          <div className="relative h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Card className="border-slate-700/50 bg-slate-800/40 backdrop-blur-xl shadow-2xl shadow-black/20 min-h-[500px] flex flex-col overflow-hidden">
              <CardHeader className="pb-8 pt-10 px-8 md:px-12 border-b border-slate-700/50 bg-slate-800/40">
                <div className="space-y-4">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 transition-colors">
                    {question.type === 'multiple' ? '多选题' : question.type === 'boolean' ? '判断题' : question.type === 'coding' ? '编程实战题' : '单选题'}
                  </Badge>
                  <CardTitle className="text-2xl md:text-3xl leading-tight font-bold text-white tracking-tight">
                    {question.question}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="flex-grow p-8 md:p-12">
                {question.type === 'coding' ? (
                  <div className="space-y-6">
                    <div className="prose prose-invert max-w-none">
                      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {question.taskDescription}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        currentAnswer.includes(0) ? "bg-emerald-500 border-emerald-500" : "border-slate-700"
                      }`}>
                        {currentAnswer.includes(0) && <Zap size={14} className="text-white fill-current" />}
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-1">实战任务确认</h4>
                        <p className="text-xs text-slate-500">完成编程与录制后，请点击右侧按钮确认完成。</p>
                      </div>
                      <Button
                        variant={currentAnswer.includes(0) ? "default" : "outline"}
                        disabled={recordingStatus !== 'finished'}
                        onClick={() => onAnswer(currentAnswer.includes(0) ? [] : [0])}
                        className={currentAnswer.includes(0) ? "bg-emerald-600 hover:bg-emerald-500" : "border-slate-700"}
                      >
                        {currentAnswer.includes(0) ? "已完成" : "确认完成"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`p-6 rounded-2xl border-2 transition-all ${
                        recordingStatus === 'recording' ? "border-red-500 bg-red-500/5 animate-pulse" : "border-slate-800 bg-slate-800/30"
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-slate-100 flex items-center gap-2">
                            {recordingStatus === 'recording' ? <Video className="text-red-500" size={20} /> : <Video className="text-blue-400" size={20} />}
                            屏幕录制控制
                          </h4>
                          {recordingStatus === 'recording' && <Badge className="bg-red-500 animate-pulse">正在录制</Badge>}
                        </div>
                        <div className="flex gap-3">
                          {recordingStatus === 'idle' && (
                            <Button onClick={startRecording} className="flex-1 bg-blue-600 hover:bg-blue-500">
                              开始录制
                            </Button>
                          )}
                          {recordingStatus === 'recording' && (
                            <Button onClick={stopRecording} variant="destructive" className="flex-1">
                              <VideoOff size={16} className="mr-2" /> 停止录制
                            </Button>
                          )}
                          {recordingStatus === 'finished' && (
                            <div className="flex flex-col w-full gap-3">
                              <Button onClick={downloadRecording} variant="outline" className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                                <Download size={16} className="mr-2" /> 下载录屏文件
                              </Button>
                              <Button onClick={startRecording} variant="ghost" className="text-slate-500 text-xs">
                                重新录制
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-800/30 flex flex-col justify-center">
                        <div className="flex items-start gap-3 text-slate-400">
                          <AlertCircle size={20} className="shrink-0 text-orange-400" />
                          <div className="text-xs space-y-2">
                            <p className="font-bold text-slate-200">录制须知：</p>
                            <p>1. 请录制整个屏幕以确保包含 AI 编辑器的完整交互过程。</p>
                            <p>2. 任务完成后请务必先“停止录制”并“下载文件”。</p>
                            <p>3. 只有在停止录制后，下方的“确认完成”按钮才会解锁。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : question.type === 'single' || question.type === 'boolean' ? (
                  <RadioGroup 
                    value={currentAnswer[0]?.toString() || ""} 
                    onValueChange={(val) => handleToggleOption(parseInt(val))}
                    className="grid grid-cols-1 gap-4"
                  >
                    {question.options?.map((option, index) => (
                      <div key={index} className="relative group">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} className="sr-only" />
                        <Label
                          htmlFor={`option-${index}`}
                          className={`flex items-center w-full p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative overflow-hidden ${
                            currentAnswer.includes(index)
                              ? "border-blue-500 bg-blue-500/20 text-white ring-4 ring-blue-500/10"
                              : "border-slate-700/50 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-700/50 text-slate-300 group-hover:text-white"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl border-2 mr-4 flex items-center justify-center text-sm font-mono font-bold transition-colors ${
                            currentAnswer.includes(index) 
                              ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30" 
                              : "border-slate-600 bg-slate-800/50 text-slate-400 group-hover:border-slate-500 group-hover:text-slate-200"
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="text-lg font-medium leading-snug">{option}</span>
                          
                          {/* Keyboard hint */}
                          <span className="ml-auto opacity-0 group-hover:opacity-40 transition-opacity text-[10px] font-mono border border-current px-1.5 py-0.5 rounded uppercase">
                            {index + 1}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {question.options?.map((option, index) => (
                      <div key={index} className="relative group">
                        <Checkbox
                          id={`option-${index}`}
                          checked={currentAnswer.includes(index)}
                          onCheckedChange={() => handleToggleOption(index)}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className={`flex items-center w-full p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                            currentAnswer.includes(index)
                              ? "border-blue-500 bg-blue-500/10 text-white ring-4 ring-blue-500/5"
                              : "border-slate-800 bg-slate-800/30 hover:border-slate-700 hover:bg-slate-800/50 text-slate-400 group-hover:text-slate-200"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg border-2 mr-4 flex items-center justify-center text-sm font-mono font-bold transition-colors ${
                            currentAnswer.includes(index) 
                              ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20" 
                              : "border-slate-700 bg-slate-900 text-slate-500 group-hover:border-slate-600"
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="text-lg font-medium leading-snug">{option}</span>
                          
                          {/* Keyboard hint */}
                          <span className="ml-auto opacity-0 group-hover:opacity-40 transition-opacity text-[10px] font-mono border border-current px-1.5 py-0.5 rounded uppercase">
                            {index + 1}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-700/50 p-8 bg-slate-800/40 gap-4">
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    onClick={onPrev} 
                    disabled={currentIndex === 0}
                    className="flex-1 sm:flex-none border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl h-12 px-6 transition-colors"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" /> 上一题
                  </Button>
                  <Button 
                    onClick={onNext} 
                    className={`flex-1 sm:flex-none h-12 px-10 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${
                      isLast 
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20" 
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20"
                    }`}
                  >
                    {isLast ? (
                      <>提交测试 <Send className="ml-2 h-5 w-5" /></>
                    ) : (
                      <>下一题 <ChevronRight className="ml-2 h-5 w-5" /></>
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-slate-500 text-[11px] font-mono tracking-wider">
                  <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-1 rounded-md border border-slate-700/50">
                    <Keyboard className="h-3 w-3" />
                    <span>快捷键已启用</span>
                  </div>
                  <div className="hidden md:flex gap-3">
                    <span><kbd className="text-slate-400">Enter</kbd> 下一题</span>
                    <span><kbd className="text-slate-400">←</kbd> 上一题</span>
                    <span><kbd className="text-slate-400">1-4</kbd> 选择</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
