# 范畴论系列文章约定

本文件约束 `src/Category/articles/` 下系列文章的写法。写作或修改文章前先读本文件，并以 `articles/00.md` 为范例。本文件不会被渲染到页面上。

## 文件与结构

- 文章放在 `articles/`，按 `NN.md` 命名，页面按文件名排序显示：`00`、`01`、`02`。章节标题写在文件第一行，如 `# 序`。
- 章节标题用中文数字：`一、`、`二、`。
- 段落编号形如 `1.`、`1.1.0.`、`2.1.3.1.`，编号用 `.` 分隔，序号后统一加点。
- 段落以句号结尾，原文已有标点的不重复添加。
- 行首的数字编号要写成 `1\.`，避免被 Markdown 渲染为有序列表。`00.md` 即如此。
- 图片引用 `assets/` 下的 SVG：`![图 1　说明文字](../assets/xxx.svg)`，说明文字中的空格为全角空格。
- SVG 由 `assets/*.tex` 经 `scripts/tikz.ts` 渲染生成。修改图时改 `.tex`，再重新渲染。

## 范畴论记号

- 一般范畴：用花体 $\mathcal{C}$。函子范畴用 $\mathcal{D}$，$\mathcal{D} = [\mathcal{C}, \mathcal{C}]$。
- 类型范畴：写作 $\mathcal{T}$（英文名 Type）。文章首次提到时要声明，如 `02.md` 第 0 节。声明之后，类型范畴一律用 $\mathcal{T}$，不再用 $\mathcal{C}$ 或 $\mathrm{Type}$。
- 一般范畴的泛型讨论（如函子、自然变换的定义）用 $\mathcal{C}$，具体的类型范畴（如 Maybe、Reader）用 $\mathcal{T}$。
- 对象集合：$\text{ob}\,\mathcal{C}$。对象用大写 $A$、$B$、$C$。
- 态射集合：$\text{mor}\,\mathcal{C}$。态射用小写 $f$、$g$、$h$。
- 态射集（Hom）：统一用 $\mathcal{C}(A, B)$，类型范畴即 $\mathcal{T}(A, B)$。
- 复合：$g \circ f$ 表示先应用 $f$ 再应用 $g$。不使用文字 `after`。
- 恒等态射：$\mathrm{id}_A$。
- 函子：$T: \mathcal{C} \to \mathcal{C}$。函子同时也是函子范畴 $\mathcal{D}$ 中的对象，写作 $T \in \text{ob}\,\mathcal{D}$。
- 恒等函子：$\mathrm{Id}$。函子复合：$T \circ T$。
- 自然变换：$\eta: \mathrm{Id} \Rightarrow T$。自然变换同时也是 $\mathcal{D}$ 中的态射。
- 类型名与类型构造子在公式中用 `\text{}`，例如 $\text{Maybe}\langle A \rangle$。
- 集合论的表示沿用 `00.md`：$\mathrm{Set}$、$\mathrm{Gp}$ 等范畴名用 `\mathrm{}`。

## 公众号

- `wechat-articles/` 是 `articles/` 的公众号版本，文件名一一对应。原版的修改先在 `articles/` 中完成，再同步到 `wechat-articles/`。
- 只在 `wechat-articles/` 中修改公众号的问题，例如某些公式在公众号中无法正确渲染为图片时，改为纯文字。`articles/` 保持原样。
- `scripts/wechat.ts` 只负责渲染 `wechat-articles/`，不做针对具体文章或符号的特殊处理。

## 标点

- 公式内部的逗号用英文逗号 `,`，例如 $f, g, h \in \mathcal{T}(\mathrm{Int}, \mathrm{Int})$。
- 公式与公式之间、公式与代码之间、代码与代码之间的分隔用中文逗号 `，`，例如 $f \in \mathcal{C}(A, B)$，$g \in \mathcal{C}(B, C)$，`h = x => x + 3`，$h = g \circ f$。
- 行内代码内部的逗号保持代码原样，例如 `(x: Null) => Null`。
- 公式或代码后接续句子时，若语义上有停顿，补中文逗号，例如 $\}$，然而非常可惜。

## 代码写法

- 行内的 TS 代码用反引号，例如 `x => x + 1`、`(x: number) => x`。代码不写进 `$...$`。
- 类型签名中泛型量化、类型构造子等属于数学表达，用 KaTeX，例如 $\forall A:\ A \to \text{Maybe}\langle A \rangle$。
- 同一个类型或函数，首次出现的签名要写清起点和终点类型，之后可省略。
- 不写可运行的完整程序，只写说明概念所需的最小表达式。
