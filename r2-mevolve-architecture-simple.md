---
source: r2-mevolve-architecture-simple.png
extractor: vision
---

# r2-mevolve — Skill 自主进化引擎

r2-learn 四指令之一：蒸馏(mdistill) → 记忆(mretention) → 验证(mverify) → **进化(mevolve)**

## r2-mevolve 自主进化引擎
Agent Skill 的"训练器" —— 让 Skill 自己变好，永不退化

原始 Skill (SKILL.md) ← 来自 mdistill 蒸馏
↓
人工签核 CHECKPOINT
↓

### 核心优化循环 (Hill-Climbing)
评分（双裁判）→ 找最低维度（短板诊断）→ 生成改进（单点修改）
↓ 运行实测 (Live Test) ← test-prompts.json 独立测试场景
循环条件：分数提升 ∧ 轮次 < MAX_ROUNDS(3)

### 棘轮机制 Ratchet
- 分数 ↗ → git commit
- 分数 ↘ → git revert
- 只进不退，历史可审计

优化后 Skill (SKILL.md) → 进入 mverify 验证门禁

## 为什么这样设计

**Q: 为什么双裁判而不是自我评分？**
A: LLM 自我评分有严重乐观偏差。主 Agent 改代码，子 Agent 当裁判，分数是唯一客观信号。每轮更换裁判，防止偏差累积。

**Q: 为什么爬山不是梯度下降？**
A: SKILL.md 是不可微文本，没有梯度。离散空间里爬山是策略，每次只改最弱维度，像芯片 ECO 单点优化。

**Q: 为什么只跑3轮？**
A: 真正改进2-3轮可见。超过3轮是噪声和过拟合。

**Q: 为什么用 git revert 而非 reset？**
A: 棘轮要求版本链只进不退。reset 破坏审计痕迹。退化必须 revert。

**Q: 结构(59)为什么远重于效果(35)？**
A: 结构是地基——先保证"写得对"，再追求"用得好"。

## 五阶段生命周期

| Phase | 名称 | 内容 | CHECKPOINT |
|---|---|---|---|
| 0 | 初始化 | git init 加载Skill | 人工确认 |
| 0.5 | 测试设计 | 生成 test-prompts.json | 人工确认 |
| 1 | 基线评估 | 双裁判盲评 产出基线分数 | 人工确认 |
| 2 | 爬山优化循环（核心，最多3轮） | 找短板→改→评→确认 | 人工确认 |
| 3 | 报告 | 输出优化报告 | 人工确认 |

每个阶段间强制人工签核，自动化只在阶段内运行。

## 评分体系：9 维度 × 100 分

### 结构维度 (59分)
| 维度 | 分 |
|---|---|
| D1 元数据规范 | 7 |
| D2 工作流清晰度 | 12 |
| D3 边界条件覆盖 | 8 |
| D4 检查点设计 | 10 |
| D5 文件引用规范 | 7 |
| D6 触发词精准度 | 15 |

### 效果维度 (35分)
| 维度 | 分 |
|---|---|
| D7 执行准确度 | 12 |
| D8 失败模式编码 | 15 |
| D9 可执行具体性 | 8 |

### 元技能 (6分)
D* 自文档/自检

评分方式：静态分析(grep/AST) + 双裁判Agent盲评 + 实测对比

## 在 r2-learn 中的位置

r2-learn 四指令闭环：
人类经验 → mdistill（蒸馏成Skill）→ mretention（持久化记忆）→ mverify（质量门禁）→ mevolve（自主进化）
→ 更强大的 Skill ← 进化信号回灌到蒸馏/记忆

mevolve 是这个闭环的"最后一公里"：
- mdistill 创建 Skill
- mretention 记住经验
- mverify 保证质量
- mevolve 让 Skill 自己变好 —— 永不退化，只会进步

## 一句话
r2-mevolve = Skill 的"健身房私教" — 测出短板，针对性训练，只记进步，拒绝倒退。

R2芯片智能体
