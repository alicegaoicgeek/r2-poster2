---
source: R2-Cov-01-回归体检.png
extractor: vision
---

# 你的回归跑了几小时？先做个体检

R2-Cov · 回归筛选 · 01 / 06

## ARM 与 Siemens 的独立验证

| 指标 | ARM | Siemens |
|------|-----|---------|
| 测试流量 | CRT 的 16%（砍 84%） | 274 → 11–51（砍 80%） |
| 速度提升 | 1.35x | 6.6x |
| 质量提升 | 1.6x | 捕获全部失败 |
| 覆盖率差异 | 未披露 | ±0–2% |
| 算法 | Gradient boosted trees | Learned Mapping |
| 训练频率 | 每周重训 | 未披露 |

> "We classify randomly generated tests on their likelihood of failing/passing **pre-simulation** – before running a single cycle on the design."

> "The objective is to use a predictive filter, **before** simulating tests on the design. Prune inefficient tests that waste compute."

## 回归的主要浪费来自大量与当前变更无关的测试

问题不是测得不够，是跑得太多。两篇独立论文，同一套内核：变更 → 排序 → 子集 → 执行 → 反馈。

■ R2芯片智能体
