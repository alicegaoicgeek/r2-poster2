---
source: r2-claude-code-dynamic-workflows.png
extractor: vision
---

# R2-Claude Code Dynamic Workflows

## Claude Code Dynamic Workflows
把编排逻辑搬进代码的新原语

| 11天 | 99.8% | 1000并发 |
|------|-------|----------|

帖子：Claude Workflow: 编排变代码  
作者：高老师的分享局  
右滑查看详解 →

## 从 Subagent 到 Workflow: 一次架构跃迁

### EVOLUTION LADDER（演进阶梯）
(1) Session → (2) Subagent → (3) Workflow

- **Session**：单个Agent串行处理，从头到尾，一对一
- **Subagent**：主Agent派小弟干活，结果都回主上下文
- **Workflow**：编排逻辑写成代码，脚本自己管循环分支

### CORE CONCEPT（核心理念）
Workflow 的本质：
- 把计划搬进代码 - 不再是临场决策
- 脚本持有中间结果 - 不塞满上下文
- 主Agent只在最后被叫醒 - 读最终答案

JavaScript运行时当指挥 + agent() 点临时雇 LLM 干活

### KEY QUOTE（核心金句）
“计划被搬进了代码  
脚本自己持有循环、分支和中间结果  
Claude的上下文里只剩下最后那个答案”

解决的是：工作量大到上下文根本装不下时怎么办

## 核心架构 x Bun 真实案例

### 四大部件配合
JavaScript 运行时（无脑、确定性执行，只懂循环/拼字符串/await）  
→ Workflow 脚本（人类写的编排逻辑 或 Claude 现场生成）  
→ agent() 调用（临时雇 LLM subagent，跑完把结果交回脚本）  
→ 最终结果（唯一回到主上下文的东西）

脚本变量 <- 运行时内部循环 <- 汇总答案 -> 主Agent

### Bun 迁移案例：11天 x 75万行 x 99.8%
- **Phase 1** 生命周期映射：给每个 Zig struct field 算出正确的 Rust lifetime
- **Phase 2** 并行文件移植：数百 agent 同时开工，每文件配 2 个 reviewer
- **Phase 3** 编译测试 Fix Loop：while 循环反复迭代，直到 build & test 全过；脚本里写 while 循环，不靠 Claude 逐轮盯着

Bun 作者 Jarred Sumner: 从 Zig 整体迁移到 Rust

## Workflow vs n8n/Coze/Dify: 本质区别在哪？

| n8n / Coze / Dify | Claude Code Workflow |
|-------------------|----------------------|
| 编排作者：人工手搭建 | 编排作者：模型现场生成 |
| 控制流：可视化 DAG | 控制流：命令式 JS 代码 |
| 表达能力：静态依赖图 | 表达能力：循环+动态扇出 |
| 适用规模：中小规模流程 | 适用规模：数百 agent 并行 |

共性：都是确定性执行，运行时模型在睡觉，都能写 AI 节点

### 核心差异不是“AI 自动编排”
- AI 介入在“写代码”时刻
- 执行期间模型在睡觉
- 载体是图元完备代码
- 每个节点是自主 agent

一句话概括：  
Workflow == 把 n8n 那张图换成模型现场生成的一段 JS 代码  
区别：编排作者(人->模型) + 载体(可视化DAG->命令式代码)

## 什么时候该用 Workflow？成本怎么算？

### 适用场景
1. 代码库范围排查：bug扫描 / 性能审计 / 安全加固
2. 大规模迁移：框架替换 / API迁移 / 跨语言移植
3. 关键决策堆叠：多路搜索 + 对抗验证，错误答案代价高时用
4. 长尾清理：Overnight 自动扫描，逐个开 PR

### 成本与限制
Token 成本必须算：  
案例：133 会话盘点，11 个 agent = 81.8 万 token，轻量编排就这个数

硬约束要记牢：
- 并发 <= 16 个 subagent
- 单次 <= 1000 个 agent
- 运行中不接受人工输入
- 跨会话不可恢复

### 不适用
- 一两步搞定的小修补
- 需频繁拍板的探索性工作
- 安全/支付类高风险改动

### 选型对照
subagent --> 简单跑腿  
Agent Teams --> 开会讨论  
Workflow --> 流水线作业  
需要“流水线作业”时用 Workflow  
用大量并行换效率，但要算清 token 账

R2芯片智能体
