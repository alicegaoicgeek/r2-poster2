---
source: poster-02.png
extractor: vision
---

# 碰壁收紧——Oracle的机械裁判

R2-机械裁判

Oracle 是机械裁判（非 LLM），以不可协商的硬标准为 Agent Loop 提供停止条件；没有机械 Oracle 的循环是幻觉加速器。

## 关键证据

### 01 Oracle = 机械裁判
Spike diff · arch-test 签名 · Formal 等价 · DRC/Timing  
§02 L103

### 02 /goal 硬标准，不可协商
3轮随机差分0发散 · 全绿+签名一致 · DRC clean+timing WNS≥0 · 签核落盘  
§02 L112–115

### 03 工作流原语
wf_compliance · wf_randdiff · wf_cbbrtl → 机械裁判落地  
§02 L118

## 工作流 × 机械裁判机制

| 工作流原语 | 机械裁判机制 |
|-----------|-------------|
| wf_compliance | 155 tests → 只回 {pass, fail, first_pc} |
| wf_randdiff | while(dry<3) Spike 逐指令 diff 零发散 |
| wf_cbbrtl | proven CBB + AI 残差 → FEC 等价入库 |

R2芯片智能体
