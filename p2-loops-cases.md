---
source: p2-loops-cases.png
extractor: tesseract chi_sim+eng
extracted_at: 2026-07-21 16:31
---

I
IE          |                                                                    PAGE 02 / 02
R2-Claude Code Loops 元       例                                                        SPEC 3:4 。1989x1449
5 个可复制启动包: prompt + SKILL 验收+ 启动方式 第 2/2 - 从单目标到主动流水线                                                        LE
PAIR 原理档位 <— P1
每个案例 =          +            +启动方式。 复制即跑，标准写进文件而非口头
Goal-based 。 自动提升测试覆盖率                                                                       /goal .最多 7 轮
START PROMPT                                                               SKILL .MD 关键行
/goal 把当前项目测试覆盖率从68%提到85%以上，最多7轮
使用 SKILL .md 验证每轮变更                                                   ”必须有新测试文件或修改
每轮结束后跑 npm test --coverage 并检查报告
”覆盖率报告显示 285%
= Ff failing test
目标制     启动: 直接粘贴上面 prompt ， 确定性阔值让评估模型知道何时收工
Time-based 。 每日代码健康检查                                                                     /Loop 1d - 22:00
START PROMPT                                                               SKILL .MD 关键
/loop 每天 22:00
检查所有未解决 issue + PR                                                 ”优先级: label=bug + assignee=me
对每个高优先级 issue 自动生成修复建议并创建 draft PR
停止条件: 所有优先级 issue 处理完毕或超过10个
”修复建议必须含代码 diff
= +测试命令
时间制     启动: /Loop 1d+ 上面 prompt 间隔匹配 [每日变化」频率，不空转
Turn-based + SKILL 。 代码审查 + 自动修复                                                                      SKILL 清单 ，你只确认
START PROMPT                                                                 SKILL .MD 模板
对当前打开的 PR 进行完整审查，使用 SKILL .md 逐条检查                               。 1 安全漏洒      di
发现问题立刻自动修复并 commit                                               1. 安全漏洞 (npm audit)
我只在最后确认                                                                             = 2.性能问题 (console:time)
”3. 可读性 (命名+注释)
"4 测试覆盖
= 验证: eslint + vitest
回合制+     启动: 新建 SKILL.md 模板 一 FANE prompt + 手动验证步骤编码进文件
Proactive 。Bug Triage + 自动修复流水线                                                               /schedute 3h - auto
FULL START PROMPT                                                             组合件
/schedule 每3小时 + dynamic workflow + auto mode                                .        ree
1. 检查 GitHub 新 issue (Label=bug)                                         [schedule 2 mitts
2. /goal 用 SKILL.md 复现 + 定位文件                                          O    定复现终点
3. 自动生成修复 commit + draft PR                                            ER
4. 用 reviewer agent 检查                                             .   kflow 编排步骤
停止: issue 关闭或 3 HAM                                                “en
= auto mode 免审批
= 独立 reviewer 把关
主动式     启动: 整段粘贴 ”对应 P1 第四档 全程不用你管 + 独立 review MBL
混合型 。 Oh-My-Pi / Terminal Agent 最佳实践维护                                                              /schedule 08:30 每日
START PROMPT (定制)                                                                 为何算 【最强J
/schedule 每天 08:30                                                           、
= BY   :   定点
1. 拉取 0h-My-Pi 最新文档                                                ae
2. /goal 对比我的 best-practices.md，找出过时或缺失部分                           = 目标制: diff 文档和
3. FA SKILL.md 验证新实践 (必须有命令+输出示例)                                    Bab: di SCRERD
4自动更新文档 + commit + 通知我                                             "SKILL: 命令+输出必有
= 产出: 更新fcommit+通知
= 知识库自进化，人只收报
混合最强    启动: 粘贴 prompt + schedule X goal X skill 三件套，适合 [文档/实践上」 类持续资产
@1 GOAL                         02 TIME                         03 TURN                         04 PRO                          05 MIX
覆盖率 68一85 - TH LER             每晚22:00 issue/PR                 PR 审查+自修 commit                3h bug triage 流水线                 每日 best-practices 进化
标准进 SKILL.md ，停条件写死数字 独立 reviewer 挡偏见 。从 01 单目标练起再上 04/05                                                          ROW Fr REL
R2 + CHIP + AGENT - P2
