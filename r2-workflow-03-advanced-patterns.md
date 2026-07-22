---
source: r2-workflow-03-advanced-patterns.png
extractor: vision
---

# R2-编排代码化之后，才可能做的事

## 六种高阶应用模式

### ① 百级并行 + 双审
数百 agent 同时开工，每单元配 2 reviewer  
机制：pipeline 无屏障扇出  
R | R · R | R · R | R · R | R

### ② 对抗验证
3 个 agent 独立判真假，≥2/3 否决则剔除  
机制：parallel 投票屏障  
A1 A2 A3 → 2/3 → 通过 / 剔除

### ③ 扇出研究
5 路搜索，15 源抓取，逐条声明投票，未通过剔除  
机制：pipeline 逐源独立  
S1 / S5 / S5 → □□ … →

### ④ 循环至收敛
while 循环，连续 N 轮无新增才停  
机制：while + 计数器收敛，须配 /go  
处理 → 新增？ 是→继续 / 否→计数+1 → ≥N 停止

### ⑤ 过夜清理
无人值守，自动扫描，逐项开 PR  
机制：定时触发 + 循环扫描  
定时触发 → 循环扫描 → 开 PR

### ⑥ 流程固化
经验 → 脚本，存为 /cmd，下次一句话复用整套流程  
机制：存 workflow 脚本文件  
落盘 /cmd/workflow.yml → 一句话复用

## 确定性代码主干
指令 / 目标 → 确定性代码主干 → 结果 / 产出

## Anthropic 六种搭建模式
- Classify and act
- Fan-out and synthesis
- Adversarial verification
- Generate and filter
- Tournament
- Loop until done

## 共同前提
编排权已从模型逐轮决策，让渡给确定性代码。  
没有这个让渡，①②③④⑤⑥都做不到。  
不是技术不够，是结构不允许。

## 边界
- 模棱两可的答案 ✕
- 需要中途拍板的探索 ✕
- 高风险代码改写 ✕
- 费 token，别杀鸡用牛刀 ✕

R2芯片智能体
