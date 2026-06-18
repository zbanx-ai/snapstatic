import { Link } from "react-router-dom"
import {
  LayoutGridIcon,
  BarChart3Icon,
  RocketIcon,
  ShieldCheckIcon,
  ZapIcon,
  ArrowRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-5xl px-6 py-24 space-y-20">
          <div className="space-y-6 text-center">
            <Badge variant="outline" className="text-primary">Vite + React + TypeScript</Badge>
            <h1 className="text-5xl font-bold tracking-tight">项目已就绪</h1>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              基于 coss 组件库和 Tailwind CSS v4 搭建的完整模板项目，包含组件预览和图表示例。
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/dev/components">
                <Button size="lg">
                  <LayoutGridIcon />
                  查看组件
                </Button>
              </Link>
              <Link to="/dev/charts">
                <Button size="lg" variant="outline">
                  <BarChart3Icon />
                  查看图表
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LayoutGridIcon className="size-5" />
                </div>
                <CardTitle className="mt-3">组件预览</CardTitle>
                <CardDescription>
                  覆盖 35+ 个 coss 组件，展示所有 variant 和 size
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/dev/components" className="text-sm text-primary inline-flex items-center gap-1 hover:underline">
                  前往预览 <ArrowRightIcon className="size-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BarChart3Icon className="size-5" />
                </div>
                <CardTitle className="mt-3">图表示例</CardTitle>
                <CardDescription>
                  7 大类别 14 个 AntV Infographic 信息图表模板
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/dev/charts" className="text-sm text-primary inline-flex items-center gap-1 hover:underline">
                  前往预览 <ArrowRightIcon className="size-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <RocketIcon className="size-5" />
                </div>
                <CardTitle className="mt-3">快速开始</CardTitle>
                <CardDescription>
                  在 src/pages/ 创建页面，在 router.tsx 添加路由即可
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <span className="text-sm text-muted-foreground">bun dev 启动开发服务器</span>
              </CardFooter>
            </Card>
          </div>

          <Separator />

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">技术特性</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-3 rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5">
                <ZapIcon className="size-5 text-primary mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-medium text-sm">Vite 8 极速构建</p>
                  <p className="text-xs text-muted-foreground">毫秒级热更新</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5">
                <ShieldCheckIcon className="size-5 text-primary mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-medium text-sm">TypeScript 6.0</p>
                  <p className="text-xs text-muted-foreground">完整类型安全</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5">
                <LayoutGridIcon className="size-5 text-primary mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-medium text-sm">coss 组件库</p>
                  <p className="text-xs text-muted-foreground">54 个高质量组件</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5">
                <BarChart3Icon className="size-5 text-primary mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-medium text-sm">AntV Infographic</p>
                  <p className="text-xs text-muted-foreground">276 个图表模板</p>
                </div>
              </div>
            </div>
          </div>

          <Alert variant="info">
            <ZapIcon />
            <AlertTitle>开发环境专属</AlertTitle>
            <AlertDescription>
              组件预览页和图表示例页仅在开发环境可访问，生产构建时完全不打包。
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </main>
  )
}
