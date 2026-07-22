---
source: r2-google-okf-v01-core.png
extractor: vision
---

# R2-Google | OKF v0.1 核心一图

Google · OKF = 开放知识格式

知识怎么存、怎么给 AI 读、怎么换。

## 本质

Markdown 目录 + YAML 头，无注册中心。  
cat 能读，git 能发，diff 能看。

## 设计四性

- 人类可读
- 机器可解析
- git diff 友好
- 跨工具跨组织

## 分发单位：Knowledge Bundle

自包含目录树，可用 git / zip / 子目录分发

```
bundle/
├── index.md          可选，目录清单
├── log.md            可选，变更日志
├── <concept>.md      根级概念文档
└── <subdir>/
    ├── index.md
    └── <concept>.md
```

保留名：index.md | log.md  
其余 *.md = 概念  
概念 ID = 路径去掉 .md，例如 tables/users

## 非目标

- 不定义概念分类法
- 不管存储 / 查询 infra
- 不取代 Avro / Proto / OpenAPI，只引用它们

## 单个概念文档：Frontmatter + Body

```yaml
---
type: <必填>
title:
description: 推荐，一句话
resource: 可选，底层资产 URI
tags: []
timestamp: ISO8601
# ... 自定义键
---
```

type 示例：BigQuery Table / Metric / Playbook / _  
无中央注册  
消费者必须容忍未知键  

正文：Markdown，优先结构化  
约定章节：Schema / Examples / Citations

## 链接与引用

- 概念间链接推荐 /tables/users.md，或 ./other.md
- 语义靠正文说明；断链不等于格式错误
- 外部引用放在 Citations: [1] URL 或 references/ 镜像

## 符合性 v0.1：硬规则少，消费宽松

- ✓ 每个概念 .md 有可解析 YAML frontmatter + 非空 type
- ✓ index.md / log.md 若存在，则符合对应格式
- ✗ 不因缺可选字段、未知 type、未知键、断链、无 index 拒绝包

## 周边生态

- 像 LLM Wiki：md + frontmatter
- 像 Obsidian / Notion：层级 md + 交叉链接
- 像元数据跟代码放一起：非中央注册中心
- 差异：有规范，少量互操作规则，不绑死工具

## 最小示例

- my_bundle/index.md → datasets/sales.md + tables/orders.md + tables/customers.md
- orders 正文里用 Schema 表 + 链接 customers + Citations 外链

## 三句话记住

1. 知识包 = 带 YAML 头的 Markdown 目录，git 分发最好。
2. 概念 = 一个 .md；只强制 type；链接串关系，Citations 串外部证据。
3. 哲学 = 规范极简、消费宽松，给 AI 和人类共读写的开放知识容器。

R2芯片智能体
