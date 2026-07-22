---
source: R2-c2rtl_swiss.png
extractor: tesseract chi_sim+eng
extracted_at: 2026-07-21 16:30
---

POSTER - 3:4 - LOOP
R2-C2 RTL                                                                                              GOLDEN 一 GEN — ORACLE
拆 CARES, RRAIOIE, GARRIRELELE 编译可信赖的 Verilog                                                                                2026-07-14
C 进去 一 验证过的 Verilog 出来。不证明翻译过程对一一          。可信度在验证，不在LLM。Demo: SoftFloat f16_add + 小
模块穷举 。 大模块形式化等价。

69                         D                          GEN                        V                          FIX                        S

Golden 体检                 AST 分解                       双引擎X 三路径              EDA 双轨                      错题闭环                       复盘回写

G1 $A Golden                 Clang 依赖图                     Al 引擎 Path A                   Lint一仿真一等价一PPA “桥接 JSON                        已验证模块库

G2 UBSan 动态               叶子一根拓扑序               确定性引擎 6A'                小模块穷举                    定位器. 压缩器               错题病例库

G3 CBMC 静态                   单函数任务下发                  Path B/ C 可选                  大模块 SAT 完备                 修复 Prompt                     修复策略库

任一失败 + 不过不进     确定性。不靠 LLM       共享验证框架           商用 | 开源降级         S10 轮硬终止          KG 反哺生成
  进门体检 + 三硬条件 沙子进不去 ， 粒度可控 ，反馈可亿

61                                                    62                                                    63

$A Golden                                                 动态体检 UBSan                                            静态体检 CBMC

确认 C 参考模型能跑出结果。(C 是锚，不是起点。          溢出 / 越界 / 未初始化 / 除零。触发即阻断。                 全路径推 UB。不跑 C 也能拦住带病 Golden。

0O 干净C i                                                      O@ 单函数粒度                                                    G 精确反馈

有 C 才能子模块独立验证与纠错。无 C 只靠自然语言 ”编译器拆分。 拓扑序生成。拆到输入空间可穷举、        定位器 + 压缩器 + EDA 桥接。证据给 LLM ，不是

规格 一 直接月溃。                                                错点可定位。                                                         1错了重做J。

Sub-agent: 每轮独立执行一一只传产物 (代码 + 错题报告) ，不传思考噪声。隔离为质量，不为并行。
  三条路径 。同一验证框架 tls 是可选插件，不是架构主体

PATH A ，主路                              PATH B                              PATH C

LLM BS RTL                                            HLS 兼容直编                                    重构 + HLS 调优

数据通路 / 位操作 / 小 FSM / 精度敏感。商用 EDA 验       pragma 齐， MAR - 接口规范 一               LLM 先改写成 HLS 友好 C 一 综合 一 读报告调

证 + 错题闭环修复。拔掉 HLS 仍完整运转。                 Catapult /Vivado HLS。确定性翻译，不靠        PPA。深 pipeline / 资源共享场景。

LLM。

  经验飞轮三层 冷启动 ，温启动 ，热启动 ，复利不告更大模型

L1                                                    L2                                                    L3

已验证模块复用                                     错题模式注入                                       调试策略检索

叶子函数跨设计重到高。验过的 clz / pack 直接挂      subnormal / 对阶进位等病例写入 Prompt. BR      同类 mismatch 先查历史修复路径。缩短收敛轮

接，不重复生成。                                     Ase, FBGA.                            数。
回  三约束。 ASHE - AutoResearch 切位

三约束。 敢用的笼子                                          AutoResearch 切位

= AST 分解确定性一一怎么拆不靠 LLM                                                  = HJER: Prompt / 错题压缩 / 经验检索

a 验证绝对一一穷举 / SAT 完备，超时降级兜底                           = 不切底层: EDA 端到端 (太慢 - license)

= 错题可追溯一输入。期望，实际 行号可审计                                  ea 指标: 首次通过率 。 收敛轮数

铁律: 白盒 RTL一一变量名保留、结构保留、人可逐行对照 C。黑盒即使验证过也     切对是金矿，切错是无底洞。经验池 = 记忆飞轮在 C2RTL 的实例。

不敢用。

01 AST 分解器                                                      o2 Prompt 引擎                                                   03 EDA 桥接层

04 错误定位器                                                        95 诊断压缩器                                                        06 CEGIS 主控

07 已验证模块库                                                   08 错题模式库                                                      09 主控流水线

PathA生成。 Prompt 修复                       EDA 双轨 BA / 等价                            硬终止 。 ALA - 方式@

;                   _           ;              、                                                                                                 R2芯片智能体

一句话:  生成自研，  验证工业级，  闭环自研。  核心壁垒在自研组件，  不在任何一个商用工具。                                                  R2 + CHIP + AGENT
