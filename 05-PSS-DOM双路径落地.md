---
source: 05-PSS-DOM双路径落地.png
extractor: vision
---

# PSS DOM 同一份问卷，两个答案出口

R2-VPlan 五层方法论 · 双路径落地

## 路径 A — PSS

VPlan → action / constraint / activity → Solve / Generate → UVM / C / Emu

验证侧的 Golden Model。action 定义行为意图，constraint 划定合法场景，工具自动探索并生成多平台代码。

## 路径 B — DOM

VPlan → JSON 配置 → Parser 校验 → uvm_config_db → 定向测试

验证侧的 IP-XACT。JSON 定义参数空间，Parser 注入四维平台配置，改配置不改代码。

## PSS 核心语法

| 构造 | 作用 | 含义 |
|------|------|------|
| component | 模块命名空间 | DUT 的验证镜像，封装 action / pool / covergroup |
| action | 行为意图 | Feature 行 → 可执行行为单元 |
| buffer / stream | 数据流对象 | buffer = 有状态缓存，stream = 流式一次消费 |
| resource + lock | 硬件资源争用 | pool [N] 声明资源池，lock 独占，自动防冲突 |
| constraint | 合法场景边界 | 接口契约的数学表达 — 什么能过界，什么被挡住 |
| exec body | 平台实现映射 | 同一份 action → C / SV / Emu 三套实现 |
| activity | 场景编排 | parallel = 混合，schedule = 压力，sequence = 独立 / 异常 |
| covergroup | 覆盖率定义 | 与 exec body 同写一个 action，杜绝 coverage–checker 分家 |

## 四个平台分流 · 同一份固件

| 平台 | 速度 |
|------|------|
| QEMU | 10x–100x |
| RTL 仿真 | 1x |
| Emu / FPGA | 100x–1Mx |
| 真实硅片 | 真实 |

## 路径选型 · 按 IP 类型

| IP 类型 | 推荐 |
|---------|------|
| CPU / XPU | PSS / DOM |
| 算法类 | DOM / PSS |
| 接口与互联类 | PSS |
| 控制系统 | DOM / PSS |
| 全芯片类 | DOM |

■ R2芯片智能体
