---
source: r2-eda-1.png
extractor: tesseract chi_sim+eng
extracted_at: 2026-07-21 16:31
---

下 R2-EDA
。 &                                            ZB
R2-EDA: 让EDA工具从给人用到给 Al 用
极大丰富 ' 极度垂直 极限低成本
"SoC 工具链 (SSoT + RTL)
a              输入 一 输出                                                 定位
ipgen       输入: IP 模板+ 用户配置参数; 输出: 演染后的可综 Pipe/Valve/Translator 三类标准|
合IP 块源文件。                                     P模板
reggen       regmap.json 一 RTL+C Header +UVM RAL+SVA ”寄存器/CSR生成
c2rtl         C/算法 > SV RTL+Verilator                        算法类IP
cbbrtl       CBB库匹配+Al补残差 +fFEC等价兜底              复用 proven CBB 的 RTL
topgen       IP列表+ICD/互联配置 一 SoC顶层RTL+地址映射+中IP集成进SoC
断路由
buildsoc .core依赖声明 一 依赖解算 +R2.lock+fllelist+沙盒编IP供应链治理 (像pip install管|
译/仿真 +TBOM+变更对比                           P)，CMCD落地，不生成RTL
“ 验证 (环境/激励/覆盖率)
a              输入 一 输出                                                 定位
uvmgen       yaml 一 完整UVM环境 Agent/Monitor/Driver/Seq/ 全栈验证环境生成，对标OpenTit
Env                                                 an uvmdvgen
ralgen       HJSON/JSON 一 UVM RAL model +accessors ”寄存器抽象层 (reggen含RAL时可
合并)
PSSGen       .pss 一 UVM/C/SV 具象代码                       PSS +代码生成
vipgen        接口协议spec 一 VIP(BFM+checker+coverage)      协议级VIP自动生成
…r2-* 智能体
r2-scan          3000失败日志 grep 4-6h 一 30秒
r2-trace        Verdi点10+次 一 1条命令
r2-wave         开GUI拖信号 一 1条命令
r2-diff         通过vs失败手动对比 一 自动定位
r2-suspect     人脑综合判断 一 自动排名
一个芯片团队的 Al 落地 = Agent + Skills + Data + EDA
= RH HEM
