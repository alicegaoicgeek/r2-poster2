---
source: R2-agent8-02-plan-execute-3x4.png
extractor: vision
---

# R2- Plan-and-Execute · 规划与执行分离

02/09

## 流程

**User Goal 用户目标**

### 1 规划阶段 Planning

- Task Planner 任务规划
- Sub-task Decomposition 子任务分解
- Dependency Analysis 依赖关系分析
- Task List 任务清单

### 2 执行阶段 Execution

- Executor 执行器
- Tool Calls 工具调用
- Verification 结果验证

→ Success 成功 → Aggregated Result 聚合结果 / 最终输出

失败路径：Fail 失败 → 重规划（回到规划阶段）

## 先想清楚 再动手

### 模式概述

将复杂任务分为“规划”和“执行”两个阶段。先制定详细计划，再按计划逐步执行；若执行失败，则退回重新规划。

### 优点

- 复杂任务表现更好
- 步骤清晰，结果可追踪
- 易于回滚和重试
- 适合高风险任务场景

### 缺点

- 规划阶段不一定准确
- 对简单任务过于重型
- 规划耗时，成本较高
- 依赖规划质量

### 一句话总结

两阶段先规划再执行，搞砸了退回重新来过。

R2 芯片智能体 — 让复杂任务，更可靠地完成
