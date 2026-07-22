---
source: r2-arm-devops-claude-weekly-release.png
extractor: vision
---

# R2-ARM Hardware DevOps × Claude Code 一周发布

同一个转型逻辑：从「计划驱动的大交付」，转向「反馈驱动的小交付」。

## 左侧：ARM | DVCon Europe 2020 The Benefits of Hardware DevOps

### 内在动机
① 可预测性变差  
② 需求一致性理解不足  
③ 缺乏快速反馈机制

### 两阶段转型
Phase 1: Waterfall / Planned → Feature based  
→ Phase 2: Automated integration

### Feature based flow
- 从计划时间和资源，转向计划 feature 及交付所需的一切
- 提升可预测性，提升预测 ROI 能力
- CI/CD 成为 feature 交付的稳定基础设施

### CI 关键机型
- ML regression：把回归测试优化为 50 个 smoke tests
- 关注 outcome，而不是 time / resource
- 用 ML 优化 smoke test flow

### ML smoke test gate
质量门禁：只放行可交付的 feature  
（反馈回流）

### ARM QA 的核心结论
- 不再说 feature complete，改说 feature deliverable
- 旧 RTL 不丢弃，用于 estimation 和 reuse
- Smoke test 是小变更、短迭代的质量门禁
- Hardware delivery = IP → SoC → 板级 → 软件的持续交付与反馈
- 共享基础设施是必要条件：同仓库、同数据、同反馈

## 右侧：Claude Code | 2026 团队分享会

### 传统做法
- 策划一个月，开发两个月，测试一个月，一次性发布
- 六个月都在猜用户会喜欢什么
- 猜错了，半年白干

### 一周发布节奏
砍掉「大版本」概念  
每周至少推一个能用的新功能上线  
→ 让真实用户用、反馈、用脚投票

### 为什么有效
- 反馈周期从半年一次，变成每周一次
- AI 把「做」的成本压低，瓶颈变成「知道做什么」
- 功能越多越好是错的：快速试，快速砍

### 实际例子：AI 代码审查
- 传统方式：三个月做完整版，上线后没人用
- 一周发布：先上线最小版本，看数据，周内改方向，下周继续

### 验证标准
从功能完成到用户可用 ≤ 7 天  
（反馈回流）

## 共同结论
不是更快地做完大计划。而是把交付拆小，让真实反馈持续进入系统。

## 共同公式
Predictability = Short delivery loop + Automated gate + Real feedback

R2芯片智能体
