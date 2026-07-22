---
source: ornith-poster.png
extractor: vision
---

# Ornith 1.0

Self-Scaffolding · Agentic Coding · MIT License · DeepReinforce.AI · 2026.06

## 01 MODEL FAMILY · 四个尺寸 · 全部后训练

| 型号 | 说明 |
|---|---|
| 9B Dense | Dense · 单卡部署 · 基座: Gemma 4 |
| 31B Dense | Dense · 中等规模 · 基座: Gemma 4 |
| 35B MoE | MoE · 多卡部署 · 基座: Qwen 3.5 |
| 397B MoE | MoE · 旗舰 · 基座: Qwen 3.5 |

后训练并不丢人。大部分 lab 都做后训练，基建已经成熟且增速快，从预训练开始反而吃亏。

## 02 CORE INNOVATION · Self-Scaffolding: 连 harness 也交给模型自己生成

**TRADITIONAL**
人类写固定 harness (scaffold)，模型只管在此基础上生成 solution，RL 只优化 solution。harness 写死不动。

**ORNITH-1.0**
模型同时生成 harness + solution，RL 联合优化两者。模型在训练中学会什么样的执行流程能产生更好结果。

Ornith 直接把 harness 组织能力 变成了可优化目标，把 harness trace 内化到模型里面。

## 03 BENCHMARK · 开源编程模型最强 — 397B 超过 Claude Opus 4.7

| 模型 | Terminal-Bench 2.1 | SWE-bench Verified |
|---|---|---|
| Ornith-397B MoE | 77.5 | 82.4 |
| Claude Opus 4.7 | 70.3 | 80.8 |
| DeepSeek V4 Pro | 67.9 | 80.6 |
| MiniMax M3 | 66 | ≈80.5 |
| Qwen 3.5 397B | 53.5 | 76.4 |

Ornith 397B 在 TB 2.1 超 Claude Opus 4.7 **7.2 分**，SWE-bench Verified 超 **1.6 分**。MiniMax M3 同尺寸差 11.5 分。

## 04 EFFICIENCY · 35B 干掉 397B — 方法论 > 参数量

TERMINAL-BENCH 2.1：**64.2** vs **53.5**

Ornith 35B MoE 超过 Qwen 3.5 397B 全量模型
参数量差 10 倍，方法论 > 算力 + 模型参数

## 05 KEY TECH · RL 内化 harness 的两个关键技术点

### 01 RL 而非 SFT
SFT 训练容易导致 catastrophic forgetting（学新忘旧）。RL 更好地 retain 之前的知识，trace 训练必须用 RL。

### 02 模型自建 harness
固定 harness 两大问题：泛化差（不同场景需不同 harness，知识稀缺）；人为限制卡住最优解。自建 harness 提升泛化与可优化性。

趋势：6-12 月内 harness 能力全部内化到模型 | 谁有大量 coding harness trace，谁就有商业价值

R2 芯片智能体 · R2 · CHIP · AGENT
