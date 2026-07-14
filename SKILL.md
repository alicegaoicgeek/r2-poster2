---
name: r2-poster
description: 文字转图片——将 Markdown 内容转为 R2 Swiss 风格公众号贴图（3:4 或 16:9）。输入文章/笔记/资料，输出设计过的 HTML + PNG。触发词：做张贴图、文字转图片、公众号贴图、做个海报、内容转图片、信息图。
---

# R2 Poster — 文字转图片工作流

把 Markdown 文字内容转为 R2 Swiss 风格的设计图片。输入一篇文章，输出一张排版精良的 PNG。

## 速查

```
读源内容 → 蒸馏 → 容量估算(🛑超预算裁内容) → 写HTML → Chrome截图 → Playwright验证 → agent QA → 迭代至0溢出
```

**核心迭代循环**（每轮约 30 秒）：
```
写/改 HTML → 截图 → node verify-poster.mjs → 有溢出？→ 按报告收紧间距 → 重跑
                                              → 0溢出？→ agent QA 视觉检查 → 通过？→ 交付
```

## R2 Swiss 设计系统（固定，不可偏离）

### 色彩

| 用途 | 色值 | 说明 |
|------|------|------|
| 背景 | `#F7F4EF` | 浅米白，不可换 |
| 主文字 | `#141414` | 近黑 |
| 次要文字 | `#666666` | 灰色 |
| 三级文字 | `#999999` | 浅灰 |
| 唯一强调色 | `#E8501F` | 橙色，全图只用这一种 accent |
| 分隔线 | `#D5D0C8` / `#E8E3DB` | 灰色规则线 |

**禁止**：蓝、紫、绿、霓虹、渐变、阴影。

### 字体

```css
--mono: "SF Mono", "Menlo", "Consolas", "JetBrains Mono", monospace;
--sans: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif;
```

不依赖 Google Fonts。工具名/代码用 mono，正文用 sans。

### 间距系统

基于 8px 网格：8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88

### 布局原则

1. **网格优先**：所有元素按隐形网格排布，有明确对齐关系
2. **强排版不靠装饰**：视觉张力来自字号、字重、间距、留白
3. **非居中但有秩序**：左对齐、偏置构图、大面积留白
4. **少色高对比**：只用上述色彩系统
5. **信息层级清楚**：一眼标题 → 二眼结构 → 三眼细节
6. **几何化表达**：用线、块、圆、规则表达概念
7. **右下角品牌**：`R2芯片智能体`

## 工作流

### Step 1: 读源内容

读取用户指定的 Markdown 文件或粘贴的文本。理解核心结构：标题是什么、有几个章节、最核心的洞察是什么、有哪些可做成速查表的数据。

### Step 2: 内容蒸馏

公众号贴图的本质是**视觉钩子**——不是全文复制，是提炼骨架。

蒸馏规则：
- **保留**：标题、核心洞察（1-2 句）、分类/章节结构、速查/对比表格
- **删除**：段落论述、举例、展开说明、脚注、社区链接、安装命令
- **合并**：多级标题扁平化，相似内容合并
- **速查表**：原文有对比/选择表的，保留 6-8 行最核心行

每张图**只有一个主信息**，不塞满。

### Step 2.5: 容量估算 🛑（写 HTML 前必做，防溢出）

固定画布 = 固定内容预算。**蒸馏后的内容如果超过预算，继续裁内容，不缩字号。**

**1080×1440 画布容量模型**（80px 左右边距，48px 上 / 44px 下 padding，正文 24px 基准）：

| 区域 | 字号 | 行高 | 904px 宽每行容纳 | 硬上限 |
|------|------|------|-----------------|--------|
| 核心数字 | 260-280px | 0.84 | — | 1 行 |
| 标题 | 48-56px | 1.08 | ~14 中文字 | 1 行 |
| 洞察/副标题 | 24px | 1.45 | ~28 中文字 | **≤2 行** |
| 分类/章节项 | 28px | — | ~25 中文字 | **≤7 项** |
| 每项描述 | 24px | 1.4 | ~28 中文字 | **≤1 行/项** |
| 速查表行 | 24px | 1.4 | — | **≤5 行** |
| 分隔间距总和 | — | — | — | ≈500px（各 section 间 gaps） |

**估算公式（24px 正文版）**：

```
总高度预算 = 1440 - 92(上下padding) = 1348px
固定消耗 ≈ 标签40 + 数字218 + 标题52 + 洞察70 + 规则线35 + gaps≈400 = 815px
可变消耗 = 分类项区 + 表格区
分类区 ≈ 项数 × 100px（名称28px + 描述24px 单行 + padding）
表格区 ≈ 行数 × 40px + 表头30px
可变消耗 + 固定消耗 ≤ 1348px ✓ 否则裁内容
```

**三项硬约束（写 HTML 前必须满足，24px 正文基准）**：
1. 分类/章节项 ≤ 7 个
2. 速查表行 ≤ 5 行
3. 洞察文字 ≤ 56 个中文字（2 行 × 28 字）
4. 每项描述 ≤ 28 字（1 行），超过则精简文案不换行

### Step 3: 选定尺寸

| 场景 | 尺寸 | 用法 |
|------|------|------|
| 公众号贴图 | 1080 × 1440 (3:4) | 文章内图片，竖版信息图 |
| 演示幻灯片 | 1920 × 1080 (16:9) | 演讲 deck 单页 |
| 小红书/社媒 | 1080 × 1440 (3:4) | 竖版分享 |

默认用 3:4（1080×1440），除非用户指定 16:9。

### Step 4: 写 HTML

**必须用系统字体、自包含单文件、精确尺寸、overflow:hidden。**

HTML 骨架：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="UTF-8"><style>
  :root {
    --bg: #F7F4EF; --text: #141414; --text2: #666; --text3: #999;
    --accent: #E8501F; --rule: #D5D0C8; --rule2: #E8E3DB;
    --mono: "SF Mono","Menlo","Consolas",monospace;
    --sans: "PingFang SC","Microsoft YaHei","Helvetica Neue",sans-serif;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1080px;height:1440px;overflow:hidden;background:var(--bg);color:var(--text);font-family:var(--sans);-webkit-font-smoothing:antialiased}
  .poster{width:1080px;height:1440px;padding:52px 88px 48px;display:flex;flex-direction:column}
  /* … content sections … */
</style></head>
<body><div class="poster">
  <!-- 1. R2- 标签 -->
  <!-- 2. 核心数字/标题 -->
  <!-- 3. 橙色规则线 -->
  <!-- 4. 核心洞察 -->
  <!-- 5. 分类/章节列表（cat-row 模式） -->
  <!-- 6. 速查表 -->
  <!-- 7. 右下品牌 -->
</div></body></html>
```

#### 四个固定组件

**组件 A · R2 标签**（顶部）：
```css
.r2-label{font-family:var(--mono);font-size:11px;font-weight:500;color:var(--text3);letter-spacing:0.12em;margin-bottom:20px}
```

**组件 B · 分类行**（中间，列表模式，比卡片更 Swiss）：
```css
.cat-row{display:flex;align-items:flex-start;border-top:1px solid var(--rule2);padding:14px 0}
.cat-row:first-child{border-top:2px solid var(--text)}
.cat-row:last-child{border-bottom:2px solid var(--text)}
.cat-idx{font-family:var(--mono);font-size:20px;font-weight:600;color:var(--accent);min-width:44px}
.cat-title{font-size:28px;font-weight:600;color:var(--text)}
.cat-detail{font-size:24px;color:var(--text2);line-height:1.4}
```

**组件 C · 速查表**（底部，瑞士风格极简表格）：
```css
.ref-table{width:100%;border-collapse:collapse}
.ref-table th{font-size:18px;font-weight:500;color:var(--text3);letter-spacing:0.06em;text-align:left;padding:8px 0 10px;border-bottom:2px solid var(--text)}
.ref-table td{font-size:24px;padding:10px 0;border-bottom:1px solid var(--rule2);color:var(--text2)}
.ref-table tr:last-child td{border-bottom:none}
/* 错用列：红色删除线 */
.wr{color:#C30;text-decoration:line-through;text-decoration-color:rgba(232,80,31,0.25)}
/* 正确列：mono 黑色 */
.rt{font-family:var(--mono);font-size:11px;font-weight:500;color:var(--text)}
```

**组件 D · 品牌标记**（右下角）：
```css
.footer{margin-top:auto;display:flex;justify-content:flex-end}
.footer-mark{display:flex;align-items:center;gap:8px}
.footer-mark .sq{width:6px;height:6px;background:var(--accent)}
.footer-mark .txt{font-size:12px;font-weight:500;color:var(--text3);letter-spacing:0.06em}
```

#### 换行铁律 🛑

任何文字块包含 ≥2 个独立概念时，必须拆成独立 `<div>`，每个概念独占一行。

**独立概念**包括：枚举项（①②③）、步骤链（→ 连接的每一步）、层级描述（分钟级/小时级/天周级）、分句（以 ，。分隔的独立语义单元）。

```html
❌ <div>三层反馈环：分钟级…，小时级…，天周级…</div>

✅
<div>三层反馈环：</div>
<div>分钟级 Agent 自迭代（写→测→改）</div>
<div>小时级人工纠偏（看产出→调方向→更新规格）</div>
<div>天/周级外部反馈（用户数据→修正产品愿景）</div>
```

**写 HTML 时逐块过三问**：
1. 这段是否包含 ≥2 个独立概念？→ 拆行
2. 这段是否有枚举项（①②③ / 步骤 / 层级）？→ 拆行
3. 这段是否 ≥50 字且含 ≥2 个标点断句？→ 拆行

#### 排版层级（固定，不要偏离）

正文最低 24px，这是公众号手机阅读的硬要求。

| 元素 | 字号 | 字重 | 颜色 | 字体族 |
|------|------|------|------|--------|
| 核心数字 (如"40") | 200-280px | 800 | text 或 accent | mono |
| 标题 | 48-56px | 700 | text | sans |
| 洞察/副标题 | 24-28px | 400 | text2 | sans |
| 分类编号 (01-07) | 18-22px | 600 | accent | mono |
| 分类名 | 26-30px | 600 | text | sans |
| 工具/描述文字 | **24-28px** | 400 | text2 | sans/mono |
| 表格头 | 18-20px | 500 | text3 | sans |
| 表格正文 | **24px** | 400 | text2 | sans/mono |
| 标签/品牌 | 18-20px | 500 | text3 | mono/sans |

**关键约束**：正文（描述文字、表格内容）绝不小于 24px。如果内容超预算 → 裁内容，不缩字号。 |

#### CSS 防御布局规则（防溢出三板斧）

```css
/* 规则 1：body 硬边界 */
body {
  width: 1080px; height: 1440px;
  overflow: hidden;           /* 任何溢出直接裁掉 */
}

/* 规则 2：flex 子元素不撑破容器 */
.poster > * {
  flex-shrink: 0;             /* 大多数 section 不压缩 */
  min-height: 0;              /* 关键：允许 flex 子元素小于内容高度 */
}

/* 规则 3：文本容器有 max-height 兜底 */
.cat-detail {
  max-height: 40px;           /* 2 行 × 12px × 1.55 ≈ 37px，四舍五入 */
  overflow: hidden;           /* 超长工具名被截断而非溢出 */
}

/* 规则 4：表格不撑破 */
.ref-table {
  table-layout: fixed;        /* 列宽严格按 th 声明，不受内容影响 */
}

/* 规则 5：长单词/长代码强制换行 */
.cat-detail, .ref-table td {
  word-break: break-all;      /* 超长工具名/URL 强制断行 */
  overflow-wrap: break-word;
}
```

**为什么这些规则重要**：
- `min-height: 0` 是 flexbox 最常见的溢出 bug 来源——flex 子元素默认 `min-height: auto`，会拒绝缩小到内容高度以下
- `overflow: hidden` 是最后防线——如果前面所有约束都失效，文字被截断比整个布局崩溃更好
- `table-layout: fixed` 防止表格内容撑宽列 → 挤压相邻列 → 文字叠加

### Step 5: 截图 + 验证迭代循环 🔄

**这是核心步骤，不要一次过。必须循环到 0 fatal 0 critical。**

#### 5a: 截图

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu \
  --screenshot=output-v1.png \
  --window-size=1080,1440 \
  --default-background-color=F7F4EF \
  --virtual-time-budget=8000 \
  "file:///绝对路径/poster.html"
```

#### 5b: Playwright 结构验证

```bash
node verify-poster.mjs "file:///绝对路径/poster.html"
```

验证脚本检测：BODY_OVERFLOW_Y/X、ELEMENT_OVERFLOW、TEXT_CLIP、关键元素可见性、间距一致性。

**关键指标**：
- `fatalCount: 0` — 无致命溢出
- `criticalCount: 0` — 无元素截断
- `ok: true`

**修复策略**（根据报告逐项收紧）：
```
溢出 200+px → 删内容或改 2 列网格
溢出 20-80px → 减 hero 字号 / 减 section 间距 / 减 padding
溢出 5-15px → 逐 px 收紧 margin-bottom / padding
溢出 <5px  → 减 bottom padding 即可
```

**不要凭感觉调——看 verify 输出的 overflowBy 精确值，算好需要节省的 px 数，一次改到位。**

#### 5c: Agent 视觉 QA

结构验证通过后，用 agent 读图做视觉质检：

```bash
agent --yolo --print "检查这张海报：1.文字完整可见 2.布局舒适 3.无断行错误 4.设计品味 /path/to/poster.png"
```

常见 QA 发现：
- `word-break: break-all` 拆碎 CamelCase 工具名 → 改 `overflow-wrap: break-word`
- 某行太挤 → 加 `<br>` 手动断行（加完后重跑 5b 验证）
- 某区域密度不均 → 调整内容分布

#### 5d: 循环

```
5a(截图) → 5b(verify) → 有溢出? → 修复 → 5a
                        → 0溢出? → 5c(QA) → 有问题? → 修复 → 5a
                                           → 通过? → Step 6
```

**中间产物留在项目 `taste-output/` 目录，只有最终版进 `~/Desktop/r2-swiss/`。**

### Step 6: 交付

- [ ] `verify-poster.mjs` 输出 `ok: true`, `fatalCount: 0`, `criticalCount: 0`
- [ ] Agent QA 无新问题
- [ ] 截图尺寸 = HTML 声明尺寸（sips 验证）
- [ ] 色彩：只有 #F7F4EF / #141414 / #666 / #999 / #E8501F / 规则线色
- [ ] 无渐变、无阴影、无 emoji、无 stock 图
- [ ] 右下角有 `R2芯片智能体`
- [ ] 标题带 `R2-` 前缀
- [ ] **最终版** `cp` 到 `~/Desktop/r2-swiss/`，中间版本不留

## 反模式（禁止）

- ❌ 深色背景（只用 #F7F4EF）
- ❌ 多个 accent 色（只用 #E8501F）
- ❌ 圆角卡片、阴影、渐变
- ❌ 居中标题 + 按钮的 hero section
- ❌ Google Fonts 外部依赖
- ❌ 把全文塞进图片（必须蒸馏）
- ❌ 装饰性 icon、emoji、stock 图
- ❌ 边框包围的卡片网格（用规则线代替盒子）

## 自动布局原理

r2-poster 的布局策略是「半自动」——不是纯算法生成，而是**约束模板 + 内容自适应**。

### 为什么不做全自动布局

全自动布局（内容丢进去自动排版）在固定画布上不可靠，根因是：

1. **文本换行不可预测**：同样的字数，中文/英文/代码混合时每行实际宽度完全不同。CSS 渲染后才能知道真实行数。
2. **内容结构差异大**：有些文章 3 个章节，有些 12 个。统一模板要么太空要么溢出。
3. **设计感来自「人做决策」**：字号的跳跃比例、橙色用在哪、哪里加规则线——这些是设计判断，算法做不了。

### 当前策略：三层约束

```
Layer 1: 内容预算（事前预防）
  └→ 蒸馏后内容超过预算 → 裁内容，不缩字号

Layer 2: CSS 防御（渲染时兜底）
  └→ overflow:hidden + flex-shrink + max-height + table-layout:fixed

Layer 3: 截图质检（事后验证）
  └→ sips 验证尺寸 + 肉眼检查 + Chrome evaluate 查溢出
```

### 如果确实需要更自动化的方案

两个方向可以探索：

**方向 A · 多页分流**：内容太多时不分页压缩，而是自动拆成多张图（幻灯片模式）。每张图独立完整，翻页查看。这比硬塞进一张图更合理。

**方向 B · 两 pass 渲染**：第一 pass 用宽松字号渲染 → Playwright 量出各元素真实高度 → 第二 pass 按实际高度动态调字号/间距。成本是渲染时间翻倍，但能处理内容量差异大的场景。

当前默认用三层约束策略，多页分流在内容明显超预算时手动触发。
