---
source: r2-workflow-01-orchestration-transfer.png
extractor: vision
---

# R2-从「模型每次现想」到「代码一次写定」

## 旧世界：Claude 逐轮决策
每轮看结果决定下一步  
Agent1 / Agent2 / Agent3 的中间结果全部回上下文  
瓶颈：上下文装不下，目标逐轮漂移

Agent1 / Agent2 / Agent3 … → 中间结果汇入 **主上下文（黑盒）** → 最终答案回传  
瓶颈断点：中间结果塞满主上下文

## 新世界：JS 脚本一次写定
循环、分支、恢复、预算全在代码里  
LLM-1 / LLM-2 / LLM-N 的结果进脚本变量  
不进主上下文，只回传最终答案

**编排权让渡** →

JS 运行时（确定性总线）  
→ agent() LLM-1 / LLM-2 / LLM-N … → 结果  
→ 脚本变量池（不进主上下文）  
→ 闸门  
→ 最终答案回传（只回主 Claude）

### 静态 vs 动态
- **静态**：规划与执行在同一上下文，短任务够用
- **动态**：Claude 临场写 JavaScript harness，用 spawn agent + 标准 JS 处理数据流

### 静态三病
- agentic laziness：做一半说做完
- preferential bias：自己验自己
- goal drift：多轮后忘目标

## 三层分工

1. JS 运行时 = 无脑指挥，确定性，不含 LLM
2. agent() = 临时雇 LLM 干活，干完即走
3. 主 Claude = 全程睡觉，跑完被叫醒读结果

## 反常识
Workflow 不是更聪明的 Agent。  
跑流程时，Agent 根本没在运行。

Boris：我不再为 Claude 写 prompt 了，我有一堆 loop 在跑，我的工作是写 loop。

R2芯片智能体
