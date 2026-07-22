---
source: r2-gap4-02-skill-panorama.png
extractor: vision
---

# R2-11类 Skill 全景：编排先有调用需求，Skill 类别随后形成

## 调用时序地图

入口 / 产线启动第一个调用 → 演化 ↓

1. productsmart | 需求理解与拆解
2. specx | Spec → SSoT 编译 · 唯一心脏
3. designsmart | 架构方案生成
4. verismart | RTL 生成与验证闭环
5. metrics | 量化评估
6. eda | 工具链对接
7. ip | 复用与集成
8. debug | 根因定位
9. pr | 文档与评审
10. ams | 模拟混合信号
11. learn | 知识蒸馏与 Skill 自我演化

### SSoT 中枢（specx 唯一心脏）

六条产线同源喂粮：产线 A–F

Spec PDF → r2-specx → SSoT JSON

LLM 只 Parse / Draft

所有变更必须通过 SSoT 统一回灌——零偏差不靠人工审查，靠 SSoT 架构从结构上消除。

## 说明

11 类不是分类学，是 Harness 编排需求倒逼出的能力地图。编排什么，才需要什么。每增加一类，是因为某条产线出现了一次编排断裂。

不是人力规划的结果，是编排实践长出来的分类。稳定的编排单元不是设计出来的，是跑出来的。

### 11 类清单 · 按 Harness 调用时序与功能角色

1. productsmart | 需求理解与拆解 | 产线启动，第一个调用
2. specx | Spec → SSoT 编译 | 唯一心脏
3. designsmart | 架构方案生成
4. verismart | RTL 生成与验证闭环
5. metrics | 量化评估
6. eda | 工具链对接
7. ip | 复用与集成
8. debug | 根因定位
9. pr | 文档与评审
10. ams | 模拟混合信号
11. learn | 知识蒸馏与 Skill 自我演化

### 实测 · GPIO 80p + APB 桥 50p

25 min 交付 · 177 FP · 1130 断言 · 成本 $8

功能覆盖率 100% · Toggle 覆盖率 97.7%

首次在 FP55 捕获经人工审查确认的真实 Bug

## 演化方向：减法，不是膨胀

| 方向 | 说明 |
|------|------|
| 高频才 skill 化 | 一件事一天做超过一次，就做成 skill 或命令 |
| 颗粒度陷阱 | Skill 管业务流转 / 审批权限 / 组织原则，不是怎么写一个 Python 函数 |
| 编排逻辑从 Skill 体内抽离到 Harness 层 | |
| Loop 沉淀 | /loop → skill → 3-5 Loop 组合 → Routine |
| Skill 数量不会指数增长 | Harness 对可编排性的要求天然抑制膨胀 |

R2芯片智能体
