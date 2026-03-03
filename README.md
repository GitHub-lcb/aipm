# AIPM - AI 编辑器使用资格评估系统

AIPM 是一个专为开发者设计的 AI 编辑器（Cursor, Trae, Windsurf 等）及现代 AI 工作流（MCP, Agentic Workflow）知识评估系统。

## 🚀 项目特性

- **深度题库**：内置 85 道高质量专业题目，涵盖：
  - **AI 编辑器深度对比**：Cursor, Trae, Windsurf, Google Antigravity 的核心特性。
  - **核心技术架构**：MCP 协议、Memory 系统、Skills 调用机制。
  - **现代 AI 开发工作流**：Plan/Spec 模式、Vibe Coding 范式、Agentic Workflow。
  - **大模型特性前瞻**：Claude 4.6, GPT-5.3, DeepSeek V4 等最新模型能力。
- **现代化 UI**：基于 React 19 + Tailwind CSS v4 + Shadcn UI 构建，提供流畅的交互体验。
- **智能评分**：支持单选、多选、判断题，答题结束后提供详细的得分报告及题目解析。
- **响应式设计**：完美适配桌面端与移动端访问。

## 🛠️ 技术栈

- **前端框架**: [React 19](https://react.dev/)
- **构建工具**: [Vite 6](https://vitejs.dev/)
- **样式方案**: [Tailwind CSS v4](https://tailwindcss.com/)
- **组件库**: [Shadcn UI](https://ui.shadcn.com/)
- **动画库**: [Framer Motion](https://www.framer.com/motion/)
- **图标库**: [Lucide React](https://lucide.dev/)

## 🏃 快速开始

### 环境准备

确保您的电脑已安装 [Node.js](https://nodejs.org/) (建议 v18.0.0 或更高版本)。

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动成功后，在浏览器访问 [http://localhost:5173](http://localhost:5173)。

### 局域网访问

如果您需要在同局域网的其他设备访问，可以运行：

```bash
npm run dev -- --host
```

或者访问配置文件中指定的 IP 地址（如 `http://172.16.8.64:5174/`）。

## 📁 目录结构

- `src/components`: 核心业务组件 (Welcome, Quiz, Result)
- `src/hooks`: 答题逻辑 Hook (`useQuiz.ts`)
- `src/data`: 题库数据 (`questions.json`)
- `src/types`: TypeScript 类型定义
- `vite.config.ts`: 构建与服务器配置

## 📝 许可证

MIT License
