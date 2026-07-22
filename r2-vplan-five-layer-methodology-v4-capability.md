---
source: r2-vplan-five-layer-methodology-v4-capability.png
extractor: vision
---

# R2-VPlan: 从文档到基础设施

验证计划失效的根本原因：围绕 TB 的"怎么验"，而不是围绕 DUT 的"验什么"。
VPlan 是问卷，覆盖率是答卷。问卷写错了，答案不可能对。

## ① 第一层：认知框架
**输入：** 对五重困境根因的认知
**核心方法：** DUT 中心四维剖析
- 按 DUT 功能分 Feature，不按 TB 组件分
- 做高层决策，不写实现细节
- 描述场景，不列测试名单
- 定义 bin 类型与范围，不指定具体值

**使命声明四要素**
验证目标 / 目标应用场景 / 质量指标 / 明确排除项

**Feature 内部审查**
对象 / 行为 / 条件 / 边界 / 异常 / 约束 / 结果

**逐级拆解**
功能路径 / 配置空间 / 接口协议 / 数据通路 / 状态机 / 异常边界 / 并发交互 / 性能压力

**输出：** DUT 中心视角、使命声明的范围边界、三种投影的多维视角

## ② 第二层：分析拆解
**输入：** DUT 中心视角 + 使命声明 + 三种投影
**核心方法：** 四步分析法
1. 选一个锚因切入：规格书节 / RTL Block / Feature / 用例 / 风险 / 经验场景
2. 写 DITL：芯片的一天，压缩成 10–15 条 mini-DITL
3. 分四类场景：独立 / 混合 / 合法异常 / 非法场景
4. 三把刀：Correctness / Precision / Completeness

**三种投影：**
- RTL 投影：时序 / 流水线 / 握手
- QOM 投影：寄存器段 / 操作模型
- DOM 投影：JSON 配置 → DUT 输出

**输出：** 结构化 Feature 矩阵

## ③ 第三层：量化绑定
**输入：** Feature 矩阵
**核心方法：** R2 覆盖率铁律
每一条 covergroup，必须有对应 checker。
Coverage = 模型定义 + Checker + 审查流程
三合一，覆盖率数字就是底线。

**Checker 类型**
协议合规 / 数据正确性 / 端到端比对 / 寄存器行为 / 中断处理 / 时序保护 / 性能监控 / 错误检测

**五种假设**
贪婪采样 / 条件组合 / 寄存器遍历完备 / 结果覆盖率 / 能跑上下文

**MECE 审查**
一个事件不能处理两个 bin；所有合法事件必须处理某个 bin。

covergroup ↔ checker

**输出：** 不可虚假的 Coverage-Checker 绑定体系

## ④ 第四层：执行引擎
**输入：** Coverage-Checker 绑定体系 + 里程碑量化目标
**核心方法：** 交付物三要素
Definition of Done / Work List / Effort Estimate

**线性速度**
均匀交付物 / 独立块 / 均匀间隔
深度优先：锁住一个 Feature 再进下一个
广度优先：所有 Feature 先过基础场景，再进入混合场景

**阶段关闭五要素**
Case 状态 / 代码覆盖率 / 功能覆盖率 / 事件流覆盖率 / 断言覆盖率

**CI 驱动回归**
Test Pass Rate / Cumulative Coverage / Bug Trend
新 failed case 24h 内处理
Coverage 曲线必须单调上升

**vplangen**
六种输出：HJSON / Markdown / CSV / JSON / XML / HTML
92 个 Pattern：bus / csr / functional / interrupt / peripheral / security / stress
计划就是配置再转成文档，VPlan 是活的，不是归档文档。

**输出：** CI 驱动的自动化回归流水线

## ⑤ 第五层：判定架构
**输入：** CI 流水线执行结果
**核心方法：** e = r − y
绿放行，红退回

**五层 Oracle**
- L1 意图声明：使命声明、Feature 矩阵、优先级
- L2 可执行契约：C Case / 参考模型输出比对
- L3 验证架构：Formal、仿真、回归、覆盖率四个数字全集
- L4 质量门控：TDD 三层、方法准度八、逃逸率逼近于零
- L5 工程效能：连续绿灯、VPlan 通过率、效能指标、人员差错变稀

**R2 数据层**
五维数据：design component / Design changes / Design stage / Verification component / Test result
Hash 防审填造作伪真改
向量化 + 聚类：发掘验证组件自然的组合与维度；把基础数据推送到粉板
DV Silicon Bug KPI：用最后 bug 效率的规划决策

**输出：** e = r − y，绿放行，红退回

## AXI 事故错点
覆盖率报告 100%。AXI burst length 1 到 256 全部绿色。
客户测试挂掉：没有 checker 验证 burst length = 256 时数据是不是真的。
我们收了每一辆车，从来没有检查车里装的货。

## 旧世界：HOW 心智 / TB 中心
agent / scoreboard / monitor / coverage model
HOW → WHAT

## 五类结构性失败闭环
1. 计划无人阅读：设计师找不到 Feature，PM 找不到交付状态
2. Coverage 和 Checker 脱节：只规划收集什么，没有强制检查什么
3. S 曲线遗忘灯笼：Agent coding 80% done，没有可独立判定的 DoD
4. 设计变更一进就失效：计划被惯例导致代的 TB，而不是相对稳定的 DUT 功能
5. 代理链路经脆：测试数量/代码覆盖率/组件百分比替代真实验证
闭环结论：计划失信 → 合规衰减 → 覆盖率继续撒谎

## 五层逆转路径
第一层 认知框架 → 第二层 分析拆解 → 第三层 量化绑定 → 第四层 执行引擎 → 第五层 判定架构
每一层依赖上一层的输出。

## 人只做四件事
1. 写使命声明，定范围
2. 四步法拆 Feature
3. 审覆盖率模型，跑五种假阳性诊断
4. 看五要素，判签核

## VPlan = 验证流水线第一行代码
测试生成、回归执行、覆盖率收集、空洞分析、报告生成：全部自动化。
其他全部自动化。

## 方法资产
45 个方法，按五层逻辑归类
- 第一层 7 个方法
- 第二层 10 个方法
- 第三层 12 个方法
- 第四层 11 个方法
- 第五层 11 个方法

## 能力证据
L1 意图门控 → 使命声明 + Feature 矩阵 + 优先级 → 证据在五层 Oracle L1
Feature 矩阵机器化 → spexc / vplangen 结构化输出 → 证据在 HJSON / JSON / CSV
DOM 配置媒介 → JSON 配置映射 DUT 输出 → 证据在 RTL / QOM / DOM 三投影
CI 流水线接入 → 回归结果回链计划对象 → 证据在 Test Pass Rate / Coverage / Bug Trend

### 五层 Oracle
- L1 意图声明：使命声明、Feature 矩阵、优先级
- L2 可执行契约：C Case / 参考模型输出比对
- L3 验证架构：Formal、仿真、回归、覆盖率四个数字全集
- L4 质量门控：TDD 三层、方法准度八、逃逸率逼近于零
- L5 工程效能：连续交付、VPlan 通过率、效能指标、人员差错变稀

**e = r − y**
绿放行，红退回

R2芯片智能体
