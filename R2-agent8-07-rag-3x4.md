---
source: R2-agent8-07-rag-3x4.png
extractor: vision
---

# R2- RAG Agent · 检索增强生成

07/09

## 主流程

| # | 步骤 | 说明 |
|---|------|------|
| 01 | User Query | 用户提出问题 |
| 02 | Intent | 识别用户意图 |
| 03 | Query Rewrite | 改写与优化查询 |
| 04 | Embedding | 向量化表示 ↔ Vector KB 向量知识库 |
| 05 | Hybrid Search | 混合检索（关键词+向量） |
| 06 | Rerank | 重排序 |
| 07 | Context Integration | 拼接下文 |
| 08 | LLM Generation | 大模型生成 |
| 09 | Final Answer | 输出最终答案 |

## 先查资料 再回答

### 流程速览
查询 → 向量化 → 搜库 → 排序 → 拼上下文 → LLM生成

### 优点
- 减少幻觉
- 可溯源
- 知识可更新

### 缺点
- 搜不好就答不好
- 要维护知识库

R2 芯片智能体 · 07/09
