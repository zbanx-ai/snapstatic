# 创建项目规范

> 供 AI 读取。创建新项目时必须严格按以下步骤执行，不得跳过，不得调换顺序。

---

## 前置条件检查

执行任何步骤前，先确认：

```bash
bun --version   # 必须存在，≥ 1.0.0
```

若未安装，停止并提示用户访问 https://bun.sh 安装。

---

## 步骤一：创建 Vite + React + TypeScript 项目

```bash
bun create vite@latest <项目名> --template react-ts
cd <项目名>
bun install
```

**命名约定：** 小写字母 + 连字符，如 `client-report`、`product-showcase`。

> ⚠️ bun 的语法是 `--template react-ts`（无需额外的 `--`），与 npm 不同。

---

## 步骤二：安装并配置 Tailwind CSS v4

coss ui 基于 Tailwind CSS v4，安装方式如下：

```bash
bun add -d tailwindcss @tailwindcss/vite
```

> ⚠️ Tailwind v4 不需要 `postcss`、`autoprefixer`，禁止安装它们。

**修改 `vite.config.ts`，完整替换为：**

```ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

**修改 `src/index.css`，完整替换为：**

```css
@import "tailwindcss";
```

---

## 步骤三：配置 TypeScript 路径别名

> ⚠️ Vite 项目有 `tsconfig.json` 和 `tsconfig.app.json` 两个文件，必须都配置，
> 否则 shadcn 初始化时会报路径别名错误。

**修改 `tsconfig.json`，在已有内容基础上添加 `compilerOptions`（保留原有的 `files` 和 `references` 字段）：**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "ignoreDeprecations": "6.0"
  },
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

> ⚠️ Vite 8 的 `tsconfig.json` 是 project references 格式（`files: []` + `references: [...]`），不是直接的 `compilerOptions`。添加 `compilerOptions` 时不要删除原有的 `files` 和 `references`，否则 `tsc -b` 会失败。

**修改 `tsconfig.app.json`，在 `compilerOptions` 中同样添加：**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "ignoreDeprecations": "6.0"
  }
}
```

> ⚠️ TypeScript 6.0 已将 `baseUrl` + `paths` 标记为废弃，必须添加 `"ignoreDeprecations": "6.0"`，否则 `tsc -b` 报错 TS5101。

---

## 步骤四：初始化 shadcn/ui 并安装 coss 组件

### 4-1 初始化 shadcn

```bash
bunx shadcn@latest init -t vite --base radix -p nova --css-variables -y
```

> `-t vite` 指定 Vite 模板，`--base radix` 使用 Radix 组件库，`-p nova` 预设（New York 风格 + Neutral 色系），`--css-variables` 开启 CSS 变量，`-y` 跳过确认。

完成后验证根目录出现 `components.json`，`src/components/ui/` 目录已创建。

### 4-2 安装 coss ui 组件和颜色 token

> ⚠️ 不使用 `bunx shadcn@latest init @coss/style`，该命令会写入 `layout.tsx`，
> 是 Next.js 专用的，在 Vite 项目中不兼容。
> Existing Project 方式只写组件文件和 CSS token，完全兼容 Vite。

```bash
bunx shadcn@latest add @coss/ui -y --overwrite
bunx shadcn@latest add @coss/colors-neutral -y --overwrite
```

> `-y` 跳过交互式确认，`--overwrite` 跳过文件覆盖提示（`@coss/ui` 会覆盖 `utils.ts` 和 `button.tsx`，不加 `--overwrite` 会卡住等待输入）。

- `@coss/ui`：安装 button、card、avatar、dialog、tabs 等全部 UI 基础组件
- `@coss/colors-neutral`：安装 coss 中性色彩 token（CSS 变量）

---

## 步骤五：安装信息图表（AntV Infographic）

> ⚠️ **询问用户**：是否安装 AntV Infographic 信息图表支持？
> 安装后可在页面中生成精美的信息图表（276 个内置模板），用于数据展示和报告页面。
> - **安装** → 执行下方安装步骤
> - **跳过** → 直接继续步骤六

```bash
bun add @antv/infographic@0.2.19
```

> 固定版本 0.2.19，不使用 `@latest`，避免 API 变更导致兼容性问题。

**创建 `src/hooks/useInfographic.ts`：**

```tsx
import { useEffect, useRef } from "react"
import { Infographic } from "@antv/infographic"

interface UseInfographicOptions {
  syntax: string
  width?: string
  height?: string
}

export function useInfographic({ syntax, width = "100%", height = "100%" }: UseInfographicOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<Infographic | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    instanceRef.current = new Infographic({
      container: containerRef.current,
      width,
      height,
    })
    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [])

  useEffect(() => {
    instanceRef.current?.render(syntax)
  }, [syntax])

  return containerRef
}
```

**信息图语法速查：**

- 入口：`infographic <template-name>`（第一行必须是这个）
- 数据块：`data` 下的 `title`、`desc`、`lists`/`sequences`/`values`/`nodes`/`relations`/`compares`
- 主题块：`theme` 下的 `palette`（裸颜色值，不加引号不加逗号）
- 模板选择建议：步骤流程用 `sequence-*`、列举用 `list-*`、数据用 `chart-*`、对比用 `compare-*`、层级用 `hierarchy-*`、关系用 `relation-*`
- 语法文档：`https://infographic.antv.vision/learn/infographic-syntax`
- 模板画廊：`https://infographic.antv.vision/gallery`

---

## 步骤六：字体配置（自动完成）

> `@coss/colors-neutral` 已通过 `@fontsource-variable/geist` npm 包自动配置字体
> （`--font-sans`、`--font-heading`），无需手动添加 Google Fonts `<link>` 或修改 `index.css`。
> 此步骤无需任何操作，继续下一步即可。

---

## 步骤七：安装路由

> 使用 `HashRouter`，URL 含 `#`（如 `/#/about`）。可直接打开 `dist/index.html`，兼容任何静态托管。

```bash
bun add react-router-dom
```

**创建目录结构并删除 Vite 默认脚手架文件：**

```bash
mkdir -p src/pages src/components/blocks src/pages/dev
rm -f src/App.tsx src/App.css
```

**创建 `src/router.tsx`：**

> 如果步骤五安装了 Infographic，使用下方完整版（含 `/dev/charts` 路由）。
> 如果跳过了 Infographic，删除 ChartsPage 相关的 3 行（lazy import + Route + ChartsPage &&）。

```tsx
import { HashRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import HomePage from "./pages/HomePage"

const ComponentsPage = import.meta.env.DEV
  ? lazy(() => import("./pages/dev/ComponentsPage"))
  : null

const ChartsPage = import.meta.env.DEV
  ? lazy(() => import("./pages/dev/ChartsPage"))
  : null

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* 新增页面在此追加，格式：<Route path="/xxx" element={<XxxPage />} /> */}

        {import.meta.env.DEV && ComponentsPage && (
          <Route
            path="/dev/components"
            element={
              <Suspense fallback={<div className="p-8 text-muted-foreground">加载中...</div>}>
                <ComponentsPage />
              </Suspense>
            }
          />
        )}

        {import.meta.env.DEV && ChartsPage && (
          <Route
            path="/dev/charts"
            element={
              <Suspense fallback={<div className="p-8 text-muted-foreground">加载中...</div>}>
                <ChartsPage />
              </Suspense>
            }
          />
        )}
      </Routes>
    </HashRouter>
  )
}
```

**修改 `src/main.tsx`，完整替换为：**

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Router from "./router"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
```

**修改 `package.json` 的 `build` 脚本**：

```json
"build": "tsc -b && vite build"
```

**创建 `src/pages/dev/ComponentsPage.tsx` 占位文件：**

```tsx
export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-muted-foreground">组件预览页未生成</h1>
        <p className="mt-4 text-muted-foreground">如需生成，请让 AI 执行附录中的组件展示页生成规则</p>
      </div>
    </main>
  )
}
```

**如果步骤五安装了 Infographic，创建 `src/pages/dev/ChartsPage.tsx` 占位文件：**

```tsx
export default function ChartsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-muted-foreground">图表展示页未生成</h1>
        <p className="mt-4 text-muted-foreground">如需生成，请让 AI 执行附录中的图表展示页生成规则</p>
      </div>
    </main>
  )
}
```

> ⚠️ **询问用户**：
>
> **组件展示页**（coss UI 组件）：
> - **完整展示**：所有组件的所有 variant、size、状态和交互示例（约 2-3 分钟）
> - **极简展示**：所有组件各一个默认示例（约 30 秒）
> - **不生成**：保留占位文件，后续可随时让 AI 生成
>
> **图表展示页**（AntV Infographic 信息图，仅安装了 Infographic 时出现此选项）：
> - **生成**：每类 2-3 个代表性图表示例（约 1 分钟）
> - **不生成**：保留占位文件，后续可随时让 AI 生成
>
> - 用户选择**完整展示** → 按附录中"完整展示规则"执行，替换占位文件
> - 用户选择**极简展示** → 按附录中"极简展示规则"执行，替换占位文件
> - 用户选择**不生成** → 保留占位文件，跳过附录，继续步骤八
> - 图表展示**生成** → 按附录中"图表展示页生成规则"执行，替换占位文件
> - 图表展示**不生成** → 保留占位文件

---

## 步骤八：创建首页

**创建 `src/pages/HomePage.tsx`：**

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          项目已就绪
        </h1>
        <p className="mt-4 text-muted-foreground">开始构建你的页面</p>
      </div>
    </main>
  )
}
```

> HomePage 是占位页，创建后应替换为实际业务页面。

**页面布局建议（不同页面类型使用不同布局）：**

- **内容页**（关于、定价、文章）：`container mx-auto max-w-4xl px-4 py-8` — 居中窄版，适合阅读
- **大盘/数据页**（图表、报表、看板）：`w-full px-4 py-6` — 全宽布局，充分利用屏幕空间
- **列表页**（表格、卡片列表）：`container mx-auto max-w-7xl px-4 py-6` — 居中宽版，平衡阅读和数据密度

```tsx
// 大盘/数据页示例
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="w-full px-4 py-6 space-y-4">
        {/* 图表和数据的 grid 布局 */}
      </div>
    </main>
  )
}
```

---

## 步骤九：验证项目可正常运行

```bash
bun dev
```

打开浏览器访问 `http://localhost:5173`，看到"项目已就绪"即为成功。

若页面空白或报错，按以下顺序排查：
1. `src/main.tsx` 是否正确 import 了 `Router` 和 `./index.css`
2. `tsconfig.json` 和 `tsconfig.app.json` 是否都加了 `paths` 配置及 `"ignoreDeprecations": "6.0"`
3. `components.json` 是否存在于项目根目录
4. `bun run build` 是否通过（`tsc -b` 类型检查 + `vite build` 打包）

---

## 最终目录结构

```
<项目名>/
├── src/
│   ├── components/
│   │   ├── ui/          ← shadcn + coss 自动生成，禁止手动修改
│   │   └── blocks/      ← 业务区块组件（Hero、FeatureList 等）
│   ├── pages/           ← 每个页面一个文件
│   │   ├── dev/         ← 开发专属页面（构建时不打包）
│   │   │   ├── ComponentsPage.tsx  ← coss 组件展示
│   │   │   └── ChartsPage.tsx      ← 图表展示（仅安装了 Infographic 时存在）
│   │   └── HomePage.tsx
│   ├── hooks/
│   │   ├── use-media-query.ts      ← shadcn 自动生成
│   │   └── useInfographic.ts       ← 信息图表 hook（仅安装了 Infographic 时存在）
│   ├── lib/
│   │   └── utils.ts     ← shadcn 自动生成，禁止手动修改
│   ├── router.tsx       ← 路由配置，新增页面只改这里
│   ├── main.tsx         ← 入口，创建后不再修改
│   └── index.css        ← 全局样式，创建后不再修改
├── public/
├── index.html
├── components.json      ← shadcn 配置，不要修改
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
└── package.json
```

---

## 禁止操作清单

| 禁止项 | 原因 |
|--------|------|
| 使用 `npm`、`yarn`、`pnpm` | 统一使用 `bun` |
| 选择 JavaScript 模板 | 必须使用 TypeScript（`react-ts`） |
| 安装 `postcss`、`autoprefixer` | Tailwind v4 不需要 |
| 使用 `bunx shadcn@latest init @coss/style` | 会写入 `layout.tsx`，Next.js 专用 |
| 手动修改 `src/components/ui/` 下的文件 | 由 shadcn CLI 管理 |
| 修改 `src/main.tsx`（创建完成后） | 入口文件不应含业务逻辑 |
| 使用 echarts、recharts 等其他图表库 | 统一使用 `@antv/infographic` |
| 在组件中直接 `new Infographic()` | 统一通过 `useInfographic` hook |

---

## 附录：开发专属组件预览页（构建时自动排除）

> ⚠️ ComponentsPage.tsx **必须创建**，否则 `tsc -b` 会报 `Cannot find module` 错误。
> TypeScript 会静态解析所有 `import()` 调用，即使它们被 `import.meta.env.DEV` 条件包裹。
> 文件内容在构建时会被 treeshake 掉，dist/ 中不会包含。

### 重要：coss 组件 API 与标准 shadcn 不同

coss 基于 `@base-ui/react` 而非 Radix，部分组件 API 有差异：
- **Alert**: 错误变体是 `variant="error"`（不是 `"destructive"`），有效值：`default`、`error`、`info`、`success`、`warning`
- **Slider**: `onValueChange` 签名为 `(value: number | readonly number[], eventDetails) => void`，不能直接传入 `setState`
- 其他组件 API 以实际安装的 `src/components/ui/` 文件为准，不要按标准 shadcn 文档猜测

### 设计目标

- 开发时访问 `http://localhost:5173/#/dev/components` 可查看所有已安装的 coss 组件
- 开发时访问 `http://localhost:5173/#/dev/charts` 可查看信息图表示例（仅安装了 Infographic 时可用）
- 运行 `bun run build` 时该页面**完全不参与打包**，dist/ 中零体积
- 不需要任何额外 exclude 配置，依靠 Vite + Rollup treeshaking 自动实现

### 实现原理

Vite 内置 `import.meta.env.DEV` 变量：
- `bun dev` 时为 `true`
- `bun run build` 时为 `false`，且 Rollup 会 treeshake 掉 false 分支的所有 import

`router.tsx` 已在步骤六中配置了 `React.lazy` 方案，无需额外修改。

### 组件展示页生成规则（根据用户选择执行）

> 根据用户选择执行对应规则：
> - **完整展示** → 执行下方"完整展示规则"
> - **极简展示** → 执行下方"极简展示规则"
> - **不生成** → 跳过，保留占位文件

#### 完整展示规则（仅在用户选择完整展示时执行）

> ⚠️ **此步骤必须立即生成完整的组件展示代码，不得留下占位符或"待补充"。**
> 执行流程：读取 `src/components/ui/` 所有组件文件 → 按需访问 coss.com 文档获取 API 细节 → 生成完整 JSX 写入文件。
> 生成的文件应包含所有已安装组件的展示，不可省略任何组件。

创建 `src/pages/dev/ComponentsPage.tsx`，参考 [coss.com](https://coss.com/ui/docs/components) 的展示风格，
展示 `src/components/ui/` 下**所有**已安装的组件。

#### 执行步骤（当前会话中完成，不可跳过）

1. 列出 `src/components/ui/` 下所有 `.tsx` 文件（每个文件是一个组件模块）
2. 逐个读取每个文件，提取：
   - 导出的子组件名称（如 `Button`、`DialogPopup`、`CardPanel`、`AccordionItem`）
   - `variant` 属性及所有可选值（从 `cva` 定义的 `variants.variant` 对象中读取所有 key）
   - `size` 属性及所有可选值（从 `cva` 定义的 `variants.size` 对象中读取所有 key）
   - 其他重要 props（`disabled`、`loading`、`checked`、`defaultChecked`、`defaultOpen`、`aria-invalid` 等）
3. 对不确定的 API，访问 `https://coss.com/ui/docs/components/{name}.md` 获取准确信息
   （如 `button.md`、`dialog.md`、`alert.md`）。完整索引：`https://coss.com/ui/llms.txt`
4. 按下方规则为每个组件生成展示区块，将所有展示代码写入 `src/pages/dev/ComponentsPage.tsx`

#### 展示规则（参考 coss.com 每个组件页面的 Examples 部分）

**Variant 展示**：有 `variant` 属性的组件，为每个 variant 值生成一个独立示例。
例如 Button 需展示：Default / Outline / Secondary / Destructive / Destructive-Outline / Ghost / Link。

**Size 展示**：有 `size` 属性的组件，展示所有尺寸。
例如 Button 需展示：xs / sm / default / lg / xl，以及 icon-xs / icon-sm / icon / icon-lg / icon-xl。

**静态状态**：展示 disabled 状态（所有支持 disabled 的组件）。

**交互示例**（使用 `useState` 实现可操作的动态效果）：
- **Button loading**: `onClick` → `setLoading(true)` → `setTimeout` 1s → `setLoading(false)`
- **Switch**: `checked` + `onCheckedChange` 切换开关
- **Slider**: `value` + `onValueChange` 拖拽，旁边显示当前值（用 `Array.isArray(v) ? v : [v]` 处理回调值）
- **Progress**: 带 `+10` / `-10` 按钮控制进度变化
- **Checkbox**: `checked` + `onCheckedChange` 切换，另展示一个 indeterminate 状态
- **Input**: `value` + `onChange` 受控输入，实时显示输入内容；始终指定 `type` 属性
- **Tabs**: 切换 tab 展示不同面板内容
- **Dialog**: `DialogTrigger render={<Button variant="outline" />}` → `DialogPopup` → `DialogHeader`(`DialogTitle` + `DialogDescription`) → `DialogPanel` → `DialogFooter`(`DialogClose render={<Button variant="ghost" />}` + `Button`)
- **Toast**: 触发按钮弹出 toast 通知

**复合组件**（参考 coss 官方 composition patterns）：
- **Dialog**: 使用 `render` prop 而非 `asChild`：`DialogTrigger render={<Button variant="outline" />}`，`DialogClose render={<Button variant="ghost" />}`
- **Card**: `Card` → `CardHeader`(`CardTitle` + `CardDescription`) → `CardPanel` → `CardFooter`
- **Accordion**: `Accordion` → `AccordionItem` → `AccordionTrigger` + `AccordionPanel`
- **Alert**: 每个 variant 各一个 `Alert` + `AlertTitle` + `AlertDescription`；其中一个展示带 `AlertAction` 的用法；语义图标（如 `InfoIcon`）不加 `aria-hidden`
- **Select**: 可传 `items` prop：`Select items={...}` → `SelectTrigger`(`SelectValue`) → `SelectPopup` → `SelectItem key={item.value} value={item}`
- **Menu**: `Menu` → `MenuTrigger render={<Button variant="outline" />}` → `MenuPopup` → `MenuItem`

**图标示例**：Button、Badge 各展示一个带 lucide-react 图标的示例（如 `PlusIcon`、`CheckIcon`、`DownloadIcon`）。
- 装饰性图标加 `aria-hidden="true"`
- Alert 中的语义图标不加 `aria-hidden`
- 不要给图标传 `size` prop，使用默认尺寸或 Tailwind class（如 `className="size-4"`）

#### 页面布局

- 固定顶栏：`sticky top-0 z-10 border-b bg-card`，内含标题 + `<Badge variant="outline">仅开发环境</Badge>`
- 内容区：`container mx-auto px-6 py-8 space-y-12`
- 每个组件用 `<section>` 包裹，`<h2>` 中英文标题 + `text-muted-foreground text-sm` 说明
- 示例组件用 `flex flex-wrap gap-3` 排列，需要纵向堆叠时用 `space-y-3`
- 区块间用 `<Separator />` 分隔
- 使用 `bg-background`、`text-foreground`、`text-muted-foreground` 等语义色 token，不要用原始颜色值（如 `text-gray-500`）
- 不要用 `border-border` class（全局已设置），直接用 `border-b`

#### coss API 关键差异（必须遵守，不要按标准 shadcn/Radix 文档猜测）

| 组件 | 标准 shadcn 常用写法 | coss 实际 API |
|------|---------------------|--------------|
| Trigger 模式 | `asChild` | `render` prop（如 `DialogTrigger render={<Button />}`）|
| Alert variant | `"destructive"` | `"error"`（有效值：`default` / `error` / `info` / `success` / `warning`）|
| Slider onValueChange | `Dispatch<SetStateAction>` | `(value: number \| readonly number[], eventDetails) => void`，不能直接传 `setState` |
| Button variants | 6 个 | 7 个（多了 `destructive-outline`）|
| Button sizes | `sm` / `default` / `lg` | `xs` / `sm` / `default` / `lg` / `xl` + `icon-xs` / `icon-sm` / `icon` / `icon-lg` / `icon-xl` |
| Badge variants | 4 个 | 8 个（多了 `error` / `info` / `success` / `warning`）|
| Dialog 子组件 | `DialogContent` | `DialogPopup`（别名 `DialogContent`）|
| Card 子组件 | `CardContent` | `CardPanel`（别名 `CardContent`）|
| Tabs 子组件 | `TabsTrigger` / `TabsContent` | `TabsTab` / `TabsPanel`（别名 `TabsTrigger` / `TabsContent`）|
| Tabs.List | 无 variant | 有 `variant`: `"default"` / `"underline"` |
| Alert 子组件 | 无 Action | 多了 `AlertAction`（放置操作按钮）|
| Select items | 手动渲染 children | 可传 `items` prop + `SelectItem value={item}` |
| Menu onSelect | `onSelect` | `onClick` |
| 其他 | — | **以 `src/components/ui/` 文件和 `coss.com/ui/docs/components/{name}.md` 为准** |

#### 极简展示规则（仅在用户选择极简展示时执行）

覆盖所有已安装组件，每个组件仅展示一个默认状态的最简实例。
不使用 useState，不展示 variant 变体、size 变体、交互效果。

**执行步骤：**

1. 列出 `src/components/ui/` 下所有 `.tsx` 文件
2. 逐个读取，找到主导出组件名称和最简用法
3. 为每个组件生成一个最简 JSX 实例，写入 `src/pages/dev/ComponentsPage.tsx`

**各类组件最简示例：**

- 按钮/徽标：`<Button>Button</Button>` / `<Badge>Badge</Badge>`
- 表单输入：`<Input type="text" placeholder="Input" />` / `<Textarea placeholder="Textarea" />`
- 开关/复选：`<Switch />` / `<Checkbox />`
- 进度/滑块：`<Progress value={50} />` / `<Slider defaultValue={[50]} />`
- 骨架屏/分隔线：`<Skeleton className="h-4 w-32" />` / `<Separator />`
- 卡片：`<Card><CardPanel>Content</CardPanel></Card>`
- 提示：`<Alert><AlertTitle>Title</AlertTitle><AlertDescription>Desc</AlertDescription></Alert>`
- 弹窗：`<Dialog><DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger><DialogPopup><DialogPanel>Content</DialogPanel></DialogPopup></Dialog>`
- 标签页：`<Tabs defaultValue="a"><TabsList><TabsTab value="a">A</TabsTab></TabsList><TabsPanel value="a">Content</TabsPanel></Tabs>`
- 手风琴：`<Accordion><AccordionItem value="a"><AccordionTrigger>Title</AccordionTrigger><AccordionPanel>Content</AccordionPanel></AccordionItem></Accordion>`
- 下拉菜单：`<Menu><MenuTrigger render={<Button variant="outline" />}>Open</MenuTrigger><MenuPopup><MenuItem>Item</MenuItem></MenuPopup></Menu>`
- 选择器：`<Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectPopup><SelectItem value="a">A</SelectItem></SelectPopup></Select>`

**页面布局**：与完整展示相同（固定顶栏 + section + h2 中英文标题 + flex wrap gap-3 + Separator 分隔）。

**coss API 关键差异**（必须遵守）：

- Trigger 用 `render` prop（不是 `asChild`）
- Alert variant 用 `"error"`（不是 `"destructive"`）
- 子组件命名：`DialogPopup` / `CardPanel` / `TabsTab`（不是 `DialogContent` / `CardContent` / `TabsTrigger`）
- Slider `defaultValue` 用数组 `[50]`（不是数字 `50`）
- 其他以 `src/components/ui/` 文件实际导出为准

### 图表展示页生成规则（仅在用户选择生成时执行）

> 以下步骤仅在用户确认要生成图表展示页时执行。若用户选择跳过，保留步骤七中创建的占位文件即可。

> ⚠️ **此步骤必须立即生成完整的图表展示代码，不得留下占位符或"待补充"。**
> 生成的文件应包含 7 大类别各 2-3 个代表性图表示例，不可省略任何类别。

创建 `src/pages/dev/ChartsPage.tsx`，展示 AntV Infographic 的 7 大类别图表示例。

#### 执行步骤（当前会话中完成，不可跳过）

1. 参考下方类别与代表模板列表
2. 为每个类别选 2-3 个代表性模板
3. 使用 `useInfographic` hook 生成每个图表
4. 按页面布局组织所有示例，写入 `src/pages/dev/ChartsPage.tsx`

#### 7 大类别与代表模板

| 类别 | 代表模板 | 适用场景 |
|------|---------|---------|
| List（列表） | `list-row-horizontal-icon-arrow`、`list-grid-badge-card`、`list-column-vertical-icon-arrow` | 功能清单、要点列举 |
| Sequence（序列） | `sequence-ascending-steps`、`sequence-timeline-simple`、`sequence-roadmap-vertical-simple` | 步骤流程、时间线、路线图 |
| Chart（图表） | `chart-column-simple`、`chart-pie-compact-card`、`chart-line-plain-text` | 数据对比、占比、趋势 |
| Comparison（对比） | `compare-swot`、`compare-binary-horizontal-simple-fold`、`compare-quadrant-quarter-simple-card` | SWOT、方案对比、象限分析 |
| Hierarchy（层级） | `hierarchy-tree-curved-line-rounded-rect-node`、`hierarchy-structure` | 组织结构、思维导图 |
| Relation（关系） | `relation-dagre-flow-tb-simple-circle-node`、`relation-dagre-flow-tb-badge-card` | 系统架构、流程依赖 |
| Quadrant（象限） | `compare-quadrant-quarter-simple-card`、`compare-quadrant-quarter-circular` | 优先级分析、四象限 |

#### 每个图表示例的结构

```tsx
import { useInfographic } from "@/hooks/useInfographic"

// 每个示例一个独立组件或一个 section 内的 div
function ListExample() {
  const chartRef = useInfographic({
    syntax: `
infographic list-row-horizontal-icon-arrow
data
  title 产品增长要点
  lists
    - label 获客
      desc 多渠道投放
      icon rocket
    - label 转化
      desc 优化路径
      icon chart line
    - label 复购
      desc 会员运营
      icon repeat
theme
  palette #3b82f6 #8b5cf6 #f97316
    `,
    height: "300px",
  })
  return <div ref={chartRef} className="w-full" />
}
```

#### 信息图语法核心规则

- 第一行必须是 `infographic <template-name>`
- `data` 块使用两个空格缩进，键值对用空格分隔
- 列表数据用 `lists`、序列用 `sequences`、统计用 `values`、层级用 `root`/`children`、关系用 `nodes`/`relations`
- `icon` 使用语义关键词（空格分隔，不用短横线），如 `rocket`、`chart line`、`shield check`
- `palette` 颜色值裸写，不加引号不加逗号：`palette #3b82f6 #8b5cf6 #f97316`
- `value` 尽量使用纯数值，单位放在 `label` 或 `desc` 中
- 完整语法参考：`https://infographic.antv.vision/learn/infographic-syntax`
- 模板画廊：`https://infographic.antv.vision/gallery`

#### 页面布局

- 固定顶栏：`sticky top-0 z-10 border-b bg-card`，标题 "图表展示" + `<Badge variant="outline">仅开发环境</Badge>`
- 内容区：`container mx-auto px-6 py-8 space-y-12`
- 每个类别用 `<section>` 包裹，`<h2>` 中英文标题
- 每个图表示例用 `space-y-2`，标题 + `useInfographic` 渲染区域
- 区块间用 `<Separator />` 分隔
- 使用 `bg-background`、`text-foreground`、`text-muted-foreground` 等语义色 token

### 验证构建产物不含预览页

```bash
bun run build
grep -r "ComponentsPage\|ChartsPage\|dev/components\|dev/charts\|仅开发环境" dist/
# 输出为空 → 确认构建产物中完全不含预览页内容
```

### 部署到阿里云 OSS

1. 在 OSS 控制台创建 Bucket，开启「静态网站」功能
2. 默认首页：`index.html`
3. 上传 `dist/` 目录下所有文件到 Bucket 根目录
4. 访问 Bucket 的静态网站域名即可

> `base: "./"` 确保所有资源使用相对路径（`./assets/...`），
> 无论 Bucket 是否绑定自定义域名、是否处于子路径，都能正常加载。

### 目录结构更新

```
src/
├── hooks/
│   ├── use-media-query.ts
│   └── useInfographic.ts          ← 信息图表 hook（仅安装了 Infographic 时存在）
├── pages/
│   ├── dev/
│   │   ├── ComponentsPage.tsx      ← 开发专属，构建时不打包
│   │   └── ChartsPage.tsx          ← 开发专属，构建时不打包（仅安装了 Infographic 时存在）
│   └── HomePage.tsx
└── router.tsx                      ← 用 import.meta.env.DEV + lazy 控制加载
```

### 禁止操作

- 禁止在任何业务页面中 `import ComponentsPage` 或 `import ChartsPage`（会导致进入生产包）
- 禁止修改 `ComponentsPage.tsx` 中的路由路径（保持 `/dev/components`）
- 禁止修改 `ChartsPage.tsx` 中的路由路径（保持 `/dev/charts`）
- 禁止将 `src/pages/dev/` 目录下的文件在业务逻辑中引用