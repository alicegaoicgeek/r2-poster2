---
source: r2-5rings-p4.png
extractor: vision
---

# 04 持续验证 VeriSmart-AIOS 流水线

R2-5环 · 4/5

搞清楚"怎么证明没错"——以 DUT 为中心，Harness 内 Agent 自主跑到机械 Oracle 全绿，人只在最终签核点裁决。每个阶段五要素验收：

① Case 完成状态  
② 代码覆盖率（可选参考）  
③ 功能覆盖率（必须达标，核心指标）  
④ 事件流覆盖率（DITL 关键路径）  
⑤ 断言覆盖率

全部达标才能阶段关闭，不要让代码覆盖率绑架签核决策

## 关键动作

- 写使命声明锁范围——验什么、不验什么、质量指标与排除项
- 六维隔离 → Feature 矩阵——按 DUT 功能切，不按 TB 组件切
- 写 DITL → 10–15 条 mini-DITL——每条可独立观测验证
- 四类场景分类——独立 / 混合 / 合法异常 / 非法
- C·P·C 三把刀——Correctness / Precision / Completeness 弱点分析
- Coverage–Checker 铁律绑定 + 里程碑量化——每条 covergroup 必有 checker
- 交付物 DoD + CI 回归——VPlan 转 C/DSL 可执行 Case，回归结果回链计划
- Oracle 全绿 → 五要素关闭 → 人签核放行

4/5  
■ R2芯片智能体
