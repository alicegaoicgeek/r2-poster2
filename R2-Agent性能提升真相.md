---
source: R2-Agent性能提升真相.png
extractor: vision
---

# Karpathy Agent性能提升真相

AGENT · HARNESS · LOOP  
SOURCE: InfoQ / HuggingFace / Karpathy

不改模型权重，只优化外层执行机制（Harness），Agent 性能从 3.5% 拉升至 80.1%——76 分的差距与模型无关

| POOLED SCORE | COST RATIO | AUTO ITERATIONS |
|--------------|------------|-----------------|
| 3.5% → 80.1% 同一模型，仅换外层执行机制 | 1/7 运行成本仅为闭源模型的1/7 | 700次 Agent自动实验，找出20项人工遗漏改进 |

## 01 五种 Harness 对比：同一模型，得分波动 76 分

| # | HARNESS 类型 | 得分分布 | SCORE |
|---|-------------|----------|-------|
| 5 | mini-swe-agent | 5% | 3.5% |
| 4 | Goose | 23.2% | 23.2% |
| 3 | Pi | 45.4% | 45.4% |
| 2 | 原始 LAB Harness | 63.4% | 63.4% |
| 1 | 优化后 Harness（22轮迭代） | 80.1% | 80.1% |

## 02 Loop Engineering：低成本试错逼近最优解

1. **编写探索文档** — 告诉Agent探索方向与约束条件
2. **锁定评估脚本** — Agent只能改训练脚本，不能降标准
3. **启动循环** — 提出变更 → 训练 → 评估 → 保留好的
4. **自动迭代数百轮** — Agent不疲劳，人类十几轮就精疲力竭

### ELEMENT

- ELEMENT 01 验证器：自动判断结果好坏，否则等于自己批作业
- ELEMENT 02 状态文件：记录每次尝试，重启后从断点继续
- ELEMENT 03 停止条件：达到目标或撞顶即停，防止烧光Token

### CRITERIA

- CRITERIA 01 任务高频 至少每周重复一次
- CRITERIA 02 验证可自动化 无需人工干预
- CRITERIA 03 Token预算 能消化循环冗余
- CRITERIA 04 访问真实环境 不能闭眼迭代

## CORE INSIGHT

AI真正的护城河，从来不在于你用了多大的模型，而在于你能否构建一套让模型在真实世界中不断进化的系统，同时保持人类对系统底层逻辑的清醒掌控。

R2芯片智能体  
R2 · CHIP · AGENT  
2026.07 · AGENT HARNESS LOOP
