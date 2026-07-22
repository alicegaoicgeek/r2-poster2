---
source: r2-5rings-p2.png
extractor: vision
extracted_at: 2026-07-21 16:30
---

# R2-5环 · 2/5

## 02 持续集成 IP集成进SOC的6种方式

搞清楚「怎么拼」——  
用机器可读的接口契约替代文档约定，  
specx 编译 Spec → SSoT JSON 作为唯一真理源，  
六条产线共享同一份 SSoT，  
结构上不可能不一致。

### 关键动作

- **specx 编译 Spec → SSoT JSON**（寄存器、中断、时钟、接口协议、地址映射、CDC、复位、DMA、QoS、安全属性、测试向量），六条产线唯一真理源
- **r2-cbbrtl** 从 SSoT 生成 RTL 骨架与 wrapper，自动参数化配置
- **r2-c2rtl** 从 Python 参考模型自动生成 RTL，逐拍比对闭环收敛
- **r2-topgen** 自动生成顶层集成：总线挂载、地址解码、中断路由、时钟复位连接
- **r2-reggen** 自动生成寄存器 RTL + C 头文件 + UVM RAL + Linux 设备树
- **Stub 先行：** SSoT 产出当天，四线（设计/验证/软件/FPGA）同时拿到可编译占位物，Day 1 并行
- **CI 红绿门禁：** Python Golden vs RTL 逐拍比对，一致放行，不一致退回并定位第一个 mismatch cycle

2/5 · R2芯片智能体
