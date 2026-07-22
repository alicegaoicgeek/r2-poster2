---
source: r2-api-boundary-ai-eda-workflow.png
extractor: vision
---

# R2-API 边界：AI 工作流与 EDA 工作流如何耦合

- **API 之上 = 智能组件**  
  高频、概率、持续学习 → AI 工作流
- **API 之下 = 已验证的自动化组件和硬件实体**  
  低频、确定、不可变 → EDA 工作流
- **API 本身 = Harness 定义的跨层协议**  
  SSoT JSON、Oracle 接口、签核契约

## API 之上：高频 · 概率 · 持续学习

- **AI 工作流**：Agent 生成 | Skill 探索
- **Loop 运行时**：/goal 收敛 | Memory 沉淀
- **Dynamic Workflow**：多智能体编排 | Maker / Checker

## API 边界：Harness 契约

| SSoT JSON | Oracle 接口：FEC / DRC / 覆盖率 / coverage closure | 签核契约：checklist / IPQA / feature deliverable | deps.json 依赖图 |

**核心判断：**  
API 之上 AI 快速生成。  
API 之下 EDA 慢速签核。  
API 定义两者如何耦合。

## API 之下：低频 · 确定 · 最小必要实体

- **EDA 工作流**：综合 / P&R / DRC | UVM 仿真
- **签核 IP / CBB**：形式等价 / FEC | 流片历史信任
- **CI/CD 回归农场**：夜间全芯片回归 | TDD 可执行 Spec

**反馈：** Oracle 结果从 EDA 层回流到 AI 层

---

**R2-AIOS = Harness + Oracle + Memory + Loop**

R2芯片智能体
