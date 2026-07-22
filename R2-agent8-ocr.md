# R2-agent8 九图 OCR 提取

> 路径：`/Users/gaoyuan/Desktop/r2-swiss/`
> 时间：2026-07-15T04:08:39Z

## 00. R2-agent8-00-overview-3x4.png

R2- Agent八大主流架构
从ReAct到自主智能体•知识图谱
00/09
ReAct
想
做
看
循环
◎适用：通用任务/工具调用
01
推理与行动协同
一
2 优点：简单直观，上手快
想一做一看反馈循环
Thought
推理
Action
行动
Observation
反馈后
缺点：长链推理易偏航
继续
a 特点：逐步决策，实时反馈
Plan-and-Execute
规划（Plan）
执行（Execute）
◎ 适用：复杂任务/流程型任务
02
规划与执行分离
用户目标
分解步骤/依赖/顺序
逐步执行
2品优点：结构滴哳，可控性强
先规划后执行可回滚
1 缺点：规划质量决定上限
回滚/重试/调整
oD 特点：先规划后执行，可回滚
Multi-Agent
X
口
用户/任务
品
专科Agent
◎ 适用：复杂领域/多能力协同
03
多智能体协作
共享知识库
协调器+专科Agent+
分配/路由/票合
协调强
•••
知识库
共享
Da2 优点：并行协作，能力互补
缺点：通信成本/一致性
a 特点：分工协作，共享知识
Reflective Agent
生成
反思
->
改进
循环
◎适用：高质量回答/写作/推理
04
反思型
e品 优点：质量可提升，有自纠错
生成一反思一改
评估/发现问题
修改/优化
最多3-5轮
最多3-5轮
或收致
缺点：消耗Token/时间较多
o0 特点：自我反思，选代优化
Tool-Augmented
检潠/遙择
工具列衷
%
◎ 适用：需要外部工具的场景
05
工具增强
用户/任务
LLM 决策
调用工具
执行
返回结果
Do 优点：灵活扩展，即插即用
LLM维护工具列表
造择工具
整合输出
缺点：工具质量/安全风险
自行调用
a 特点：LLM维护并调用工具
Memory-Augmented
000
当朗会话上下文
会话记忆
近朋交互倍息
短期记忆
长期记忆
吕
000
◎ 适用：多轮对话/个性化场景
06
记忆增强
接久化知识
向毋抄紫/相似
向量记忆
oD 优点：上下文连贯，个性化强
会话/短期/长期/
缺点：存储/检成本较高
向量四级
o 特点：四级记忆，分层管理
RAG Agent
用户问题
向且捡素/关盟词
检素 （Retrieve）
知识库
0
适用：问答/知识密集型任务
07
检索增强生成
文裕/网员/蛤书化
生成 （Generate）
基于证渴生成
回答 （Answer）
可潲源號出
Bc 优点：准确性酒，可溯源
查资料再回答
缺点：莜赖知识库质量
可溯源
◎
引用来源/证据
ol特点：检索增强，证据驱动
Autonomous Loop
一）
一
◎ 适用：长期任务/自主运行场景
08
自主循环
设定目标
目标设定
分解计划
任务分解
执行行动
调用/执行
评估反燠
译佔/打分
追踪学习
记票/学习
Dg 优点：端到端闭环，自我驱动
评估追踪闭环
目标分解执行
缺点：复杂度高，调试困难
o 特点：自主循环，持续优化
ER2
R2芯片智能体
结构选型•优缺点对照•工程落地
00/09

---

## 01. R2-agent8-01-react-3x4.png

R2- ReAct•推理与行动协同
01/09
User Input
Context Memory
用户输入
+
上下文记忆
非
Reasoning
推理（想）
Decide
决策（定方向）
Action
行动规划（想做什么）
Execute
执行（去做）
Observation
观察（看结果）
Env & Tools
环境与工具
Feedback
反馈（总结给推理）
Q
网页
搜索
代码
数据库
Done
完成（结束条件满足）
Final Output
最终输出（给用户）
最基础，所有架构的起点
流程总结
想 做 看反馈 再想 再做
循环到完事
优点
简单，啥都能套
缺点
来回调 LLM，费钱又慢
R2
R2芯片智能体
01/09

---

## 02. R2-agent8-02-plan-execute-3x4.png

R2- Plan-and-Execute•规划与执行分离
02/09
User Goal
用户目标
规划阶段 Planning
先想清楚
Task Planner
任务规划
再动手
Sub-task Decomposition
品
子任务分解
模式概述
Fail
Dependency Analysis
将复杂任务分为“规划”
失败
依赖关系分析
和“执行”两个阶段。
先制定详细计划，再按
重规划
计划逐步执行；若执行
Task List
失败，则退回重新规划。
任务清单
2
执行阶段 Execution
优点
• 复杂任务表现更好
Executor
•步骤清晰，结果可追踪
执行器
•易于回滚和重试
• 适合高风险任务场景
Tool Calls
工具调用
缺点
Verification
• 规划阶段不一定准确
结果验证
• 对简单任务过于重型
•规划耗时，成本较高
Success
•依赖规划质量
成功
一句话总结
Aggregated Result
两阶段先规划再执行，
聚合结果/ 最终输出
搞硒了退回重新来过。
R2
R2芯片智能体
让复杂任务，更可靠地完成

---

## 03. R2-agent8-03-multi-agent-3x4.png

03/09
R2-Multi-Agent •多智能体协作
协调器分配
专科各干
共享知识库
汇总
User Request
用户请求/目标/背景信息
Agent 01
Agent02
Search 智能体
信息检索专家
Writing 智能体
内容创作专家
•关键词理解
• 结构化写作
• 多源检索
• 筛选排序
Orchestrator
• 逻辑组织
•输出结构化信息
协调器
• 语言润色
• 理解目标
•输出成稿内容
目
•分解任务
•汇总结果
•分配给专科智能体
T
<>
Agent 03
Agent 04
Coding 智能体
QA 智能体
代码实现专家
质量保障专家
• 需求理解
• 代码生成
Shared Knowledge
• 结果校验
•运行调试
共享知识库
• 逻辑检查
•输出可执行代码
•错误发现
•输出修正建议
>..
文档资料
皋例经验
代码仓库
规范指南
引
Aggregated Final Response
聚合汇总后的最终响应/解决方案/ 答案
2 一个搞不定就上多个
优点 Pros
缺点 Cons
效率高
协调成本高
专业分工像真人团队
打起来麻烦
R2
R2芯片智能体
03/09

---

## 04. R2-agent8-04-reflective-3x4.png

04/09
R2-Reflective Agent
R2-SWISS
VISUAL
•反思型智能体
FLOWCHART
01
User Request
用户请求
02
Self Init
自我初始化
呜
优点
03
Self Reflection
输出质量高
自我反思
自我进化
04
Error Analysis
锴误分析
05
未通过卡阀
Refinement
最多3-5轮
优化改进
缺点
06
Check
质量检查
烧钱之王
未通过
每轮调 LLM
Fail
通过
Pass
07
最终输出
Final Output
04/09
R2
R2 芯片智能体
R2-SWISS
更聪明的智能体•更高效的芯片•更美好的未来
VISUAL
FLOWCHART

---

## 05. R2-agent8-05-tool-3x4.png

05/09
R2- Tool-Augmented • 工具增强型
LLM Core
「
〇
L
Planning &
L
Reasoning
①
2
3
4
5
6
搜索
知识库
浏览器
代码
分析
自定义
Search
KB
Browser
Code
Analysis
Custom
给大脑配上手脚
LLM维护工具列表自行决定调用整合回复
Pros：
Cons：
从嘴炮变实干
工具烂
现代Agent标配
啥都白搭
R2
R2芯片智能体
Swiss Grid
05/09
System

---

## 06. R2-agent8-06-memory-3x4.png

06/09
R2-
Memory-Augmented •记忆增强型
User
Interaction
LLM
用户交互
R2
Processor
Response
大模型处理器
输出响应
一级记忆| Sensory Buffer
当前会话
当前会话•感知缓冲区
实时感知与临时信息
快速读写
二级记忆| Short-term Memory
短期记忆
短期记忆• 近期上下文
保存近期对话与状态
支持连续交互
三级记忆| Long-term Memory
长期记忆
长期记忆• 稳定知识与经验
沉淀重要事实与经验
长期可追溯
四级记忆 | External Vector DB
向量库
外部向量数据库•知识库
海量知识语义检索
跨会话复用
@
让Agent真正有记忆
四级记忆当前会话一短期一长期一向量库自动搬运清理
优点
缺点
• 不会聊两句就失忆
•管理复杂
•适合长期交互
• 存储蹭蹭涨
R2
R2芯片智能体
更强算力•更长记忆•更像人类
06/09

---

## 07. R2-agent8-07-rag-3x4.png

07/09
R2- RAG Agent•检索增强生成
01
User Query
用户提出问题
先查资料
再回答
02
Intent
识别用户意图
流程速览
03
Query Rewrite
改写与优化查询
查询
向量化
搜库
04
Embedding
VectorKB
向量化表示
向量知识库
排序
拼上下文
LLM生成
05
Hybrid Search
混合检索（关键词＋向量）
优点
• 减少幻觉
06
Rerank
重排序
◎ 可溯源
< 知识可更新
07
Context Integration
拼接上下文
缺点
08
LLM Generation
搜不好就答不好
大模型生成
要维护知识库
09
Final Answer
输出最终答案
R2 芯片智能体
07/09

---

## 08. R2-agent8-08-autonomous-3x4.png

R2-Autonomous Loop•自主智能体循环
08/09
R2E
长期目标
Long-term Goal
Execute
执行
R2芯片智能体
08/09
任务分解
Task Decomposition
自主智能体循环
评估
Evaluate
Autonomous Loop
优先级队列
Priority Queue
记忆更新
Memory Update
Track Progress
跟踪进度
经验记忆
工具系统
感知系统
Experience Memory
Tool System
Sensing
定好目标自己转
优点
缺点
真正自动驾驶
可能跑偏
适合批量
需人盯着

---

