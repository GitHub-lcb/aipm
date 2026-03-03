# AI 编辑器使用资格答题系统 - 实施计划

## 1. 项目概述 (PRD)

### 1.1 问题背景
公司需要一种简单、高效的方式来评估员工是否具备使用各类收费版 AI 编辑器（如 Cursor, GitHub Copilot, Windsurf 等）的技能和资格，以及对大模型（LLM）基础概念的理解。

### 1.2 解决方案
开发一个基于 React 的纯前端答题系统。题目涵盖 AI 编辑器的差异化特性、模型基础知识（训练、微调、推理）、提示词工程（Prompt Engineering）以及实际工作流的应用场景。

### 1.3 核心功能
- **分类答题**：支持按主题分类题目（编辑器技巧、模型基础、实战场景）。
- **多种题型支持**：包括单选题、多选题和判断题。
- **结果反馈**：答题结束后即时显示得分、正确答案及详细解析。
- **现代 UI**：采用现代极简风格，响应式设计。

### 1.4 考核知识点 (核心题目范围)
系统题目将重点覆盖 2025-2026 年最前沿的 AI 辅助编程及大模型技术，确保评估的专业性和时效性：

- **AI 编辑器对比 (AI Editor Deep Dive & Comparison)**：
    - **Google Antigravity**: 
        - **核心特性**: **浏览器智能体 (Browser Agent)** —— 能够自动在 Chrome 中运行并测试应用，执行点击、填表及录屏反馈。
        - **独特模式**: **任务控制台 (Mission Control)** —— 专为并行管理多个 Agent 设计的第二视图。
    - **Cursor**: 
        - **核心特性**: **Composer** —— 目前最成熟、流畅的 Agent 交互模式。
        - **项目索引**: 行业领先的代码库上下文感知能力及 **.cursorrules** 深度定制。
    - **Windsurf**: 
        - **核心特性**: **Cascade AI** —— 引入 Cognition (Devin 团队) 的推理引擎，强化了复杂任务的自主性。
        - **模式**: **Flow 模式**，实现对话与代码执行的无缝切换。
    - **Trae**: 
        - **核心特性**: **极致速度** —— 索引和响应速度优于 Cursor，支持 **多模型 (Claude/GPT/DeepSeek) 快速切换**。
        - **内置能力**: 丰富的内置 **Skills** 和自动化工作流。
    - **Qoder**: 
        - **核心特性**: **Quest 任务抽象** —— 支持异步协作与任务分发，深度集成阿里云生态。
    - **CodeBuddy**: 
        - **核心特性**: **语义驱动架构** —— 针对微信小程序及腾讯云环境有深度优化。
    - **OpenCode**: 
        - **核心特性**: **隐私与开源** —— 侧重于本地模型支持及代码隐私保护。

- **核心技术概念 (Core AI Concepts)**：
    - **基础协议**: **MCP (Model Context Protocol)** 的跨工具连接能力。
    - **记忆系统**: **Engram** (如 DeepSeek V4) 条件记忆系统, 对话上下文与长期记忆的区别。
    - **技能系统**: AI 如何通过 **Skills** (工具调用) 扩展能力边界。
    - **思考模式**: **混合思考 (Hybrid Thinking)** 模型（如 Claude 3.7）的原理与应用。

- **大模型家族与特性 (Model Fundamentals)**：
    - **国际顶尖模型**: **Claude 4.6**, **GPT-5.3**, **Gemini 3.1**。
    - **国内领先模型**: **DeepSeek V4**, **Qwen 3.5-plus**, **GLG-5**, **Kimi 2.5**, **MiniMax 2.5**。
    - **核心评估**: 区分各模型的 Reasoning 能力、上下文窗口大小、推理效率以及在特定编程任务（如代码生成、调试、重构）中的表现差异。

- **现代 AI 工作流 (Advanced Workflows)**：
    - **模式理解**: **Plan/Spec/Agent** 三位一体的工作流逻辑。
    - **Vibe Coding**: 意图驱动编程的新范式。
    - **规范化**: **.cursorrules** 等规则文件在项目级 AI 约束中的应用。

### 1.4 成功标准
- 员工能够流畅完成答题。
- 能够清晰展示合格/不合格状态及改进建议。

---

## 2. 技术规格

### 2.1 技术栈
- **前端框架**：React (Vite)
- **样式**：Tailwind CSS
- **组件库**：shadcn/ui (Radix UI)
- **图标**：Lucide React
- **动效**：Framer Motion (可选，用于提升体验)

### 2.2 数据模型 (questions.json)
```json
[
  {
    "id": 1,
    "type": "single",
    "question": "在 Cursor 中，哪个快捷键用于打开 AI 聊天侧边栏？",
    "options": ["Ctrl/Cmd + L", "Ctrl/Cmd + K", "Ctrl/Cmd + I", "Ctrl/Cmd + J"],
    "answer": [0],
    "explanation": "Ctrl/Cmd + L 是打开 Chat 面板的快捷键。"
  }
]
```

---

## 3. 实施阶段与任务

### 阶段 1：项目初始化与环境搭建
- [ ] 使用 `npm create vite@latest` 初始化 React + TypeScript 项目。
- [ ] 安装并配置 Tailwind CSS。
- [ ] 初始化 shadcn/ui 并安装必要组件（Button, Card, Progress, RadioGroup, Checkbox）。

### 阶段 2：题目数据与类型定义
- [ ] 定义题目类型的 TypeScript 接口（包括 `category` 字段，用于按主题分类）。
- [ ] 创建 `src/data/questions.json` 并编写 80 道以上题目，确保全方位、超前考核。
- [ ] **重点题目编写清单**：
    - [ ] **编辑器独门秘籍对比**: **Google Antigravity** (浏览器 Agent/Mission Control), **Cursor** (Composer), **Windsurf** (Cascade AI), **Trae** (极致速度/内置 Skills), **Qoder** (Quest 异步任务)。
    - [ ] **最新模型特性**: **Claude 4.6**, **GPT-5.3**, **Gemini 3.1**, **DeepSeek V4**, **Qwen 3.5-plus**, **Kimi 2.5**, **MiniMax 2.5** 的核心优势对比。
    - [ ] **基础概念强化**: **MCP, Skills, Memory, Context** 的深入应用。
    - [ ] **实战工作流**: **Plan/Spec/Agent** 逻辑、**Vibe Coding** 的评估。

### 阶段 3：核心业务逻辑开发
- [ ] 实现 `useQuiz` 自定义 Hook，管理答题状态（当前题号、已选答案、得分、是否完成）。
- [ ] 编写计分算法，特别是多选题的得分逻辑。

### 阶段 4：界面开发 (UI/UX)
- [ ] **欢迎页面**：介绍测试目的和要求。
- [ ] **答题页面**：
    - 顶部：进度条。
    - 中部：题目卡片（支持单选/多选）。
    - 底部：导航按钮（上一题/下一题/提交）。
- [ ] **结果页面**：
    - 分数展示（环形进度条或大数字）。
    - 题目回顾列表，显示错题及解析。

### 阶段 5：优化与部署
- [ ] 添加转场动画（Framer Motion）。
- [ ] 确保在不同屏幕尺寸下的兼容性。
- [ ] 编写 README.md 说明如何修改题目。

---

## 4. 风险与备选方案
- **风险**：纯前端应用，数据易被篡改。
- **对策**：由于是内部评估，以自觉为主。若需防作弊，后期可考虑添加简单的混淆或后端验证。
