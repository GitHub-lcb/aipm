import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, Rocket, ShieldCheck, Zap, Clock, Users, Target } from "lucide-react"
import { motion } from "framer-motion"
import { QUIZ_CONSTANTS } from "@/types/quiz"

interface WelcomeProps {
  onStart: () => void;
  totalQuestions: number;
  selectedRole?: string;
  onSelectRole: (role: string) => void;
  onEnterReview?: () => void;
}

export function Welcome({ onStart, totalQuestions, selectedRole, onSelectRole, onEnterReview }: WelcomeProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200 p-4 font-sans overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl z-10"
      >
        <Card className="border-slate-700/50 bg-slate-800/40 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden">
          <CardHeader className="text-center pb-8 pt-12 px-8 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />
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
            <CardTitle className="text-5xl md:text-6xl font-black tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              2026 AI 编程考试
            </CardTitle>
            <CardDescription className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              评估您在 AI 2.0 时代的实战开发能力，涵盖红线规则、代码审查及长程任务驱动。
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-10 px-8 md:px-12 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, color: "text-emerald-400", title: "理论与红线", desc: "40 道核心规则与能力题目" },
                { icon: Zap, color: "text-blue-400", title: "编程实战", desc: "1 道大型综合功能开发任务" },
                { icon: Rocket, color: "text-orange-400", title: "计分加权", desc: "实战占 60%，理论占 40%" }
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

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Users size={20} className="text-blue-400" />
                <h3 className="text-lg font-bold text-white">请选择您的研发岗位</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {QUIZ_CONSTANTS.ROLES.map((role) => (
                  <Button
                    key={role}
                    variant={selectedRole === role ? "default" : "outline"}
                    onClick={() => onSelectRole(role)}
                    className={`h-16 rounded-xl border-2 transition-all ${
                      selectedRole === role 
                        ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/40" 
                        : "border-slate-800 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                    }`}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target size={80} />
              </div>
              <h4 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Clock size={14} /> 考试指南
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>考试时长：<span className="text-white font-bold">60 分钟</span>（超时自动提交）</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>分值分布：实战 60% / 理论 40%</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>及格分数：<span className="text-emerald-400 font-bold">80 分</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>支持断点续考：进度将自动保存</span>
                </li>
              </ul>
            </motion.div>
          </CardContent>

          <CardFooter className="flex flex-col items-center pb-12 gap-6">
            <Button 
              size="lg" 
              onClick={onStart} 
              disabled={!selectedRole}
              className={`group relative px-20 py-8 text-xl rounded-2xl transition-all overflow-hidden ${
                selectedRole 
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] border-t border-blue-400/30"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
              <span className="relative flex items-center gap-3 font-bold">
                {selectedRole ? "立即开始考试" : "请先选择岗位"} 
                {selectedRole && <Rocket size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </span>
            </Button>

            {onEnterReview && (
              <Button 
                variant="ghost" 
                onClick={onEnterReview}
                className="text-slate-500 hover:text-purple-400 hover:bg-purple-500/5 transition-colors gap-2 text-xs"
              >
                <Users size={14} /> 教师评审入口
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
