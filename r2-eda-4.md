---
source: r2-eda-4.png
extractor: vision
extracted_at: 2026-07-21 16:30
---

# R2-EDA

## 慢和脏，才是智能体的护城河。

### 01 内层是快和干净。

> Coding agents write code, test their work, and iterate until the code is bug-free and meets specification requirements.

这一层已经很成熟。15 个工具，AI 用它们比人快 1000 倍。人脑像 CPU，AI 像 GPU。  
但「快和干净」**不是护城河**——供应商提供一半能力，工具层可以采购；一个 agent 跑得快，换一个也能一样快。

### 02 护城河在慢和脏。

> Developers update specification descriptions after seeing the results.  
> Humans have a significant context advantage over current AI systems.  
> As long as humans know things AI doesn't, humans need to inject that knowledge into the system.

**慢**：不是代码跑得慢，而是**方向校准慢**——看到成品、发现不对、改 Spec、重做、把新理解注回系统。  
**脏**：不是代码乱，而是**经验沉淀过程脏**——发现 Agent 总在同一处犯错，就补一套 Evals；每个坑加一条规则，每次失败留一条决策路径，错误一点点攒起来。

外层：放给 alpha 测试，或上线做 A/B。闭环：真实反馈 → 校正判断 → 更新 Spec → 注回系统。  
这能力不能全靠采购，至少一半靠自己。

### 03 让 AI 执行，让机器裁判，让人校准。

AI 管「快」层（执行）；机器跑从过错里蒸馏出的判定标准；人把每次错误变成 agent 的下一个起点。  
这才是智能体的护城河。

R2芯片智能体
