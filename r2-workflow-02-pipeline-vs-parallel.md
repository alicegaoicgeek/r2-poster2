---
source: r2-workflow-02-pipeline-vs-parallel.png
extractor: vision
---

# R2- 有屏障才用 parallel，否则一律 pipeline

## pipeline 是默认选择：无屏障

Item A/B/C 各自 S1 → S2 → S3，快的不等慢的。

## parallel 是有屏障：慎用

Item A/B/C 各自 S1 后汇合 → 等最慢的 → 再进 S2。快的干等慢的。

## 只用 parallel 的三种情况

1. 需要全集去重 / 合并后才进入下一阶段
2. 要根据总数提前退出：0 bug → 跳过验证
3. 下一阶段 prompt 要引用其他所有发现做横向比较

## 核心原语

- `agent(prompt, {schema})`
- `pipeline()` / `parallel()`
- `phase()` / `log()`
- `workflow()` / `args` / `budget`

## schema 不是装饰

它是唯一保证 agent 返回值结构正确的机制。  
不带 schema，只拿回字符串。

## 选型光谱

- 单步改动 → subagent 跑腿 → Teams 开会 → Workflow 流水线
- 编排权：你 → Claude 逐轮 → 代码
- 规模：1 → 几个 → 数十到数百

## 四条避坑

1. 单轮能解，别上 workflow
2. 必须设 token 预算顶
3. 同一 Agent 不能既干又验
4. Loop 必须配 /go

## 硬参数

| ≤16 并发 | ≤1000 agent/run | 同会话断点续跑 | 脚本无 fs/shell | v2.1.154+ |
|----------|-----------------|----------------|-----------------|-----------|

R2芯片智能体
