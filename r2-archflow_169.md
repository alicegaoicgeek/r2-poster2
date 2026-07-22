---
source: r2-archflow_169.png
extractor: vision
---

# R2敏捷架构探索九步收敛流程图

## Design Data Input

- A 系统需求
- B 变化假设（变化频度表）
- C 复用 IP 资产
- D 工具链 / CI 基础设施

## Top-Down 架构决策层 (Architecture Decision)

1. Design Data Input
2. 路径选型 · 8 条 IP 集成路径
3. 边界划分 · 软硬切片 · 风险定级
接口三分 · 管道 / 阀门 / 翻译
9. Frozen + 受控变更 · ICD v1.0

## 中层 ICD 契约层 (Machine-Readable ICD)

4. ICD v0.5 行为契约草案（可执行）↔ 反馈 ↔ 4'. ICD v0.7 收敛迭代（机器读）
8. 四维基准闭环签收（Golden / Protocol / Formal / Perf）→ 签收 → 8'. 自动生成 wrapper / checker / driver

B 变化假设 注入 ICD 层

## Bottom-up 反馈与碰撞层 (Shift-Left Feedback Loop)

5. VP 场景碰撞 · workload + 异常注入
6. HLS / 快速综合估算 · area / timing → 6'. 实现迭代 · 性能 / 面积 · 时序回填 ICD
7. Emulator / FPGA · 系统级 bring-up
Frozen 前 Gate Check · 关键接口必须全绿
8'. 自动生成 wrapper / checker / driver

## Design Data Output

- X Top Level RTL + SW
- Y Frozen ICD v1.0
- Z 验证资产（check + VIP）+ driver

## 图例

- 虚线箭头：控制流 / 决策推进
- 双线：泳道分隔（架构 / 契约 / 反馈）
- 实线箭头：主数据流（ICD 演进）
- 蓝色虚线：反馈流（碰撞暴露需求 → 回填 ICD）
