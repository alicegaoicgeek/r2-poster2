---
source: r2-course-p2-15.png
extractor: vision
---

# r2-c2rtl：错题驱动迭代，编译可信赖的 Verilog

R2 · P2 · R2-Arch · 15 / 25

超500行不拆分直接生成，改几十轮难收敛

## 01 拆到单函数
AST分解按拓扑序，从叶子逐个生成

## 02 错题驱动修复
输入期望实际位置全给LLM，精准纠错

## 03 验证绝对兜底
小模块穷举，大模块形式化等价证明

「不要证明翻译过程是对的。证明翻译结果是对的。

R2-AIOS · 25项 · 1314520 → R2-AIOS → R2-Arch → Verismart → ProductSmart → 智能产线

R2 芯片智能体
