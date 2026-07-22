---
source: R2-24H-PPA_baoyu_03-build-loop.png
extractor: vision
---

# R2-PPA 先建成 loop，否则只是改 RTL

03/09

必须建成可重复执行的loop，每轮在INDEX留下可检索记录。

## LOOP 七步

| # | 步骤 |
|---|------|
| 01 | 读 INDEX |
| 02 | 诊断 critical path，写根因 |
| 03 | 三三制三家族 |
| 04 | 对拍 / equiv_check，失败入库 |
| 05 | 对通过者相对基线算 score |
| 06 | 写回 INDEX |
| 07 | 换挡或停表人签 |

## MODULE 分工表

| 角色 | 职责 |
|------|------|
| 模型 | 提出改写 |
| 工具 | 给时序、面积、等价 |
| INDEX | 保存轨迹 |
| 人 | 灰区抉择，签字 |

## 四个能不能

1. 固定基线，才能客观比较
2. 失败可检索，才能避免重蹈覆辙
3. 提升可回放，才能沉淀方法
4. 无改善强制换挡，才能突破局部最优

## INDEX 最小字段 (Dark)

| 字段 | 含义 |
|------|------|
| major | 对应项目 / 模块 / 阶段 / 版本 |
| 根因 | critical path 根因分类与定位 |
| 三候选 | 三家族主要改写方案摘要 |
| 门禁 | 功能 / equiv / CDC / Lint / DRC 等结果 |
| WNS-TNS-Area 与 score | 相对基线：WNS、TNS、Area、PPA score |
| 决策 | 通过 / 失败 / 换挡 / 停表 + 人签 |
| 无改善计数 | 连续无改善轮次计数 |
| 时间戳 | 写入 INDEX 的时间 |

## 底部流程
读 INDEX → 诊断根因 → 三三制三家族 → 对拍/equiv 失败入库 → 算 score → 写回 INDEX → 换挡/停表 人签

R2 芯片智能体
