---
source: r2-40tools-poster-v13.png
extractor: vision
---

# 40. Claude Code 内置工具

R2- · DEEP RESEARCH

工具是 Agent 的感官——每个工具是一个确定的、不可逆的、原子性的系统调用，与 syscall 完全一致。

## 01 文件操作

Read · Write · Edit · Glob · Grep · NotebookEdit

## 02 Shell

Bash · PowerShell · Monitor

## 03 Agent 协作

Agent · SendMessage · TaskCreate · TaskUpdate · TaskStop

## 04 Skill 系统 + LSP

Skill – SKILL.md 指令包 · LSP – 代码导航

## 05 Cron 调度

CronCreate · CronDelete · CronList · ScheduleWakeup

## 06 MCP + Workflow

ToolSearch · MCP 配置 · Workflow 多 Agent 编排

## 07 其余工具

AskUserQuestion · PushNotification · WebFetch · WebSearch · EnterPlanMode · ExitPlanMode · EnterWorktree · ExitWorktree · TodoWrite

## 速查 · 最可能用错的工具

| 场景 | 错用 | 正确 | 一句话 |
|------|------|------|--------|
| 找文件 | Bash find | Glob | 按修改时间排序，比 find 更快 |
| 搜内容 | Bash grep | Grep | content 带行号与上下文，一次命中 |
| 读代码 | Bash cat | Read | 返回行号，Edit 精准替换的燃料 |
| 改代码 | Write 整文件 | Edit | 精准替换 小改 Edit，大改 Write |

■ R2芯片智能体
