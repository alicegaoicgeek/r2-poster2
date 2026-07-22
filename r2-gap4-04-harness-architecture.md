---
source: r2-gap4-04-harness-architecture.png
extractor: vision
---

# R2-Harness 架构图模板：填完这一刻，第一条产线就有了骨架

每个节点填上你的 Skill 名称和调用顺序。填写时间 ≤ 5 分钟。

## 编排骨架：
入口 | spec 被 specx 编译为 SSoT

## 并行分解 · parallel() | productsmart 拆解需求 | 研究线 A / 研究线 B / 研究线 C | 并行研究 / 汇总

- 研究线 A ________
- 研究线 B ________
- 研究线 C ________

## 流水线阶段 · pipeline() | designsmart → verismart → metrics

________ → ________ → ________

## Maker / Checker 对抗
Maker — 产出 RTL / 方案  ↔  Checker — 寻找否定证据（至少一条才算完成）

## 汇总 · eda toolchain 对接
________

## 签核出口 | Oracle 全绿 → 停止条件四条硬线 → 人签核落盘
________

## 停止条件 · 四条硬线 · 写进 Loop 配置：
① 连续 3 轮零发散 ________  
② 全绿签名一致 ________  
③ DRC clean + WNS ≥ 0 ________  
④ 人签核落盘 ________

## 四件套底座 · 本架构运行前提：

| Harness — agent / parallel / pipeline / while | Oracle — 机械判据，非 LLM 自判 | Memory — 跨会话持久，代码是唯一文档 | Loop — 四条硬线完备才停 |
|---|---|---|---|

填完了，产线就有了骨架。  
R2芯片智能体
