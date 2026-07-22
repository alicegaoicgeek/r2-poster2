---
source: r2-claude-code-40-tools-high-density.png
extractor: vision
---

# R2-Claude Code 40 个内置工具 | Agent 五感 / Syscall Map

工具不是插件，不是功能模块，不是"建议 Agent 做什么"；工具是原子、确定、触发即执行的系统调用。少而清楚，感官才不乱。

## 01 文件系统 File I/O
Read / Write / Edit
Glob / Grep / NotebookEdit

**Read**
- 读文件/图片/PDF/ipynb
- 返回带行号内容
- Edit 的燃料
- 读大文件只读片段

**Edit**
- 精确字符串替换
- old_string 必须唯一
- 必须先 Read
- 小改优先

**Write**
- 新建文件
- 整文件覆盖
- 重构整文件
- 覆盖风险高

**Glob**
- glob 找路径
- 修改时间排序
- 替代 find / ls

**Grep**
- ripgrep 封装
- files_with_matches
- content：命中行 + 上下文
- count
- 默认单行
- multiline 需开启
- 替代 grep

**NotebookEdit**
- 改 ipynb 单元格
- diff 整表格重写
- 社区常建议 Jupyter MCP

**文件工具铁律**
Glob→Grep→Read→Edit/Write
禁用 Bash 做 find/grep/cat
小改 Edit；整改 Write

## 02 Shell / 进程 / 监控
Bash / PowerShell / Monitor
PushNotification

**Bash**
- 独立命令
- 用 Edit 路径最严格之一
- 不做文件操作
- 绝对路径优先
- 顺序依赖用 &&
- 可并行多条 Bash
- 默认 2min / 最长 10min
- 输出超长截断

**PowerShell**
- Windows 对应 Bash
- 同样权限控制

**Monitor**
- 后台事件流
- stdout 每行即事件
- 200ms 内批量通知
- 适合日志/CI/服务
- 不是一次性等待
- 必须过滤输出
- 防日志洪泛
- grep --line-buffered

**Bash run_in_background**
- 完建时通知一次
- 适合构建跑通完成

**Monitor vs Bash bg**
- bg = 终点通知
- Monitor = 过程事件

**PushNotification**
- 桌面/真机通知
- 只通知真正要打断用户的事

**进程铁律**
Bash 跑命令；Monitor 看流
不用原始日志洪泛
失败状态也要匹配

## 03 Agent / Task 协作
Agent / SendMessage
TaskCreate / TaskGet
TaskList / TaskUpdate
TaskStop / TaskOutput

**Agent**
- 派 subagent
- 大量读文件下文
- 主线程只读结论
- Explore：低成本扫文件
- Plan：实施方案
- general-purpose：可续
- Custom：用户定义 agent

**SendMessage**
- 用 agent ID 恢复
- subagent 串通信
- shutdown_request
- plan approval response
- transcript 独立 jsonl

**TaskCreate**
- 创建后台任务
- 无需用户批准

**TaskGet**
- 查看任务详情
- 看 blockedBy / blocks

**TaskList**
- 列任务
- 找 pending / blocked

**TaskUpdate**
- 状态/依赖/owner
- 完成必须标 completed

**TaskStop**
- 停后台任务
- deprecated
- 改用 Read 输出文件

**TodoWrite**
- 默认禁用/旧任务清单

## 04 Skill / LSP / 计划模式
Skill / LSP tools
AskUserQuestion
EnterPlanMode / ExitPlanMode

**Skill**
- SKILL.md 指令包
- YAML frontmatter
- name / description
- allowed-tools = 预批准
- disallowed-tools = 真限制
- context: fork 隔离执行
- agent / hooks / paths
- effort / model
- $ARGUMENTS / $command
- 项目级 .claude/skills

**LSP**
- goToDefinition
- findReferences
- hover
- documentSymbol
- workspaceSymbol
- getDiagnostics
- 语义导航优先
- 50ms 级跳定义
- references 比 grep 准

**AskUserQuestion**
- UI 弹窗提问
- 仅用户决策时用

**EnterPlanMode**
- 进入计划模式
- 非平凡实现前用

**ExitPlanMode**
- 提交计划审批
- 不问"计划OK吗"

**LSP 强规则**
- 引用/定义/诊断别用 grep
- CLAUDE.md 可强制启用

## 05 外部 / 调度
MCP / Cron / Web
Workflow
Worktree

**MCP**
- 外部工具集
- 服务器合并并
- project/user
- local/enterprise
- plugin/claude.ai

**ToolSearch**
- 延迟加载
- 避免工具定义撑爆上下文

**WaitForMCP**
- 等连接就绪
- 代理内常预连

**Workflow**
- 多 Agent DAG
- fan-out
- pipeline
- judge panel
- loop budget
- 确定性编排

**CronCreate**
- 5字段 cron
- min h dom mon dow
- 循环7天过期
- 忙碌只一次

**CronDelete**
- 删除调度

**CronList**
- 列调度

**ScheduleWake**
- UI pacing
- 用户不直调

## 06 其他世界操作
**WebFetch**：抓取 URL 并转 markdown，受域名/认证限制。
**WebSearch**：网页搜索，适合近期信息；回答后列 Sources。
**EnterWorktree / ExitWorktree**：创建/退出 git worktree 隔离环境；仅用户声明要 worktree 时用。
**Artifact / ShareOnboardingGuide / RemoteTrigger**：发布制品、分享 ONBOARDING、创建/管理远端 Routines。

## 工具选择决策树
- 你要找文本？→ Grep；别用 find / ls。
- 你要读文档？→ Read；别用 cat/head/tail。
- 你要改几行？→ Edit(content + context)；别用 grep。
- 你要改大段/整文件/新建？→ Write；已有内容重写先确认不是手工内容。
- 你要跑命令/测活/CLI？→ Bash / PowerShell；独立命令，绝对路径，&& 链式。
- 你要等一个命令结束？→ Bash run_in_background；只要完成通知。
- 你要盯日志/CI/服务状态？→ Monitor；stdout 每行事件；grep --line-buffered；覆盖 success + failure 终态。
- 你要扫大量文件？→ Explore agent；主线程不要逐文件 Read。
- 你要设计实施方案？→ Plan agent 或 EnterPlanMode；复杂实现先计划。
- 你要多轮子任务？→ general-purpose/custom agent + SendMessage。
- 你要重复一套流程/流程？→ Skill；封装 SKILL.md，而不是复制粘贴。
- 你要跳定义/找引用/看类型错误？→ LSP；grep 只做文本匹配，不做语义导航。
- 你要定时重复？→ /loop 保上下文；Desktop 保本地能力；Cloud 保无人值守。
- 你要报外部系统？→ MCP；ToolSearch 延迟加载具体工具。
- 你要多 Agent 确定性编排？→ Workflow；fan-out / pipeline / judge panel / loop-until-budget。

## 误用 → 正用对照矩阵
| 误用 | 正用 |
|---|---|
| Bash find | → Glob |
| Bash ls | → Glob / Read directory? 不直接 ls |
| Bash grep | → Grep；语义引用用 LSP findReferences |
| Bash cat/head/tail | → Read；日志实时监控才用 Monitor + tail -f |
| Bash sed/awk 编辑 | → Edit |
| echo > file | → Write |
| 主线程逐文件 Read | → Explore agent |
| 复制长 prompt | → Skill |
| 手动重复检查 | → Cron / Schedule / Monitor |
| 轮询日志 | → Monitor |
| 只 grep 成功态 | → 同时匹配 ERROR / FAILED / Traceback / timeout |
| 用 Write 小修 | → Edit |
| 用 Edit 大重构 | → Write |
| grep 找定义/引用 | → LSP goToDefinition / findReferences |
| 直接问用户偏好 | → AskUserQuestion |
| 随手开 Workflow | → 需明确声明才用 / 确定性多 Agent |

## 原子链路
文件链路：Glob 找路径 → Grep 定位 → Read 带行号上下文 → Edit 精确替换 / Write 整件重构
进程链路：Bash 一次性执行 → Bash bg 等完成 → Monitor 事件流 → PushNotification 只打断重要完成/阻塞
Agent链路：Explore 广扫 → Plan 出方案 → general-purpose 多轮执行 → SendMessage 恢复 → TaskList/Update 管状态
代码链路：LSP definition/references/diagnostics → Grep 文本范围 → Read 上下文
调度链路：/loop 会话上下文 → Desktop 本地持久 → Cloud 无人值守 → CronCreate 手段表达式
外部链路：MCP server → ToolSearch → 调具体工具；WebFetch/WebSearch 只用于知识检索
编排链路：Workflow script → agent() / parallel() / pipeline() / judge panel；确定性多 Agent，不靠主线程临场发挥

## 速查卡 / Reflex Card
Glob / find → Glob
Grep / 读 content → Grep
Read > cat | Edit | Write | NotebookEdit | Explore > 主线逐文件读
Skill > 复制长 prompt | LSP findReferences > grep 引用 | Cron > 手动重复 | Bash bg > 完成通知 | Monitor > 过程事件
Bash：独立命令 / 绝对路径 / && 链式 / 可并行 / 不做文件操作
Monitor：--line-buffered / 过滤输出 / 覆盖成功失败终态 / 避免日志洪泛
Edit：先 Read / old_string 原文唯一 / 精确编辑进 / 小修改优先
Write：新建或整文件重构 / 覆盖风险 / 不覆盖未知手工内容
Agent：主线保结论 / 大范围用 Explore / transcript 独立 / 可 resume 用 general-purpose
Workflow：用户明确要求才用 / fan-out 搜索 / pipeline 处理 / judge panel 评审 / loop-until-budget 深挖

页右下：R2芯片智能体
