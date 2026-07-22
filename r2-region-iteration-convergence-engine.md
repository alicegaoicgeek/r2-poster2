---
source: r2-region-iteration-convergence-engine.png
extractor: vision
---

# R2-区内迭代收敛循环：核心执行引擎

**入口**：region_X, clk_Y, 含 N 条违例路径

**输入**：区域路径列表 + 人类策略约束 + 当前迭代轮次，初始 = 1

## ① 诊断 | 5–15 秒

- 读取区域内所有路径的完整时序信息，输出结构化诊断数据。
- 操作：report_timing -path_type full_clock -to [region_endpoints]
- get_attribute [cells] ref_name / area / drive_strength
- get_attribute [nets] fanout / net_length / route_layer
- 物理坐标提取：from DEF 映射
- 输出：每条路径包含：延迟分解、物理位置、扇出、transition、逻辑深度
- 所有数据来自结构化 TCL 通道，非原始文本解析。
- 输出：diagnosis.json

## ② 模式匹配 | 2–5 秒

规则引擎优先匹配已知模式，LLM 处理长尾假设。

- HIGH_FANOUT → BUFFER_INSERT
- LONG_LOGIC_CHAIN → 评估 PIPELINE 或 局部 RETIME ⚠
- WEAK_DRIVER → SIZE_UP
- CLOCK_SKEW → 时钟树优化 ⚠
- CDC_MISSING_CONSTRAINT → 约束调整 ⚠
- 规则未匹配 → LLM 只生成假设，不生成命令
- 输出：matched_patterns.json

## ③ 影子执行 | 5–20 秒 | 关键创新

候选 fix 先在 session 内试跑，读取实际 timing diff，替代解析模型预估。

1. session 状态：保存轻量状态标记，准备试跑环境
2. 试跑执行：执行候选命令 · update_timing -incremental
3. 实测 diff 分析：report_timing 读实际 WNS / TNS 变化 · 检查邻接路径是否恶化 · 检查 12 维异常扫描项
4. 回滚恢复：回滚到标记状态 · session 恢复

输出：shadow_results.json

标注「实测改善 +45ps」，而非「预估改善 +50ps ±30%」。

## ④ 策略选择 | 1–3 秒

基于影子执行结果，选择最优 fix 组合。

- 优先：实测改善最大且无副作用
- 次选：改善大但副作用在预算内
- 排除：实测恶化 / 新违例 / 邻接恶化 / CDC 误触
- 冲突：两条 fix 影响同一 net，选改善大的，或合并为复合 fix
- 高风险 fix：Pipeline / 时钟 / RTL，不自动选择，标记待人工审批
- 输出：selected_fixes.json

## ⑤ 执行 fix | 2–10 秒

在 session 内 commit 选中的 fix，生成可回滚变更记录。

- 创建轻量 checkpoint
- 按依赖顺序执行 fix 命令
- 每条记录：fix_id / path_id / action / location / before 值
- 输出：committed_changes.json

## ⑥ 增量重测 | 5–15 秒

验证 fix 效果，扫描异常，决定收敛或继续迭代。

- update_timing -incremental
- 区域 WNS / TNS 与 before 对比
- 12 维异常扫描器全量运行
- 检查 SS / FF / TT 关键 corner
- 检查功耗 / 面积累计是否逼近预算上限
- 输出：verification.json

### 收敛判断

是：WNS ≥ 0 且 TNS 无恶化？或 迭代 < 3 轮 且 slack 在改善轨道上？

- 是 → 区域收敛 → 标记完成 → 进入跨区检查
- 否（迭代 < 3 轮）→ 迭代轮次 +1，携带本轮结果，回到步骤①诊断，利用热状态更快
- 否（迭代轮次 ≥ 3）→ 升级人工 ⚠，提交完整 trace + 已尝试记录

## 12 维异常扫描

1. WNS 任何恶化 → 立即回滚最后一步
2. TNS >10% 恶化 → 暂停区域，升级人工
3. max_transition 新违例 → 标记，下轮优先修复
4. max_capacitance 新违例 → 标记
5. max_fanout 新违例 → 标记
6. noise glitch 新增 → 立即回滚，数据破坏
7. DRC 新增 → 回滚
8. 动态功耗 > 预算 → 暂停，升级人工
9. 总面积 > 预算 → 暂停，升级人工
10. CDC 路径任何修改 → 立即阻断 + 升级人工 ⚠
11. 非主 corner WNS 恶化 → 标记，升级人工
12. 增量 STA >20 轮 → 强制 full update 校验

## 关键特性

1. 影子执行：候选 fix 先试跑再选，避免预估不准导致恶性震荡
2. 12 维扫描：每次 update 后全量检查，异常立即回滚或升级
3. 规则选择：基于实测 diff 排序，非 LLM 黑箱决策
4. 轻量级 checkpoint：每轮变更可独立回滚，不依赖完整 session 重启

R2芯片智能体
