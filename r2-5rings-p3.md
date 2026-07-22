---
source: r2-5rings-p3.png
extractor: vision
---

# 03 持续交付 ARM Hardware DevOps

R2-5环 · 3/5

搞清楚"怎么交"——交付单位是"可工作特性"而非"完整芯片"。

ARM 取消"feature complete"说法，改为"feature deliverable"。

两阶段转型：Waterfall → Feature based → Automated integration

## 关键动作
- Feature based flow
- CI/CD 作为 feature 交付基础设施
- agent 优化 smoke test 至 50 个冒烟测试
- 小变更短迭代持续重构
- 每次交付立刻跑 DiffTest/回归，通过即交付失败即回滚

3/5 · R2芯片智能体
