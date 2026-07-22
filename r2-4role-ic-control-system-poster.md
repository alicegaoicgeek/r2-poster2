---
source: r2-4role-ic-control-system-poster.png
extractor: vision
---

# R2-4role：IC 研发负反馈控制系统

把“能写 RTL 的 AI”变成“敢进入流片流程的系统”。

## 四角色定义

**Peter = 产品架构师 | 定 r：系统目标函数**
场景 | 代际差 | 系统指标取舍 | 优先级 | 验收信号

**Andy = 设计架构师 | 产 y：架构方案**
三刀法 | 架构探索九步 | 原型反馈 | 结构冻结 | 进入实现

**Vicky = 验证架构师 | 测 e：机械误差**
VPlan | C 比对 | Formal + Sim | Coverage | 人类签核

**Fred = 流程架构师 | 测参：收敛路径**
Dynamic Workflow | Worktrees | Skills | Memory | Sub-agents

## 核心回路

Peter 定 r → Andy 产 y → Vicky 测 e → Fred 调参 → 回到 Andy

- Peter 定 r
- Andy 产 y
- Vicky 测 e
- Fred 调参

## 解决的 5 个断裂

| 断裂 | 解法 |
|---|---|
| 目标漂移 | Peter 把 prompt 改写成可签核目标函数 |
| 设计发散 | Andy 用三刀法和架构探索九步收敛结构 |
| 自证偏差 | Vicky 用机械 Oracle，Maker ≠ Checker |
| 上下文丢失 | Fred 把对话沉降成 Workflow + Memory |
| 经验蒸发 | 全绿 loop 才能沉淀为 Skill |

## 三条不可合并原则

- Peter ≠ Andy：目标裁决不能被执行便利性绑架
- Andy ≠ Vicky：设计者不能验证自己的幻觉
- Vicky ≠ Fred：裁判不能被流程吞掉

## 铁律

控制器不兼任传感器
Maker-Checker 合并 = 回路断裂

## 四件套底座

Harness：编排器 + 状态记录 × Oracle：机械判定器 × Memory：跨轮状态与经验 × Loop：持续收敛内核

Harness × Oracle × Memory × Loop
任一项趋零，系统输出趋零。

## 典型 4role 工作流

市场信号 → Peter 定目标函数 → Andy 生成架构候选 → Vicky 机械验证并输出误差 → Fred 重排下一轮实验 → 人类签核 → Skill / Memory 沉淀

## 关键数字

4 Roles | 5 Breakpoints | 3 Separation Rules | 4 Foundations | 1 Closed Loop

## 一句话

一个人 + AI 只能产生设计输出；四角色闭环，才产生可签核的芯片研发系统。

R2 芯片智能体
