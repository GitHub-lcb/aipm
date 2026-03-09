import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Play, PlayCircle, Clock, ChevronLeft, Zap, ShieldCheck, FileVideo, FastForward } from "lucide-react"
import { motion } from "framer-motion"
import questionsData from '@/data/questions.json'

interface TeacherReviewProps {
  onBack: () => void;
}

export function TeacherReview({ onBack }: TeacherReviewProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 获取实战大题的信息作为参考
  const practicalTask = (questionsData as any[]).find(q => q.type === 'coding');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const togglePlaybackRate = () => {
    const rates = [1, 1.5, 2, 3];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200 p-4 font-sans selection:bg-blue-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-6xl z-10 space-y-6">
        <header className="flex items-center justify-between px-2">
          <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white hover:bg-slate-800">
            <ChevronLeft className="mr-2 h-5 w-5" /> 返回首页
          </Button>
          <div className="flex items-center gap-3">
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">教师评审模式</Badge>
            <span className="text-slate-500 text-sm font-mono">2026 AI Exam Reviewer</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：视频播放器 */}
          <Card className="lg:col-span-2 border-slate-700/50 bg-slate-800/40 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden flex flex-col min-h-[600px]">
            <CardHeader className="border-b border-slate-700/50 bg-slate-800/40">
              <CardTitle className="flex items-center gap-3">
                <FileVideo className="text-blue-400" />
                考生实战录屏回放
              </CardTitle>
              <CardDescription>上传考生的 .webm 录屏文件进行交互过程审计</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow flex flex-col items-center justify-center p-0 relative group">
              {!videoUrl ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-full min-h-[400px] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-800/20 transition-colors border-2 border-dashed border-slate-800 m-6 rounded-2xl"
                >
                  <div className="p-6 bg-blue-500/10 rounded-full text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={48} />
                  </div>
                  <p className="text-lg font-bold text-slate-300">点击或拖拽上传录屏文件</p>
                  <p className="text-sm text-slate-500 mt-2">支持 .webm 格式的考试录像</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="video/webm" 
                    className="hidden" 
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-black flex flex-col">
                  <video 
                    ref={videoRef}
                    src={videoUrl} 
                    controls 
                    className="w-full h-full max-h-[500px]"
                    autoPlay
                  />
                  <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={togglePlaybackRate}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-2"
                      >
                        <FastForward size={16} />
                        倍速: {playbackRate}x
                      </Button>
                      <span className="text-xs text-slate-500">提示：观察考生的 Prompt 质量与 AI 交互逻辑</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setVideoUrl(null)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      更换视频
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 右侧：评审辅助面板 */}
          <div className="space-y-6">
            <Card className="border-slate-700/50 bg-slate-800/40 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="text-emerald-400" size={20} />
                  实战评分要点
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-slate-400">
                  <p className="font-bold text-slate-200 border-l-2 border-emerald-500 pl-2">1. 过程评估 (30分)</p>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    <li>Prompt 是否清晰定义了约束？</li>
                    <li>是否能正确处理 AI 的幻觉？</li>
                    <li>任务拆解是否合理（Plan 模式）？</li>
                  </ul>
                </div>
                <div className="space-y-2 text-sm text-slate-400">
                  <p className="font-bold text-slate-200 border-l-2 border-blue-500 pl-2">2. 技术实现 (20分)</p>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    <li>JDBC 预编译语句使用情况？</li>
                    <li>JSP 页面逻辑与展示分离？</li>
                    <li>代码模块化程度？</li>
                  </ul>
                </div>
                <div className="space-y-2 text-sm text-slate-400">
                  <p className="font-bold text-slate-200 border-l-2 border-orange-500 pl-2">3. 安全与红线 (10分)</p>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    <li>是否存在硬编码凭证？</li>
                    <li>是否存在 SQL 注入隐患？</li>
                    <li>是否关闭了 SSL 校验？</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-700/50 bg-slate-800/40 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="text-blue-400" size={20} />
                  任务详情回顾
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-slate-500 leading-relaxed max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  <p className="font-bold text-slate-300 mb-2">【Java + JSP 智能订单审计】</p>
                  {practicalTask?.taskDescription || "任务描述加载中..."}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
