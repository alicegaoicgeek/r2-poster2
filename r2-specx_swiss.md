---
source: r2-specx_swiss.png
extractor: vision
---

# R2-可执行文档 r2-specx —— 机器可消费的 Spec，消灭“四种理解”

**【病根】** 人读 Spec → 四个角色认知偏差 → Bug 从头流出

架构师说 A → 设计师写 B → 验证测 C → 软件跑 D
（同一段话，四种心智模型）

## 【流程图】Spec → 共识 → 同源产物

Spec PDF（一份文档）
→ pdf2md → Markdown
→ specx（LLM=翻译官，非建筑师）
→ 结构化 SSoT（单一信源）regmap.json / feature_points.json（+ 其余 10 类元信息）← 12 类 Spec 元信息
→ ★ 人审 10 分钟（质检员，非生产者）· 未过 Linter 不外露
→ 三种投影 · 零偏差共识
  - RTL 投影（硬件实现）设计师视角
  - QOM 投影（软件早介入）嵌入式视角
  - DOM 投影（验证配置）验证师视角
→ 6 条同源产线扇出：
  - r2-tdd 测试驱动开发
  - r2-cov 覆盖率模型
  - r2-qemu QOM/仿真模型
  - r2-dom 验证环境配置
  - reggen 寄存器生成
  - topgen 顶层生成

## specx 提取的 12 类 Spec 元信息

1. 寄存器描述 — regmap.json：地址/位域/复位值/RW/RO/W1C/别名
2. 功能行为 — feature_points.json：FP ID × spec章节 × 前置条件 × 驱动 × 期望 × 断言
3. 时序要求 — timing_constraints：时钟域/同步级数/建立保持/访问延迟
4. 中断描述 — interrupt_map：中断源/使能/模式/状态/W1C清除/级联
5. FSM状态机 — fsm_spec：状态/转移条件/输出/非法状态/死锁检测
6. 信号映射 — signal_map：寄存器位 ↔ 物理引脚/方向/同步/pull
7. 内存接口 — memory_map：地址空间/单双端口/带宽/基地址/大小
8. 总线协议 — bus_protocol：APB/AHB/AXI/TileLink/自定义+时序波形
9. 功耗特性 — power_domain：时钟门控/电源域/休眠唤醒序列
10. 硬件-软件接口 — hw_sw_api：寄存器编程序列/初始化流程/错误处理
11. IP集成约束 — integration_spec：端口列表/参数化配置/ifdef条件/依赖
12. 性能指标 — perf_spec：吞吐量/延迟/pipeline深度/仲裁策略

## 【本质】

共识 ≠ 开会对齐
共识 = 结构保证
（同源数据 → 不可能不一致）
改 Spec → 自动重生 → 下游同步
人退出“翻译”，只做“审查”

## 【三条铁律】

1. LLM 只 Parse/Draft，禁止直接 Build RTL
2. 改 SSoT 即改一切，禁止旁路修改下游
3. 每个产物必须 spec_reference 追溯到 Spec 原文页码/行号

追溯保证：所有结构化条目与生成产物均携带原文页码 (page_id)，一键回溯到 Spec PDF.

R2 芯片智能体
