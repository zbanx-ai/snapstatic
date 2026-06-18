# 开发规范

> 供 AI 读取。在已创建的项目中开发页面和组件时遵守以下规范。
> 核心原则：**优先做出好看、合理的页面**，规范是为了保证效果，不是为了限制创意。

---

## 1. 页面设计原则

### 1.1 视觉层次

每个页面必须有清晰的主次关系：

```
主标题（text-3xl～5xl font-bold）
  └─ 副标题或描述（text-lg text-muted-foreground）
      └─ 正文内容（text-base text-foreground）
          └─ 辅助信息（text-sm text-muted-foreground）
```

英雄区（Hero Section）的标准结构：

```tsx
<section className="py-20 text-center">
  <Badge variant="secondary" className="mb-4">新功能上线</Badge>
  <h1 className="text-5xl font-bold tracking-tight mb-4">
    打动人心的主标题
  </h1>
  <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
    简洁有力的副标题，一两句话说清核心价值
  </p>
  <div className="flex gap-3 justify-center">
    <Button size="lg">主要行动</Button>
    <Button size="lg" variant="outline">次要行动</Button>
  </div>
</section>
```

### 1.2 布局选择

根据内容类型选择合适的容器宽度：

```tsx
// 阅读型页面（文章、关于、定价）
<div className="container mx-auto max-w-4xl px-4 py-8">

// 数据型页面（报表、看板）  
<div className="w-full px-6 py-6 space-y-6">

// 通用型页面（落地页、产品介绍）
<div className="container mx-auto max-w-6xl px-4 py-8">
```

### 1.3 间距节奏

页面各区块之间保持一致的间距节奏：

```tsx
// 页面级区块间距
<main className="space-y-24">   // 大区块间距 96px
  <HeroSection />
  <FeaturesSection />
  <TestimonialsSection />
</main>

// 区块内部间距
<section className="py-16">
  <div className="space-y-12">  // 小区块间距 48px
    ...
  </div>
</section>
```

### 1.4 配色使用

始终使用语义色 token，不用原始颜色值：

```
bg-background        页面背景
bg-card              卡片背景
text-foreground      主要文字
text-muted-foreground 次要文字
border               边框（无需加 border-border）
bg-primary           强调色背景
text-primary         强调色文字
bg-destructive       危险/错误
```

渐变背景（用于 Hero 区或装饰）：

```tsx
// 微妙的顶部渐变
<div className="bg-gradient-to-b from-primary/5 to-background">

// 卡片渐变边框效果
<div className="rounded-xl border bg-gradient-to-br from-card to-muted/30 p-6">
```

---

## 2. 常用页面区块

### 2.1 数据展示区（指标卡片）

```tsx
const metrics = [
  { label: "客户满意度", value: "98%", change: "+3%", icon: HeartIcon },
  { label: "项目完成数", value: "1,240", change: "+18%", icon: CheckCircleIcon },
  { label: "响应时间", value: "< 2h", change: "-30min", icon: ClockIcon },
]

<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  {metrics.map((m) => (
    <Card key={m.label}>
      <CardPanel className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{m.label}</span>
          <m.icon aria-hidden="true" className="size-4 text-muted-foreground" />
        </div>
        <div className="text-3xl font-bold">{m.value}</div>
        <div className="text-sm text-green-600 mt-1">{m.change} 较上期</div>
      </CardPanel>
    </Card>
  ))}
</div>
```

### 2.2 功能特性区（图标 + 文字）

```tsx
const features = [
  { icon: ZapIcon, title: "极速响应", desc: "毫秒级响应，给用户流畅体验" },
  { icon: ShieldCheckIcon, title: "安全可靠", desc: "企业级数据加密，保护您的隐私" },
  { icon: SparklesIcon, title: "智能分析", desc: "AI 驱动，自动生成洞察报告" },
]

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {features.map((f) => (
    <div key={f.title} className="flex flex-col gap-3 p-6 rounded-xl border bg-card">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
        <f.icon aria-hidden="true" className="size-5 text-primary" />
      </div>
      <h3 className="font-semibold">{f.title}</h3>
      <p className="text-sm text-muted-foreground">{f.desc}</p>
    </div>
  ))}
</div>
```

### 2.3 时间线 / 步骤区

```tsx
const steps = [
  { num: "01", title: "提交需求", desc: "填写需求表单，描述您的目标" },
  { num: "02", title: "方案设计", desc: "专家团队制定定制化解决方案" },
  { num: "03", title: "交付上线", desc: "快速实施，验收后正式上线" },
]

<div className="relative">
  {/* 连接线 */}
  <div className="absolute left-6 top-8 bottom-8 w-px bg-border hidden md:block" />
  <div className="space-y-8">
    {steps.map((s) => (
      <div key={s.num} className="flex gap-6 items-start">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm z-10">
          {s.num}
        </div>
        <div className="pt-2">
          <h3 className="font-semibold mb-1">{s.title}</h3>
          <p className="text-muted-foreground text-sm">{s.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>
```

### 2.4 表格展示

```tsx
<div className="rounded-xl border overflow-hidden">
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50">
        <TableHead>项目名称</TableHead>
        <TableHead>状态</TableHead>
        <TableHead>负责人</TableHead>
        <TableHead className="text-right">完成度</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id}>
          <TableCell className="font-medium">{row.name}</TableCell>
          <TableCell>
            <Badge variant={row.status === "完成" ? "success" : "warning"}>
              {row.status}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarFallback className="text-xs">{row.owner[0]}</AvatarFallback>
              </Avatar>
              {row.owner}
            </div>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
              <Progress value={row.progress} className="w-20" />
              <span className="text-sm text-muted-foreground w-8">{row.progress}%</span>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
```

### 2.5 Tabs 内容切换

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">概览</TabsTab>
    <TabsTab value="details">详情</TabsTab>
    <TabsTab value="history">历史</TabsTab>
  </TabsList>
  <TabsPanel value="overview" className="mt-6">
    {/* 内容 */}
  </TabsPanel>
  <TabsPanel value="details" className="mt-6">
    {/* 内容 */}
  </TabsPanel>
  <TabsPanel value="history" className="mt-6">
    {/* 内容 */}
  </TabsPanel>
</Tabs>
```

---

## 3. 组件用法

### 3.1 coss 与 shadcn 的关键差异

coss 基于 Base UI，以下地方与标准 shadcn 不同，写代码时以 `src/components/ui/` 下实际文件为准：

| 场景 | 标准 shadcn | coss 实际写法 |
|------|------------|--------------|
| Dialog/Menu 触发 | `asChild` | `render={<Button />}` |
| Alert 错误 variant | `"destructive"` | `"error"` |
| Card 内容区 | `CardContent` | `CardPanel`（`CardContent` 是别名也可用）|
| Tabs 子组件 | `TabsTrigger` / `TabsContent` | `TabsTab` / `TabsPanel` |
| Slider 回调值 | `number[]` | `number \| readonly number[]` |

### 3.2 常用组合写法

**Dialog：**
```tsx
<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>打开</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>标题</DialogTitle>
      <DialogDescription>描述信息</DialogDescription>
    </DialogHeader>
    <DialogPanel>内容区域</DialogPanel>
    <DialogFooter>
      <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
      <Button>确认</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

**Card：**
```tsx
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>副标题</CardDescription>
  </CardHeader>
  <CardPanel>内容</CardPanel>
  <CardFooter>底部</CardFooter>
</Card>
```

**Alert（含状态 variant）：**
```tsx
// variant 可选：default / error / info / success / warning
<Alert variant="success">
  <CheckCircleIcon />
  <AlertTitle>操作成功</AlertTitle>
  <AlertDescription>数据已保存</AlertDescription>
</Alert>
```

**Menu：**
```tsx
<Menu>
  <MenuTrigger render={<Button variant="outline" />}>操作</MenuTrigger>
  <MenuPopup>
    <MenuItem onClick={handleEdit}>编辑</MenuItem>
    <MenuItem onClick={handleDelete}>删除</MenuItem>
  </MenuPopup>
</Menu>
```

**Select：**
```tsx
const options = [
  { label: "选项 A", value: "a" },
  { label: "选项 B", value: "b" },
]
<Select items={options}>
  <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
  <SelectPopup>
    {options.map((o) => (
      <SelectItem key={o.value} value={o}>{o.label}</SelectItem>
    ))}
  </SelectPopup>
</Select>
```

**Badge 状态色（coss 多了 4 个语义 variant）：**
```tsx
<Badge variant="success">已完成</Badge>
<Badge variant="warning">进行中</Badge>
<Badge variant="error">已失败</Badge>
<Badge variant="info">待审核</Badge>
```

### 3.3 图标使用

项目使用 `lucide-react`，按需具名导入：

```tsx
import { ZapIcon, ShieldCheckIcon, ChevronRightIcon } from "lucide-react"
```

图标尺寸用 Tailwind class，不用数字 prop：

```tsx
// 小图标（行内、Badge 内）
<ZapIcon className="size-3" />

// 标准图标（Button 内、列表内）
<ZapIcon className="size-4" />

// 大图标（特性区、空状态）
<ZapIcon className="size-6" />

// 超大图标（Hero 区装饰）
<ZapIcon className="size-12 text-primary/60" />
```

装饰性图标（有旁边文字说明的）加 `aria-hidden="true"`：
```tsx
<Button>
  <PlusIcon aria-hidden="true" />
  新增项目
</Button>
```

---

## 4. 信息图表（AntV Infographic）

> 仅安装了 `@antv/infographic` 的项目适用。

### 4.1 使用方式

```tsx
import { useInfographic } from "@/hooks/useInfographic"

function MyChart() {
  const chartRef = useInfographic({
    syntax: `infographic sequence-ascending-steps
data
  title 项目交付流程
  sequences
    - label 需求分析
      desc 明确目标和范围
    - label 方案设计
      desc 制定技术路线
    - label 开发测试
      desc 迭代交付
    - label 正式上线
      desc 验收部署`,
    height: "280px",
  })
  return <div ref={chartRef} className="w-full rounded-xl border p-2" />
}
```

### 4.2 模板速查（按场景选）

| 场景 | 推荐模板 |
|------|---------|
| 步骤 / 流程 | `sequence-ascending-steps`、`sequence-roadmap-vertical-simple` |
| 时间线 | `sequence-timeline-simple` |
| 要点列举 | `list-row-horizontal-icon-arrow`、`list-grid-badge-card` |
| 数据对比柱状 | `chart-column-simple` |
| 占比饼图 | `chart-pie-compact-card` |
| 趋势折线 | `chart-line-plain-text` |
| SWOT 分析 | `compare-swot` |
| 双方对比 | `compare-binary-horizontal-simple-fold` |
| 组织架构 | `hierarchy-structure` |
| 流程节点 | `relation-dagre-flow-tb-simple-circle-node` |

模板画廊：https://infographic.antv.vision/gallery

### 4.3 语法要点

```
第一行：infographic <模板名>
data
  title  页面标题
  lists  列表数据（list-* 模板）
  sequences  序列数据（sequence-* 模板）
  values  统计数据（chart-* 模板）
  nodes + relations  关系数据（relation-* 模板）
theme
  palette #3b82f6 #8b5cf6 #f97316   # 颜色裸写，空格分隔，不加引号和逗号
```

---

## 5. 新增页面流程

每次新增一个页面，只做两件事：

**① 在 `src/pages/` 创建页面文件**

```tsx
// src/pages/AboutPage.tsx
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* 页面内容 */}
      </div>
    </main>
  )
}
```

**② 在 `src/router.tsx` 注册路由**

```tsx
import AboutPage from "./pages/AboutPage"

// 在 Routes 内追加：
<Route path="/about" element={<AboutPage />} />
```

完成后 `bun dev` 验证，访问 `http://localhost:5173/#/about`。

---

## 6. 页面导航（多页面项目）

多个页面时，在页面顶部加导航栏：

```tsx
// src/components/blocks/Navbar.tsx
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "首页", path: "/" },
  { label: "产品介绍", path: "/products" },
  { label: "案例展示", path: "/cases" },
  { label: "关于我们", path: "/about" },
]

export default function Navbar() {
  const { pathname } = useLocation()

  // HashRouter 下的路径是 hash 部分，需要用 hash 判断
  const hash = window.location.hash.replace("#", "") || "/"

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-lg">品牌名称</div>
        <nav className="flex gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm transition-colors",
                hash === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

在需要导航的页面引入：

```tsx
import Navbar from "@/components/blocks/Navbar"

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        ...
      </main>
    </>
  )
}
```

---

## 7. 常见美化技巧

### 7.1 卡片悬停效果

```tsx
<Card className="transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
```

### 7.2 渐变文字标题

```tsx
<h1 className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent text-5xl font-bold">
  打动人心的标题
</h1>
```

### 7.3 带背景的区块间隔

```tsx
// 深色区块（穿插在白色区块中间，形成节奏感）
<section className="bg-muted/40 py-16">
  ...
</section>
```

### 7.4 图标背景圆圈

```tsx
<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
  <ZapIcon className="size-6" />
</div>
```

### 7.5 数字大字展示

```tsx
<div className="text-center">
  <div className="text-6xl font-bold text-primary">98%</div>
  <div className="text-muted-foreground mt-2">客户满意度</div>
</div>
```

### 7.6 引用 / 评价块

```tsx
<blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground">
  <p className="text-lg">"这个方案完全超出了我们的预期，团队执行力一流。"</p>
  <footer className="mt-3 not-italic">
    <strong className="text-foreground">张三</strong>
    <span className="text-sm"> — 某某公司 CEO</span>
  </footer>
</blockquote>
```

---

## 8. 不要做的事（简化版）

- 不要用 `npm`/`yarn`，统一用 `bun`
- 不要手动修改 `src/components/ui/` 下的文件
- 不要用 `BrowserRouter`，统一用 `HashRouter`
- 不要在业务页面里 `import ComponentsPage` 或 `import ChartsPage`
- 不要硬编码颜色，用 Tailwind token
- Dialog/Menu 触发器用 `render={<Button />}`，不用 `asChild`
- Alert 的错误状态用 `variant="error"`，不用 `variant="destructive"`