---
source: Claude-Code-内置智能体.png
extractor: vision
---

# Claude Code 内置智能体

**5 官方内置 · 启动方式 · 关闭配置**

## BUILTIN SUBAGENTS

| # | AGENT | MODEL | TOOLS | TRIGGER |
|---|-------|-------|-------|---------|
| 01 | 只读搜索 Explore | 继承主会话 | 只读 · 禁Write/Edit | 自动委托 · thoroughness分级 |
| 02 | 计划调研 Plan | 继承主会话 | 只读 · 禁Write/Edit | 计划模式自动 · 一次性不可续 |
| 03 | 探索+改 general-purpose | 继承主会话 | 全部工具 · 含 Write/Edit | 自动委托 · 默认派发 |
| 04 | 配置状态栏 辅助 statusline-setup | Sonnet | — | /statusline 自动调 · 不建议直接用 |
| 05 | 功能问答 辅助 claude-code-guide | Haiku | — | 问CC功能自动调 · 不建议直接用 |

## LAUNCH · 启动方式

- **01 自动委托** — Claude 根据请求自动派发
- **02 自然语言点名** — 提示里喊名字，Claude 决定照办
- **03 @ 提及 · 强制指定** — `@*Explore (agent)*`
- **04 --agent 整会话模式** — `claude --agent Explore`
- **05 /fork 后台分叉** — 后台跑，主会话继续工作
- **06 Ctrl+B 后台化** — v2.1.198 起子智能体默认后台

## DISABLE · 关闭配置

```
CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS=1  只关 Explore+Plan (v2.1.198+)
CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS=1  SDK/非交互全关
permissions.deny: ["Agent(Explore)"]  精确禁单个
CLI: --disallowedTools "Agent(Explore)" 或 deny Agent 禁全部委托
```

△ 第6个 verification agent — 第三方源码提及，官方文档无记载，属实验/内部智能体

R2芯片智能体 · R2 · CHIP · AGENT
