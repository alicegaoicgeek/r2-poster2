# gptimg 产线工作流（1类 + 2类）

> 2026-06-12 高原确认。执行者：hermes / codex。整篇作为任务说明，照跑不发挥。

---

# 0. 强制分类闸门（2026-06-16 重定义）

接到做图任务，先按用户意图分类，不许临场发挥：

## A 类：高级视觉重画 / 原图很丑但内容要保留 / 用户要“好看、高级、重画”

**唯一正确路线：gpt-image-2 generations 文字稿直出。**

流程：
1. 只提取原图文字和概念，整理成定稿文字稿。
2. 调 `/images/generations`，不上传原图。
3. prompt 必须写：严格保留文字稿，不增删改内容；视觉由 gpt-image-2 自由设计。
4. 生成 raw → 底色延展规格化 → 交付 `~/Desktop/r2-swiss/`。

**严禁：**
- 严禁用 `/images/edits` 继承烂原图结构。
- 严禁把“高级视觉”做成信息整理、表格、卡片堆砌。
- 严禁派子智能体慢慢分析。
- 严禁写大段设计解释拖延执行。

## B 类：保持原图结构，只做 1:1→16:9 重排 / 不改内容和连线

**唯一正确路线：gpt-image-2 edits 图生图。**

适用：原图结构本身可用，用户明确要保留结构、流程、连线、图例，只是横版重排。

## C 类：用户给 ASCII / 纯文字稿直接做图

**唯一正确路线：方法1 generations 直出。**

不 QA、不迭代、不派子智能体；生成、规格化、交付。

## D 类：用户明确说“生成 codex 图”

走 codex/SVG/飞书 whiteboard-cli。否则不写代码造图。

## 单图纪律

- 单图目标总耗时：一次生成 + 规格化，<3 分钟；超时立即汇报。
- gpt-image-2 API 本身等待期间不做额外分析。
- 临时 OCR/裁图文件生成后必须删除，不污染 `~/Desktop/r2-swiss/`。
- 交付只报路径和是否完成，不写长篇复盘。

---

# 【1类：ASCII 文字稿 → 16:9 瑞士风图】

## 主流程

**第1步 文字稿（迭代区，零成本）**
按用户素材写 ASCII 文字稿，标题自带「R2-」前缀。
输出到屏幕 → 用户改/批 → 所有内容修改都在这一步完成。
★ 闸门：用户说「定稿」之前，绝不碰图片生成。

**第2步 拼 prompt（机械操作，无创作）**
```
【内容】以下中文文字一字不改、一字不漏地完整呈现在图中：

<定稿 ASCII 原文>

【品牌】图片右下角放一行灰色小字：R2芯片智能体

【设计】版式由你自由设计，禁止做成表格堆砌。风格：瑞士国际主义浅色平面设计——
暖白 #F7F4EF 平涂背景；墨黑 #141414 主文字；次级灰 #6E6A63；
唯一强调色国际橙 #E8501F（面积<5%，只用于编号块/短横线/箭头）；
单一现代黑体无衬线；细黑发丝分隔线；严格网格对齐；
无图标、无渐变、无阴影、无装饰、无圆角。16:9 横版。
所有中文字形必须完全正确，不允许任何错字。
```
版式零描述，由 gpt-image-2 自己设计（它是专业设计师，写版式=锁死成丑表格）。

**第3步 生成**
```
POST https://zenmux.ai/api/v1/images/generations
Header: Authorization: Bearer $ZENMUX_API_KEY ; Content-Type: application/json
Body: {"model":"openai/gpt-image-2","prompt":"<第2步prompt>","n":1,"size":"1536x1024"}
```
超时 300 秒；取 data[0].b64_json 解码存 PNG（没有才用 data[0].url 下载）。
原图留档 /Users/gaoyuan/Projects/r2-ppt/slides2/swiss/<名称>_raw.png。
注：API 只有 1024²/1536×1024/1024×1536 三档，无 16:9，1536×1024（3:2）是最宽横版。

**第4步 规格化（底色延展 3:2→16:9，禁裁切禁拉伸）**
```
magick <名称>_raw.png -resize 1620x1080 -background '#F7F4EF' -gravity center -extent 1920x1080 ~/Desktop/r2-swiss/<名称>_swiss.png
```
左右各延 150px 纯底色（占成图 15.6%），平涂底无接缝，等于加宽页边距。

**第5步 QA（机械核对）**
成图与定稿核对内容完整性（有无漏块/漏行）→ 完整即交付。
gpt-image-2 没有错字风险（高原确认），不要按错字思路反复盯字。

**第6步 汇报**
交付路径 + 核对结论（哪些块核对过）。

## 异常支线（仅 QA 发现漏块/漏行时进入，不是主流程）

1. 同一 prompt 重摇一次。
2. 内容定稿后的个别文字修订 → ImageMagick 手术，不整图重摇：
   采样底色 → 矩形覆盖 → `-font '/System/Library/Fonts/STHeiti Medium.ttc'` 同字号重画 → 放大核对（底线必须与同行中文齐平）。

## 坑（执行者必读）

1. prompt 绝不写版式结构（TITLE/TABLE/几栏）。
2. R2- 前缀和品牌字写进 prompt 原生渲染，不事后 P 字。
3. 图生图可用（2026-06-12 实测）：POST /images/edits，multipart 表单（-F model/-F image=@文件/-F prompt/-F size），1:1 重排 16:9 一发成功——这是【2类】的主路线。
4. gpt-image-2 中文字形可靠，无错字风险；QA 只看内容完整性。
5. macOS 无 timeout 命令。
6. 交付一律 1920×1080 PNG，只认 ~/Desktop/r2-swiss/。

## 成本基准

gpt-image-2 ≈ $0.004/张；hermes 免费 / codex ≈ $0.02/任务。全流程 < $0.03、< 3 分钟/张，超了即跑偏。

---

# 【2类：1:1 图片 → 16:9 重排】（2026-06-12 高原确认，r2-archflow 实证）

图生图直接重排，零拼接、零手术，一条命令。

**第1步 重排（图生图 edits 端点，multipart 表单）**
```
curl -s -m 300 -X POST https://zenmux.ai/api/v1/images/edits \
  -H "Authorization: Bearer $ZENMUX_API_KEY" \
  -F model=openai/gpt-image-2 \
  -F image=@<原图路径> \
  -F prompt='把这张 1:1 图重新排版为 16:9 横版：不改任何文字内容、不漏任何方块和连线，保持原配色和图例，输出专业干净的横版图，所有中文字形完全正确' \
  -F size=1536x1024 -o /tmp/resp.json
```
取 data[0].b64_json 解码存 PNG，原图留档 /Users/gaoyuan/Projects/r2-ppt/slides2/swiss/<名称>_raw.png。
prompt 按图微调一句（如点名要保留的侧栏/泳道/图例），但禁写新版式。

**第2步 规格化（同1类第4步）**
```
magick <名称>_raw.png -resize 1620x1080 -background '<原图底色>' -gravity center -extent 1920x1080 ~/Desktop/r2-swiss/<名称>_169.png
```
底色取原图角部颜色（白底图用 white，瑞士风用 #F7F4EF），保证延展无缝。

**第3步 QA + 汇报（同1类第5/6步）**
与原图对照内容完整性（方块数/连线/图例/侧栏）→ 交付路径 + 核对结论。

适用判断：源是结构化图（流程图/架构图/知识卡）→ 2类；源只有文字稿 → 1类；
源是 1:1 且用户只要快速转尺寸不重排 → 直接 pad169.sh（零成本兜底）。
