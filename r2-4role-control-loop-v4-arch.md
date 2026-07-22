---
source: r2-4role-control-loop-v4-arch.png
extractor: vision
---

# R2-4role：回路闭合，才敢流片

一个人 + AI = Andy  
敢流片 = Peter + Andy + Vicky + Fred

不是“AI 能不能写 RTL”，而是“系统有没有负反馈闭环”。

## 1 Peter | 产品架构师
**定 r：系统目标函数**
- 市场信号
- 客户场景
- 代际差
- 系统指标取舍
- 验收信号
- r ≠ prompt

→ **定 r** →

## 2 Andy | 设计架构师
**产 y：架构方案**
- 三刀法
- 架构探索九步
- 原型反馈
- 结构冻结
- 进入实现

→ **产 y** →

## 3 Vicky | 验证架构师
**测 e：机械误差**
- VPlan
- C 比对
- Formal + Sim
- 覆盖率
- 人类最终签核

→ **测 e** →

## 4 Fred | 流程架构师
**调参：闭环控制**
- Dynamic Workflow
- Automations
- Worktrees
- Skills
- Memory

→ **调参** →（回 Peter）

## 铁律
- 控制器不兼任传感器
- Vicky ≠ Andy
- Maker-Checker 合并 = 回路断裂

## 底座
Harness × Oracle × Memory × Loop

## 结论
Peter 定目标，Andy 做设计，Vicky 出误差，Fred 让误差回流。  
回路闭合，才敢流片。

R2芯片智能体
