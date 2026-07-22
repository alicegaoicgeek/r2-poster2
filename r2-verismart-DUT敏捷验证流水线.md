---
source: r2-verismart-DUT敏捷验证流水线.jpg
extractor: vision
---

# R2-verismart-AIOS — 以 DUT 为中心的敏捷验证流水线

R2 / 01 · verismart-AIOS · 2026.06

32 Agent Units · 5 Verification Layers · AI-Native Closed Loop · DUT-Centric Agile Pipeline

**核心理念** Harness 之内 Agent 自主，Harness 之外人签核。32 个原子任务单元，5 层验证架构，以 DUT 为中心，AIOS 驱动闭环收敛。

## 1 AI Native 验证组织特点

- 智能体能从工程经验中学习
- 记忆让后面的会话不从零开始
- 边做边想 — 构建成本归零
- 代码 / 可执行契约是最好的文档
- 流程是信任不够的补偿机制
- 品味是模型无法替代的人类价值

## 2 AIOS 内核 — 五能力环绕 DUT

| 能力 | 内容 |
|------|------|
| 感知 | 读 Spec/RTL · Tool Search · MCP 总线 |
| 记忆 | plan.yaml · knowledge/ · history/ |
| ★ DUT ★ | Interface + Registers · Memories + Features |
| 交互 | 人签核 · Agent 协作 · 反馈闭环 |
| 执行 | formal_agent · sim_agent · regr_agent |

## 3 五层验证架构 — AIOS 驱动的迭代收敛流水线

L1 意图声明 → L2 可执行契约 → L3 验证架构 → L4 质量内建 → L5 工程效能

| 层 | 名称 | 内容 |
|----|------|------|
| L1 | DITL 驱动 | 业务流程梳理→事件流拆解·验证策略四象限 · #1-21 Vplan · DoD 定义 |
| L2 | C/DSL 驱动 | plan.yaml · C/DSL定义Case→配置解耦·参考模型比对 · #A-C 免重编译生成 |
| L3 | 7层分层+三化 | 场景→功能→驱动→传输→事务→数据链路→物理 · #22-28 并行调度 7 Agent |
| L4 | TDD+重构 | 集成层·单元层·属性层 · 瑞士奶酪式协同 · 逃逸概率→0 |
| L5 | 迭代收敛 | DITL→Vplan→Case→回归→覆盖率→持续改进 · #29-32 4里程碑门控 |

### L1+L2：意图→契约
- #1-9 analysis: 特性隔离 (Spec/RTL/接口/数据/权限)
- #10-13 design: 混合场景 · 合法异常 · 非法场景
- #14-16 review: 正确性 · 精确性 · 完整性（人）
- #17-21 design: DoD · 任务清单 · 工时 · 排序
- #A-C Agent→C/DSL→配置解耦→黄金模型比对

### L3：7 层 + 三化
- #22-23 formal_agent: 连接性 · 属性
- #24-27 sim_agent: 定向 · 随机 · 场景 · 性能
- #28 regr_agent: 回归验证
- 并行化: 多项目/多场景/智能编排
- 可复用: 水平垂直/跨周期/模块化
- 自动化: 消除人工Check/TDD自动回归

### L4+L5：质量闭环
- TDD 三层: 集成(小时) · 单元(分钟) · 属性(秒)
- 瑞士奶酪: 定向+随机+形式化+协议+场景+性能
- #29 cov_agent: 功能/代码/断言覆盖报告
- #30 签核审查（人类决策）
- #31-32 learn_agent: 经验沉淀+跨project继承
- 效能指标: 交付 · 质量 · 成本 三维度

## 4 支撑层 · 持久化 · DUT 交付

### 支撑层 — 组件化一切
代理/序列/断言/VIP 可复用 · 设计模式/切分模式 · 用例/环境/构建/验证管理 · 演进式架构 · 自动化一切

### 持久化存储 — AIOS 记忆
plan.yaml · units/ · deliverables/ · tags/ · history/ · knowledge/ · milestones/

"私人 Agent 天花板 = 键盘前那个人" · "公开 Agent 价值 = 组织从经验中学习"

### DUT 交付侧
向: 设计/软件/硬件/客户团队 · 交付: 特性清单/接口定义/寄存器描述/时序约束 · 短迭代: 每 Sprint 交付可验证特性 · 反馈: 覆盖率空洞→回归失败→签核问题 → 驱动 DUT 变更

## 5 32 任务单元 · 调度器

| 阶段 | # | Agent 类型 | 职责 | 交付物/门禁 |
|------|---|------------|------|-------------|
| analysis + design | 1-9 | analysis | 特性隔离: 读Spec/RTL，隔离场景/接口/数据流/寄存器权限/控制特性 | DUT 特性矩阵 |
| | 10-13 | design | 特性协同: 混合场景规划 · 交易流模式 · 合法异常 · 非法场景 | 场景覆盖矩阵 |
| | 14-16 | review | 弱点检查: 正确性 · 精确性 · 完整性（人类 review） | 缺陷清单 |
| | 17-21 | design | DoD 定义 · 任务清单 · 工时估算 · 深度优先/广度优先排序 | Vplan · DoD |
| | A-C | design | C/DSL Case 生成 · 配置解耦 · 参考模型黄金比对 | Case 集 · 比对报告 |
| execute | 22-23 | formal_agent | 形式化验证: 连接性检查 · 属性验证 (SVA) | 形式化报告 |
| | 24-27 | sim_agent | 仿真验证: 定向 · 约束随机 · 场景 · 性能 (并行调度) | 仿真日志+波形 |
| | 28 | regr_agent | 回归验证: 全量回归 · 失败分析 | 回归通过率 |
| review | 29 | cov_agent | 覆盖率采样: 功能/代码/断言覆盖收敛报告 | 覆盖率报告 |
| | 30 | human | 签核审查: 关键节点人签字放行 | 签核记录 |
| learn | 31-32 | learn_agent | 经验沉淀 (写回 knowledge/) · 跨 project 继承 (加载历史经验推荐策略) | 知识库更新 |

### 调度循环 (AIOS 内核)
1. 读 DUT 标签 → tags/dut-feature-aes.yaml
2. 读验证策略 → plan.yaml
3. 扫描 status=pending 且 tags.dut_feature=aes 的单元
4. 按 DUT 特征组织任务流 (n1-9 并行隔离 → #10-13 混合场景 → …)

### 核心原则
- 模型越强 → 构建成本越低 → 边做边想 > 先想清楚再动手
- 流程是信任不够的补偿机制 → 你得亲手砍掉旧流程
- 组织能从经验中学习 > 员工个人更铁
- 品味（什么 DUT 值得验证、做到什么程度该收手）是模型无法替代的人类价值

R2芯片智能体
