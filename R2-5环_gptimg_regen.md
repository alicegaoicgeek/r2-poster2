---
source: R2-5环_gptimg_regen.png
extractor: vision
---

# R2-5环

## 1 环：持续探索（敏捷架构探索）

在信息极度匮乏的早期，用 VP/HLS/Emulator 碰撞反压/死锁/QoS/CDC，把接口风险燃尽，收敛成机器可读 ICD——不是一次性画完拓扑

关键动作：接口哲学三分：Pipe / Valve / Translator → 九步收敛：路径选型→边界划分→接口三分→ICD v0.5→VP 碰撞→HLS 估算→Emulator→四维基准→Frozen ICD v1.0 → 三刀法压 F=G×H×I：切 DITL（不是切模块）、Stub 解耦、发布火车对齐 → 公式：试错成本 = 影响范围 × 验证代价 × 对齐损耗

## 2 环：持续集成（IP集成进SOC的6种方式）

搞清楚"怎么拼"——用机器可读的接口契约替代文档约定，specx 编译 Spec→SSoT JSON 作为唯一真理源，六条产线共享同一份 SSoT，结构上不可能不一致

关键动作：SSoT JSON（12类元信息）→ r2-cbbrtl, r2-c2rtl, r2-topgen, r2-reggen, r2-buildsoc

## 3 环：持续交付（ARM Hardware DevOps）

搞清楚"怎么交"——交付单位是"可工作特性"而非"完整芯片"。ARM 取消"feature complete"说法，改为"feature deliverable"。两阶段转型：Waterfall→Feature based→Automated integration

关键动作：Feature based flow → CI/CD 作为 feature 交付基础设施 → agent 7 层分层调度 formal/sim/regr/cov → 小变更短迭代持续重构 → 每次交付立刻跑 DiffTest/回归，通过即交付失败即回滚

## 4 环：持续验证（VeriSmart-AIOS 流水线）

搞清楚"怎么证明没错"——以 DUT 为中心，32 个原子 Agent 单元 × 5 层验证架构，Harness 内 Agent 自主跑到机械 Oracle 全绿，人只在 32 签核。每个阶段五要素验收：① Case 完成状态 ② 代码覆盖率（可选参考）③ 功能覆盖率（必须达标，核心指标）④ 事件流覆盖率（DITL 关键路径）⑤ 断言覆盖率。全部达标才能阶段关闭，不要让代码覆盖率绑架签核决策

关键动作：读 Spec/RTL 隔离场景 → C/DSL 可执行 Case 替代文档验收 → 7 层分层调度 formal/sim/regr/cov agent 并行 → TDD 三层（集成/单元/属性）+ 瑞士奶酪 6 方法叠加 → 逃逸概率→0 → 硅前硅后同一套 case 自证正确

## 5 环：持续进化（Loop Engineering + 四指令飞轮）

搞清楚"怎么越跑越聪明"——三层嵌套反馈环：分钟级 Agent 自迭代（写→测→改），小时级人工纠偏（看产出→调方向→更新规格），天/周级外部反馈（用户数据→修正产品愿景）。r2-mdistill→r2-mretention→r2-mverify→r2-mevolve 四指令飞轮把每次循环的经验蒸馏为系统记忆，让下一次比这一次更好

关键动作：每轮执行产出 trace → r2-mdistill 蒸馏失败模式为 Skill → r2-mretention 写入结构化记忆（GOAL.md/PROGRESS.md）→ r2-mverify 费曼检验 3-10 样本验证 → r2-mevolve 对比新旧版本输出 → Harness 退化检测自动触发回滚 → 人签核关键决策

R2芯片智能体
