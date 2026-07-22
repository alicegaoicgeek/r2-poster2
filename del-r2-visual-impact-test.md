---
source: del-r2-visual-impact-test.png
extractor: vision
---

# R2-Claude Code Dynamic Workflows

把编排逻辑搬进代码的新原语

计划进入代码；脚本持有循环、分支和中间结果；Claude 只读取最终答案。

**11天 · 75万行 · 99.8% · 1000 agents**

Workflow = model-generated JS orchestration for large-scale agent work

## workflow.js（示意）

```
async function run() {
  for (const task of tasks) {
    if (task.type === 'analyze') {
      const data = await stepA(task.input)
      const result = await stepB(data)
      cache.set(task.id, result)
    } else if (task.type === 'plan') {
      const plan = await stepC(task.input)
      cache.set(task.id, plan)
    } else {
      await stepD(task)
    }
  }
  return collectFinalAnswers()
}
```

## 架构元素

- LOOP / BRANCH / STATE
- AGENT 网络
- Claude：只读取最终答案
- INTERMEDIATE RESULTS / ARTIFACTS / LOGS / METRICS / FINAL ANSWER

R2芯片智能体
