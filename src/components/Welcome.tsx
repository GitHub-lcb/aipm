import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, Rocket, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

interface WelcomeProps {
  onStart: () => void;
  totalQuestions: number;
}

export function Welcome({ onStart, totalQuestions }: WelcomeProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div>
        <Card className="w-full max-w-2xl border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                <BrainCircuit size={48} />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
              AI 编辑器使用资格评估
            </CardTitle>
            <CardDescription className="text-lg text-slate-500 mt-2">
              评估您在 2026 年主流 AI 开发工具与模型方面的专业知识
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                <Rocket className="text-orange-500 mb-2" size={24} />
                <h3 className="font-semibold text-slate-800">全生态覆盖</h3>
                <p className="text-xs text-slate-500">涵盖 Cursor, Trae, Antigravity 等主流工具</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                <ShieldCheck className="text-green-500 mb-2" size={24} />
                <h3 className="font-semibold text-slate-800">最新模型</h3>
                <p className="text-xs text-slate-500">Claude 4.6, GPT-5.3, DeepSeek V4 等特性考核</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                <Badge variant="secondary" className="mb-2">
                  {totalQuestions} 道题目
                </Badge>
                <h3 className="font-semibold text-slate-800">深度评估</h3>
                <p className="text-xs text-slate-500">MCP, Skills, Agentic Workflow 深度实战</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
              <h4 className="text-sm font-bold text-blue-800 mb-1">测试说明：</h4>
              <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                <li>本测试旨在评估员工是否有资格获得公司收费版 AI 编辑器授权。</li>
                <li>题目包含单选、多选和判断题。</li>
                <li>完成后将显示您的最终得分及题目解析。</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-8">
            <Button size="lg" onClick={onStart} className="px-12 py-6 text-lg rounded-full bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
              立即开始测试
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
