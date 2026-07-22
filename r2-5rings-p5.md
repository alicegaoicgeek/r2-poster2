---
source: r2-5rings-p5.png
extractor: vision
---

# 05 持续进化 Loop Engineering + 四指令飞轮

R2-5环 · 5/5

搞清楚"怎么越跑越聪明"——四层嵌套反馈环：

- **秒级属性层**（Formal/SVA）
- **分钟级单元层**（Golden Model 逐拍比对，H 从三天压到三分钟）
- **小时级集成层**（RTL 仿真 / 端到端拼合）
- **天/周级发布火车**（R1→R2→R3 纵向交付）

r2-mdistill→r2-mretention→r2-mverify→r2-mevolve 四指令飞轮把每次循环的经验蒸馏为系统记忆，让下一次比这一次更好

## 关键动作

- 每轮执行产出 trace → r2-mdistill 蒸馏失败模式为 Skill
- r2-mretention 写入结构化记忆（GOAL.md/PROGRESS.md）
- r2-mverify 费曼检验 3–10 样本验证
- r2-mevolve 对比新旧版本输出 → Harness 退化检测自动触发回滚
- 人签核关键决策

5/5 · R2芯片智能体
