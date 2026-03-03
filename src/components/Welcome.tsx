import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, Rocket, ShieldCheck, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface WelcomeProps {
  onStart: () => void;
  totalQuestions: number;
}

export function Welcome({ onStart, totalQuestions }: WelcomeProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] text-slate-200 p-4 font-sans overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-600/5 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl z-10"
      >
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
          <CardHeader className="text-center pb-8 pt-12 px-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <div className="p-5 bg-blue-500/10 rounded-3xl text-blue-400 border border-blue-500/20 shadow-inner">
                <BrainCircuit size={64} strokeWidth={1.5} />
              </div>
            </motion.div>
            <CardTitle className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              AI 编辑器使用资格评估
            </CardTitle>
            <CardDescription className="text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
              评估您在 2026 年主流 AI 开发工具与模型方面的专业知识，获取收费版授权。
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-10 px-8 md:px-12 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Rocket, color: "text-orange-400", title: "全生态覆盖", desc: "Cursor, Trae, Antigravity" },
                { icon: ShieldCheck, color: "text-emerald-400", title: "最新模型", desc: "Claude 4.6, GPT-5.3" },
                { icon: Zap, color: "text-blue-400", title: "实战考核", desc: "MCP, Agentic Workflow" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex flex-col items-center text-center group hover:bg-slate-800/60 transition-colors"
                >
                  <item.icon className={`${item.color} mb-4 group-hover:scale-110 transition-transform`} size={32} strokeWidth={1.5} />
                  <h3 className="font-bold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck size={80} />
              </div>
              <h4 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2 uppercase tracking-widest">
                <Zap size={14} /> 测试指南
              </h4>
              <ul className="text-sm text-slate-400 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>包含 <span className="text-white font-mono font-bold">{totalQuestions}</span> 道多维深度测评题目</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>支持键盘快捷键：<kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 text-xs mx-1">Enter</kbd> 下一题，<kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 text-xs mx-1">1-4</kbd> 选择</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>评估通过分数线：<span className="text-emerald-400 font-bold font-mono">80</span> / 100</span>
                </li>
              </ul>
            </motion.div>
          </CardContent>

          <CardFooter className="flex justify-center pb-12">
            <Button 
              size="lg" 
              onClick={onStart} 
              className="group relative px-16 py-8 text-xl rounded-2xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] border-t border-blue-400/30 overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
              <span className="relative flex items-center gap-3 font-bold">
                立即开始评估 <Rocket size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
