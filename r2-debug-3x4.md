---
source: r2-debug-3x4.png
extractor: tesseract chi_sim+eng
extracted_at: 2026-07-21 16:31
---

R2-DEBUG - 四渡赤水 x 六法 x 八段
3
r2-debug: 六法制造信息，八段财环回沅
Q- /\i      18/5515       又          ib
预防
调试不是证明自己猜对了。调试是 通过每步行动制造新信息，让下一步选择更
准。
STRATEGY ，四段式 (找缝隙 ” 观察变化 ” 制造信息 - 直捣中枢)
(2) #8808 > (2) 观察变化 一《3 ) 制造信息 一(4 ) 直的中枢
SIX METHODS ， 六法 (决策层)
9O 并案                         @ 比差                         @ 以动制静
分桶后选共享信号最少、信息增益最大的先    先看两个版本变了的模块/信号，不看全量    卡住就动一下，画面差异即线索
修
@ 回滚                           © 人类直觉                       © 经验回流
攻击 bug 的生存条件而非本体 (git bisect)      从海量数据降维到 3一5 个 failure              每次结果校准下一步方向，负反馈加速
signature
EIGHT STAGES : 八段闭环 (LTB ， 出错回流预防)
阶段      F skill                             职责
@® 预防 r2-xpattern                  反模式回灌 / 规则 / Linter
@) 检测 r2-xfail + xindex.stats     编译 / 仿真 log 一 结构化 FAIL 事件
@ 分诊 r2-triage                    N 个 FAIL 聚类 / 优先级 / 归属 (N>1 才启用)
@ 定位 r2-xindex.resolve + xwave loc_id / @time 一 源码锚点 + 时间窗
© 根因 r2-xtrace 2 xwave              观察 一 假设 一 验证 一 精化
© 修复 r2-fix                       根因报告 一 patch 草案 (可审计)
@ 签核 r2-xsign                         重跑 + 对比 specx 契约，确认不回归
 沉淀 r2-xpattern AF          闭合负反馈，提升GD预防
兵法决定第一刀砍哪; 工厂保证这一刀的证据、签核、沉淀还在。
单次失败: xfail 一 xindex 一 xwave = xtrace 一 fix 一 xsign 一 xpattern 入库
m R2芯片智能体
