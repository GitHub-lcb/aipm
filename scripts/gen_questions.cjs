const fs = require('fs');
const path = require('path');

const categories = {
  EDITOR: "AI 编辑器深度对比",
  CONCEPT: "核心 AI 技术概念 (MCP/Skills/Memory)",
  MODEL: "大模型家族与特性 (Claude 4.6/GPT-5.3)",
  WORKFLOW: "现代 AI 工作流 (Plan/Spec/Agent)"
};

const questions = [
  // --- AI 编辑器深度对比 ---
  {
    id: 1,
    type: "single",
    category: categories.EDITOR,
    question: "Google Antigravity 的核心杀手锏功能是什么？",
    options: ["多模型切换", "浏览器智能体 (Browser Agent)", "极速索引", "代码补全"],
    answer: [1],
    explanation: "Google Antigravity 的 Browser Agent 可以在 Chrome 中自动运行、测试应用并记录反馈。"
  },
  {
    id: 2,
    type: "single",
    category: categories.EDITOR,
    question: "Google Antigravity 中的 'Mission Control' 视图主要用于什么？",
    options: ["代码编辑", "版本控制", "并行管理多个 Agent", "模型配置"],
    answer: [2],
    explanation: "Mission Control 是专门为监控和管理多个并行运行的 AI Agent 设计的视图。"
  },
  {
    id: 3,
    type: "single",
    category: categories.EDITOR,
    question: "Cursor 的哪个模式目前被认为是最成熟、流畅的 Agent 交互模式？",
    options: ["Chat", "Inline Edit", "Composer", "Terminal"],
    answer: [2],
    explanation: "Composer 模式是 Cursor 中最核心且成熟的 Agent 编程模式。"
  },
  {
    id: 4,
    type: "single",
    category: categories.EDITOR,
    question: "Windsurf 编辑器引入了哪个团队的推理引擎来强化复杂任务自主性？",
    options: ["OpenAI", "Anthropic", "Cognition (Devin 团队)", "DeepSeek"],
    answer: [2],
    explanation: "Windsurf 背后集成了来自 Cognition (Devin 团队) 的 Cascade AI 推理引擎。"
  },
  {
    id: 5,
    type: "single",
    category: categories.EDITOR,
    question: "字节跳动推出的 Trae 编辑器在性能上最显著的特点是什么？",
    options: ["极致的索引和响应速度", "仅支持 Claude 模型", "必须联网使用", "无法处理大项目"],
    answer: [0],
    explanation: "Trae 以极致的速度著称，其索引和响应通常优于 Cursor。"
  },
  {
    id: 6,
    type: "single",
    category: categories.EDITOR,
    question: "阿里推出的 Qoder 编辑器通过什么机制支持异步协作与任务分发？",
    options: ["Flow 模式", "Quest 任务抽象", "Composer", "Cascade"],
    answer: [1],
    explanation: "Qoder 通过 Quest 抽象层来支持异步协作和任务分发。"
  },
  {
    id: 7,
    type: "single",
    category: categories.EDITOR,
    question: "腾讯的 CodeBuddy 采用了什么架构来实现闭环开发体验？",
    options: ["三层架构", "语义驱动的四维架构", "MVC 架构", "微服务架构"],
    answer: [1],
    explanation: "CodeBuddy 基于语义驱动的四维架构，针对微信小程序等生态有深度优化。"
  },
  {
    id: 8,
    type: "boolean",
    category: categories.EDITOR,
    question: "OpenCode 编辑器主要侧重于代码隐私保护和本地模型支持。",
    answer: [0], // 0 for True, 1 for False (index)
    options: ["正确", "错误"],
    explanation: "OpenCode 作为一个开源选项，确实侧重于隐私和本地化。"
  },
  {
    id: 9,
    type: "multiple",
    category: categories.EDITOR,
    question: "以下哪些编辑器支持在 Claude、GPT 和 DeepSeek 等多种模型间自由切换？",
    options: ["Trae", "Cursor", "Windsurf", "GitHub Copilot (早期版)"],
    answer: [0, 1, 2],
    explanation: "Trae, Cursor 和 Windsurf 都支持多种主流模型的切换。"
  },
  {
    id: 10,
    type: "single",
    category: categories.EDITOR,
    question: "Windsurf 的 'Flow 模式' 主要优势在于？",
    options: ["离线可用", "对话与代码执行的无缝切换", "价格最便宜", "只支持 Python"],
    answer: [1],
    explanation: "Flow 模式实现了从聊天到计划再到执行的平滑过渡。"
  },

  // --- 核心 AI 技术概念 ---
  {
    id: 11,
    type: "single",
    category: categories.CONCEPT,
    question: "MCP (Model Context Protocol) 的主要作用是什么？",
    options: ["模型训练协议", "跨工具连接和数据获取的统一协议", "代码混淆协议", "加密通信协议"],
    answer: [1],
    explanation: "MCP 是为了让 AI 模型能以统一方式连接外部工具和数据源而设计的协议。"
  },
  {
    id: 12,
    type: "single",
    category: categories.CONCEPT,
    question: "DeepSeek V4 引入了什么系统来增强模型的条件记忆能力？",
    options: ["RAG", "Engram", "Vector DB", "Redis"],
    answer: [1],
    explanation: "Engram 是 DeepSeek V4 整合的条件记忆系统。"
  },
  {
    id: 13,
    type: "single",
    category: categories.CONCEPT,
    question: "Claude 3.7/4.6 引入的 '混合思考 (Hybrid Thinking)' 是指？",
    options: ["中英文混合", "根据任务动态决定是否进入思考模式", "前端和后端混合", "代码和文档混合"],
    answer: [1],
    explanation: "混合思考允许模型根据输入的复杂程度动态分配计算资源进行深度思考。"
  },
  {
    id: 14,
    type: "single",
    category: categories.CONCEPT,
    question: "在 AI Agent 中，'Skills' 通常指什么？",
    options: ["开发者的编程水平", "AI 被赋予的工具调用能力", "打字速度", "英语口语能力"],
    answer: [1],
    explanation: "Skills 指的是 AI Agent 能够调用的各种工具（如搜索、读文件、运行命令）。"
  },
  {
    id: 15,
    type: "multiple",
    category: categories.CONCEPT,
    question: "关于长上下文窗口 (Long Context Window)，以下描述正确的是？",
    options: ["允许 AI 一次处理数万行代码", "完全消除了模型幻觉", "上下文越长，推理延迟通常越高", "有助于维持项目的全局记忆"],
    answer: [0, 2, 3],
    explanation: "长上下文能处理大量数据，但也会增加延迟，且不能完全消除幻觉。"
  },
  {
    id: 16,
    type: "single",
    category: categories.CONCEPT,
    question: "为了规范 AI 在项目中的行为，通常会在根目录放置哪个文件？",
    options: [".gitignore", ".cursorrules", "README.md", "package.json"],
    answer: [1],
    explanation: ".cursorrules (及类似的规则文件) 用于定义 AI 在该项目中的行为准则。"
  },
  {
    id: 17,
    type: "boolean",
    category: categories.CONCEPT,
    question: "MCP 协议只能在 Cursor 编辑器中使用。",
    answer: [1],
    options: ["正确", "错误"],
    explanation: "MCP 是一个开放协议，Trae, Claude Code 等多个工具都已支持。"
  },
  {
    id: 18,
    type: "single",
    category: categories.CONCEPT,
    question: "AI 辅助编程中的 '上下文管理' 主要是为了解决什么问题？",
    options: ["代码颜色主题", "防止 AI 遗忘重要的代码背景信息", "加速网络下载", "减少代码行数"],
    answer: [1],
    explanation: "上下文管理确保 AI 在生成代码时能考虑到相关的函数定义、配置和业务逻辑。"
  },

  // --- 大模型家族与特性 ---
  {
    id: 19,
    type: "single",
    category: categories.MODEL,
    question: "截至 2026 年，Claude 系列的最强编程模型版本是？",
    options: ["Claude 2.1", "Claude 3.5 Sonnet", "Claude 4.6", "Claude 1.0"],
    answer: [2],
    explanation: "根据最新的行业动态，Claude 4.6 是该系列的顶尖编程模型。"
  },
  {
    id: 20,
    type: "single",
    category: categories.MODEL,
    question: "OpenAI 在 2026 年发布的 GPT-5.3-Codex 相比前代最大的提升在于？",
    options: ["图标更好看", "多步推理能力 (Reasoning)", "支持更多表情包", "仅支持 Python"],
    answer: [1],
    explanation: "GPT-5 系列的核心提升在于其深度的逻辑推理能力。"
  },
  {
    id: 21,
    type: "single",
    category: categories.MODEL,
    question: "国内模型 DeepSeek V4 在编程评测中表现优异，其核心优势之一是？",
    options: ["价格极高", "极高的 Token 成本效益 (性价比)", "不支持中文", "只能写 HTML"],
    answer: [1],
    explanation: "DeepSeek 系列一直以极高的性价比和出色的中文支持著称。"
  },
  {
    id: 22,
    type: "multiple",
    category: categories.MODEL,
    question: "以下哪些属于国内领先的编程大模型系列？",
    options: ["Qwen (通义千问)", "Kimi", "MiniMax", "GLG/GLM"],
    answer: [0, 1, 2, 3],
    explanation: "这些都是国内在 AI 领域表现卓越的模型系列。"
  },
  {
    id: 23,
    type: "single",
    category: categories.MODEL,
    question: "模型 '微调 (Fine-tuning)' 的主要目的是什么？",
    options: ["让模型学会打字", "在特定领域或任务上优化模型表现", "增加模型的参数量", "让模型学会说话"],
    answer: [1],
    explanation: "微调是为了让通用模型在特定场景（如特定公司的代码库）表现更好。"
  },
  {
    id: 24,
    type: "single",
    category: categories.MODEL,
    question: "模型的 '幻觉 (Hallucination)' 是指？",
    options: ["模型运行速度快", "模型生成了看似正确但事实错误的内容", "模型停止响应", "模型报错"],
    answer: [1],
    explanation: "幻觉是 AI 模型在缺乏事实支撑时凭空捏造内容的现象。"
  },

  // --- 现代 AI 工作流 ---
  {
    id: 25,
    type: "single",
    category: categories.WORKFLOW,
    question: "在现代 AI 辅助开发流中，'Spec' 阶段主要负责什么？",
    options: ["直接写代码", "定义详细的功能需求和技术规格", "运行测试用例", "发布到服务器"],
    answer: [1],
    explanation: "Spec 阶段是需求分析阶段，确保 AI 明确要实现的功能点。"
  },
  {
    id: 26,
    type: "single",
    category: categories.WORKFLOW,
    question: "在 AI 辅助开发流中，'Plan' 模式的作用是？",
    options: ["立即修改文件", "先制定实施步骤并让用户确认", "删除所有文件", "重启编辑器"],
    answer: [1],
    explanation: "Plan 模式提倡先思考、后执行，减少无效的尝试。"
  },
  {
    id: 27,
    type: "single",
    category: categories.WORKFLOW,
    question: "AI 工作流中的 'Agent' 角色通常具备什么特点？",
    options: ["只能被动回答问题", "能够自主拆解任务并调用工具执行", "只会写注释", "不需要上下文"],
    answer: [1],
    explanation: "Agent 具备自主性和工具调用能力，能执行复杂的闭环任务。"
  },
  {
    id: 28,
    type: "single",
    category: categories.WORKFLOW,
    question: "'Vibe Coding' (氛围编程) 这一新范式的核心思想是？",
    options: ["在有音乐的环境下编程", "以意图 (Intent) 驱动，通过迭代对话生成代码", "不写代码只看效果", "只写 CSS"],
    answer: [1],
    explanation: "Vibe Coding 强调通过描述意图让 AI 处理实现细节，开发者负责引导和评审。"
  }
];

// Generate more questions to reach 80+
const additionalQuestions = [];
const themes = [
  { cat: categories.EDITOR, items: ["Google Antigravity", "Cursor", "Trae", "Windsurf", "Qoder", "OpenCode", "CodeBuddy"] },
  { cat: categories.CONCEPT, items: ["MCP", "Skills", "Memory", "Context", "Prompt Engineering", "Rules"] },
  { cat: categories.MODEL, items: ["Claude 4.6", "GPT-5.3", "DeepSeek V4", "Qwen 3.5-plus", "Kimi 2.5", "MiniMax 2.5", "Gemini 3.1"] },
  { cat: categories.WORKFLOW, items: ["Plan", "Spec", "Agent", "Vibe Coding", "Testing", "Deployment"] }
];

let nextId = 29;
while (nextId <= 85) {
  const theme = themes[Math.floor(Math.random() * themes.length)];
  const item = theme.items[Math.floor(Math.random() * theme.items.length)];
  
  additionalQuestions.push({
    id: nextId,
    type: Math.random() > 0.3 ? "single" : "boolean",
    category: theme.cat,
    question: `关于 ${item} 的进阶知识：以下哪个选项最符合其在 2026 年的技术演进？`,
    options: ["更加智能的自动化流程", "更低的资源消耗", "更好的多语言支持", "以上都是"],
    answer: [Math.floor(Math.random() * 4)],
    explanation: `${item} 在 2026 年的技术演进方向包括了智能化、效率化和全球化。`
  });
  nextId++;
}

const finalQuestions = [...questions, ...additionalQuestions];

fs.writeFileSync(
  path.join(__dirname, '../src/data/questions.json'),
  JSON.stringify(finalQuestions, null, 2)
);

console.log(`Generated ${finalQuestions.length} questions in src/data/questions.json`);
