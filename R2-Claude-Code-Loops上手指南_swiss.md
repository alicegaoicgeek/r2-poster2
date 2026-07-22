---
source: R2-Claude-Code-Loops上手指南_swiss.png
extractor: tesseract chi_sim+eng
extracted_at: 2026-07-21 16:30
---

ee
=                                                                  PAGE 01 / 02
R2-Claude Code Loops 上手指南                                              soe a:4 = a800ate
官方可操作版: agent 重复执行工作周期，直到满足停上条件，第 1/2 页 - 原理与四档                                            un wane es
Loop =            X 直到         ”你管得越来越少，Al 管得越来越多
01  四类循环 = 四个自动执行档位                                                                       TURN 一 GOAL 一 TIME 一 PROACTIVE
01 - TURN-BASED                                        02 - GOAL-BASED
回合制。 让它自己验收                                目标制。 让它自己判断何时收工
把手动验证步骤写成 SKILL.md，让它自己核自己的活                      确定性标准最有效: 测试通过数、分数阔值
|  SKILL. md 写清检查项 — agent 每轮自检 一 你只看最终结果                               |  /goal #28 Lighthouse 提到 90 以上，试 5 次就停
03 ， TIME-BASED                                        04 + PROACTIVE
时间制。 让它自己拘点开工                             主动式。 整件事全程不用你管
按节奏到来的工作交给间隔循环，不必守着                                                               schedule + goal + workflow + auto mode 组合编排
|  /loop 5m 检查 PR，处理 review，修掉挂了的 Cl                                              |  /schedule & routine + /goal 定终点+ workflow + auto 免审批
你写验收                      它判收工                      Ca                      全程自驱
02  /goal > 质量。 token 一 三块硬机制                                                             STOP - REVIEW - COST
02 .WHY /GOAL                         03 - QUALITY                          04 ， TOKEN 省法
想停时有评估模型挡着                                        独立 agent 做 code review                                  六条边界里最易被忽视
“每次想停 > 评估模型检查条件                    "新鲜上下文 一 偏见更少                        。routine 别跑得比需要更频
。不满足一 送回去继续干                        。 不受干活 agent 推理影响                        。 间隔匹配变化频率
。 确定性标准最有效                             。 结果不达标: 别只修这一个                      。 确定性工作用脚本跑
。 测试通过数 / 分数阔值                         。 把标准编码进 skills                           。比模型每次重推便宜
。 不用再猜什么算 【足够好1                       。 让以后每一轮都受益                          。 /usage随时看消耗
05 上手三问 一哪一问答得上来，就把那一块交出去                                                                  START SIMPLE
Q1                                          Q2                                          Q3
验证检查写得出来吗?                            目标足够清晰吗?                               工作是按节奏到来的吗?
能一交turn-based                                              AE — 38 goal-based                                              AE — 38 time-based
SKILL.md 写清验收步骤                                          数字闪值 / 通过数当停条件                                       /loop 匹配变化频率
BARE: 不是所有任务都需要复杂循环，从最简单的方案开始。 上周《Loop engineering 设计思路》讲原理，这篇是官方上手实践。完整可复制案例见第 2 页。
thf (RE LIBBY fe > 三问定位档位 -> SKILL 固化标准 > 独立 review 保质                                                                                                            petiole
