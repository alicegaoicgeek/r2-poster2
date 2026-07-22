---
source: r2-specx_169.png
extractor: vision
---

# r2-specx — 机器可消费的 Spec，消灭“三种理解”

R2-可执行文档

## 【病根】

人读 Spec → 四个角色认知偏差 → Bug 从源头流出

架构师说 A → 设计师写 B → 验证测 C  
（同一段话，三种心智模型）

## 【流程图】Spec → 共识 → 同源产物

1. Spec PDF（一份文档）
2. → pdf2md（结构化文本 + 页码追溯）→ Markdown
3. → specx（LLM = 翻译官，非建筑师）→ 结构化 SSoT（单一信源）
   - feature_points.json
   - regmap.json
   - vplan.json
   - ← 12 类元信息（寄存器/时序/FSM/中断...）
4. ★ 人审 10 分钟（质检员，非生产者）
5. 🛡 Guardrail：未过 Linter 不外露

### 12 类元信息（示例）

1. 功能点 (Feature Points)
2. 寄存器映射 (Regmap)
3. 时序 (Timing)
4. FSM/状态机
5. 中断 (Interrupt)
6. 复位/上电 (Reset/Power)
7. 地址空间 (Address Map)
8. 配置项 (Config)
9. 约束/规则 (Constraints)
10. 依赖关系 (Dependencies)
11. 术语表 (Glossary)
12. 追溯信息 (Traceability)

### 三种投影 · 零偏差共识

- **RTL 投影**（硬件实现）— 设计师视角
- **QOM 投影**（软件早介入）— 嵌入式视角
- **DOM 投影**（验证配置）— 验证师视角

### 6 条同源产线扇出

- r2-tdd（测试驱动开发）
- r2-cov（覆盖率模型）
- r2-qemu（QOM/仿真模型）
- r2-dom（验证环境配置）
- reggen（寄存器生成）
- topgen（顶层生成）

## 【本质】

- 共识 ≠ 开会对齐
- 共识 = 结构保证（同源数据 → 不可能不一致）
- 改 Spec → 自动重生 → 下游同步
- 人退出“翻译”，只做“审查”

## 【三条铁律】

1. LLM 只 Parse/Draft，不 Build
2. 改 SSoT 即改一切，禁止旁路修改
3. 每个产物必须可追溯到 Spec 原文页码

## 追溯保证

所有结构化条目与生成产物均携带原文页码 (page_id)，一键回溯到 Spec PDF。
