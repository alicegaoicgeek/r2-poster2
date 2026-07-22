---
source: R2-agent8-01-react-3x4.png
extractor: vision
---

# R2- ReAct · 推理与行动协同

01/09

## 流程

User Input 用户输入 + Context Memory 上下文记忆

1. **Reasoning** 推理（想）
2. **Decide** 决策（定方向）
3. **Action** 行动规划（想做什么）
4. **Execute** 执行（去做）
5. **Observation** 观察（看结果） ↔ **Env & Tools** 环境与工具（网页、搜索、代码、数据库 …）
6. **Feedback** 反馈（总结给推理）→ 回到 Reasoning
7. **Done** 完成（结束条件满足）
8. **Final Output** 最终输出（给用户）

## 最基础，所有架构的起点

| | |
|--|--|
| 流程总结 | 想 → 做 → 看反馈 → 再想 → 再做 循环到完事 |
| 优点 | 简单，啥都能套 |
| 缺点 | 来回调 LLM，费钱又慢 |

R2 R2芯片智能体 01/09
