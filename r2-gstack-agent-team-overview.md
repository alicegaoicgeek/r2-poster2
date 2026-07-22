---
source: r2-gstack-agent-team-overview.png
extractor: vision
---

# R2-GStack：把通用 Agent 变成专家团队

Open Source Software Factory  
Transforms AI agents from generalist assistants into a coordinated team of specialists

## 三层架构

| Skills Layer：31+ Markdown persona skills | Browse Infra：Persistent Chromium daemon, ~100–200ms | Brain Layer：gbrain search + memory |

→ coordinated team of specialists

## 解决 5 个瓶颈

1. **Literalism**：Agent 太字面，不会追问前提
2. **Context loss**：跨轮忘记历史决策
3. **Latency**：浏览器工具冷启动太慢
4. **State loss**：cookie 与登录态丢失
5. **Fragile selectors**：CSS / XPath 选择器易碎

## 8 个核心模式

| | 命令 | 角色 |
|---|---|---|
| 1 | /office-hours | YC partner，6 个强制问题 |
| 2 | /plan-ceo-review | CEO / founder，10-star product |
| 3 | /plan-eng-review | Eng manager，锁架构、数据流、边界条件 |
| 4 | /review | Staff engineer，找能过 CI 但线上会炸的 bug |
| 5 | /qa | QA lead，三层测试 |
| 6 | /ship | Release engineer，PR、测试、文档同步 |
| 7 | /browse | QA engineer，persistent Chromium 作为眼睛 |
| 8 | /investigate | Debugger，先定位根因，不先修 |

## 典型工作流

Idea → CEO Review → Eng Review → Implement → Review → QA → Browse → Ship

## 一句话
GStack 的核心不是多几个 slash command，而是把产品、工程、QA、发布、浏览器验证拆成可调用的专家团队。

| 31+ Skills | 8 Core Modes | 3 Layers | ~100ms Latency | 5 Principles | 3 Test Tiers |

R2芯片智能体
