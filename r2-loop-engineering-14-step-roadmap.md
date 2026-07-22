---
source: r2-loop-engineering-14-step-roadmap.png
extractor: vision
---

# R2- 构建 Loop Engineering 的 14 步路线图

## 第一段：先想清楚要不要做

01 确认这活是重复的 — 一次性的活，好 prompt 更划算  
02 确认有东西能自动判定“干砸了” — 测试、类型检查、linter，至少一个  
03 确认 token 预算扛得住浪费 — loop 不产出也照样烧钱  
04 确认 Agent 跑得了自己写的代码 — 有日志、能复现、看到哪崩了  
05 确认你真打算 review 产出 — 不打算、就别建

## 第二段：搭一个最小能跑的 Loop

06 先让一次手动运行稳定下来 — 顺序别跳  
07 把项目背景沉淀成一个 Skill — 省得每轮从零解释  
08 加一个状态文件 — 记下做完了什么、下一步干啥  
09 设一道硬闸门 — 测试 / 构建过不了就自动拒（重点）  
10 配一个 Automation — 按节奏触发，用 /goal 设停止条件  
11 多个 Agent 并行就上 Worktree — 别让它们改同一个文件打架  
12 接上 Connectors — 让 loop 能开 PR、更新 ticket、发 Slack  
13 拆出 Sub-agents — 写代码的和验收的分开

## 第三段：上线之后守住

14 盯住每个被接受的改动成本 — 定期复审权限，读 diff，别让 loop 碰架构

## 核心判断

Loop Engineering 不是把 Agent 放飞。  
是先确认值得循环，再用硬闸门、状态文件、隔离环境和验收分工把它关进工程轨道。

R2芯片智能体
