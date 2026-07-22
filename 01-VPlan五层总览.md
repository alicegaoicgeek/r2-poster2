---
source: 01-VPlan五层总览.png
extractor: vision
---

# R2-Vplan 五层方法论

R2 - VPlan 五层方法论 - 总览 - 一份问卷·四个出口·五类IP

## 5 R2-Vplan 五层方法论

从文档到基础设施：验证计划的方法论重构

「问卷写错了，答卷不可能对。」VPlan是问卷，覆盖率是答卷。同一份问卷，两个答案出口，四个验证维度，五类IP通用。

### 四个验证维度 · 同一份 VPlan 驱动

| Formal | 仿真 UVM | Emu/FPGA | QEMU |
|---|---|---|---|
| **穷举证明** | **覆盖率驱动** | **硬件加速** | **固件协同** |
| 架构合规性+边界穷举，SVA属性数学证明。CSR/指令编码。盲区：复杂动态行为。 | 什么行为都能验，灵活。盲区：采样≠穷举，100%覆盖≠无遗漏。 | 比仿真快100-1000倍，跑真实负载+OS。盲区：调试弱，覆盖不如仿真全。 | 不需RTL就能跑固件，最早可用。盲区：不碰硬件时序，时序bug完全不可见。 |

### 五层方法论 · 逐层递进 · 每层标注 JK 接口层

| 层级 | 核心动作 | JK 接口 |
|---|---|---|
| **01 认知框架** | 坐标系从TB移到DUT，使命声明锁边界，RTL/QOM/DOM三种投影 | 阀门 边界声明 |
| **02 分析拆解** | 六维隔离→DITL→四类场景→C·P·C三把刀→Feature矩阵 | 管道 Feature隔离 |
| **03 量化绑定** | Coverage-Checker铁律，五种假阳性诊断，MECE，里程碑量化 | 阀门 硬约束执行 |
| **04 执行引擎** | 交付物驱动进度，CI回归，r2-vplan，PSS/DOM双路径分叉 | 翻译 格式转换 |
| **05 判定架构** | Oracle e=r-y机械签核，五层判定器，绿放行红退回，人只做四件事 | 翻译 语义统一 |

### 双路径落地 · 第四层分叉

#### 路径 A：PSS · 验证意图建模

action → constraint → activity  
EDA工具Solve/Generate → UVM/C/Emu  
需license · 并发场景自动探索强

#### 路径 B：DOM · 声明式配置

JSON配置 → Parser校验  
注入uvm_config_db · 开源可用  
纯UVM 环境 · 零许可费

### JK 管道 · 阀门 · 翻译 = PSS 构造对应

| | |
|---|---|
| **管道** | 信息在独立通道上走 buffer / stream / input / output |
| **阀门** | 什么能过界，什么被挡住 constraint / lock / abstract action |
| **翻译** | 同一份意图，多套物理实现 exec body / extend action |

适用五类IP：CPU/XPU · 算法类(ISP/Codec/AI/DSP) · 接口与互联类(PCIe/USB/DDR/AMBA/NoC/Switch) · 控制系统(Simulink) · 全芯片类(子系统集成/Boot/Software) — 五层不变，金模和路径倾向随IP变化

■ R2芯片智能体
