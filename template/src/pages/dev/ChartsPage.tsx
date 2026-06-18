import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useInfographic } from "@/hooks/useInfographic"

function ChartSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
    </section>
  )
}

function ChartCard({ syntax, label, height = "280px" }: { syntax: string; label: string; height?: string }) {
  const chartRef = useInfographic({ syntax, height })
  return (
    <div className="rounded-xl border p-3 space-y-2">
      <div ref={chartRef} className="w-full" />
      <p className="text-xs text-muted-foreground text-center">{label}</p>
    </div>
  )
}

const listRowSyntax = `infographic list-row-horizontal-icon-arrow
data
  title 产品核心优势
  lists
    - icon rocket
      label 极速部署
      desc 一键部署到云端，5分钟上线
    - icon shield check
      label 安全可靠
      desc 企业级加密，99.99%可用性
    - icon chart line
      label 弹性扩展
      desc 按需扩容，自动负载均衡
    - icon lightbulb
      label 智能分析
      desc AI驱动的数据洞察
theme
  palette #1a1a2e #16213e #0f3460 #533483`

const listGridSyntax = `infographic list-grid-badge-card
data
  title 技术栈清单
  lists
    - icon code
      label React 19
      desc 前端框架
    - icon zap
      label Vite 8
      desc 构建工具
    - icon palette
      label Tailwind v4
      desc 样式框架
    - icon database
      label PostgreSQL
      desc 关系数据库
    - icon server
      label Node.js
      desc 后端运行时
    - icon cloud
      label Docker
      desc 容器化部署
theme
  palette #2d3436 #636e72 #00b894 #6c5ce7`

const sequenceStepsSyntax = `infographic sequence-ascending-steps
data
  title 项目交付流程
  sequences
    - icon clipboard list
      label 需求分析
      desc 1-2周
      value 1
    - icon pencil
      label UI设计
      desc 2-3周
      value 2
    - icon code
      label 开发实现
      desc 4-6周
      value 3
    - icon test tubes
      label 测试验证
      desc 1-2周
      value 4
    - icon rocket
      label 部署上线
      desc 1周
      value 5
theme
  palette #0f3460 #16213e #1a1a2e #533483 #e94560`

const sequenceTimelineSyntax = `infographic sequence-timeline-simple
data
  title 公司发展历程
  sequences
    - label 2019
      desc 公司成立，获天使轮融资
    - label 2020
      desc 产品上线，用户突破10万
    - label 2021
      desc 完成A轮融资，团队扩至50人
    - label 2023
      desc 营收破亿，布局海外市场
    - label 2025
      desc 上市筹备，估值超50亿
theme
  palette #6c5ce7 #a29bfe #dfe6e9 #2d3436`

const chartColumnSyntax = `infographic chart-column-simple
data
  title 季度营收对比（万元）
  values
    - label Q1
      value 320
    - label Q2
      value 480
    - label Q3
      value 560
    - label Q4
      value 720
theme
  palette #0984e3 #74b9ff #dfe6e9`

const chartPieSyntax = `infographic chart-pie-compact-card
data
  title 用户来源分布
  values
    - label 搜索引擎
      value 42
    - label 社交媒体
      value 28
    - label 直接访问
      value 18
    - label 邮件营销
      value 12
theme
  palette #e17055 #fdcb6e #00b894 #0984e3`

const compareSwotSyntax = `infographic compare-swot
data
  title 产品SWOT分析
  compares
    - label 优势 Strengths
      lists
        - label 技术壁垒高
        - label 用户粘性强
        - label 团队经验丰富
    - label 劣势 Weaknesses
      lists
        - label 品牌知名度低
        - label 资金储备有限
        - label 市场覆盖不足
    - label 机会 Opportunities
      lists
        - label 行业快速增长
        - label 政策利好支持
        - label 竞品退出市场
    - label 威胁 Threats
      lists
        - label 巨头入场竞争
        - label 用户获取成本上升
        - label 技术迭代加速
theme
  palette #00b894 #d63031 #0984e3 #fdcb6e`

const compareBinarySyntax = `infographic compare-binary-horizontal-simple-fold
data
  title 自建 vs 采购方案对比
  compares
    - label 自建方案
      lists
        - icon check
          label 完全定制化
        - icon check
          label 长期成本更低
        - icon x
          label 开发周期长
        - icon x
          label 维护成本高
    - label 采购方案
      lists
        - icon check
          label 快速上线
        - icon check
          label 专业维护
        - icon x
          label 定制受限
        - icon x
          label 持续付费
theme
  palette #00b894 #d63031 #dfe6e9`

const hierarchyStructureSyntax = `infographic hierarchy-structure
data
  title 公司组织架构
  root
    label 总裁
    children
      - label 技术部
        children
          - label 前端组
          - label 后端组
          - label 运维组
      - label 产品部
        children
          - label 产品设计
          - label 用户研究
      - label 市场部
        children
          - label 品牌推广
          - label 渠道运营
theme
  palette #2d3436 #636e72 #0984e3 #00b894 #6c5ce7`

const hierarchyTreeSyntax = `infographic hierarchy-tree-curved-line-rounded-rect-node
data
  title 产品功能模块
  root
    label 智能平台
    children
      - label 数据管理
        children
          - label 数据采集
          - label 数据清洗
          - label 数据存储
      - label 分析引擎
        children
          - label 实时监控
          - label 报表生成
          - label 预测模型
      - label 用户中心
        children
          - label 权限管理
          - label 消息通知
theme
  palette #6c5ce7 #a29bfe #dfe6e9 #2d3436`

const relationDagreSyntax = `infographic relation-dagre-flow-tb-simple-circle-node
data
  title 系统架构调用关系
  nodes
    - id gateway
      label API网关
    - id auth
      label 认证服务
    - id user
      label 用户服务
    - id order
      label 订单服务
    - id pay
      label 支付服务
    - id db
      label 数据库
  relations
    - source gateway
      target auth
    - source gateway
      target user
    - source gateway
      target order
    - source order
      target pay
    - source user
      target db
    - source order
      target db
    - source pay
      target db
theme
  palette #0984e3 #00b894 #fdcb6e #dfe6e9`

const relationFlowSyntax = `infographic relation-dagre-flow-tb-simple-circle-node
data
  title 前端构建流程
  nodes
    - id src
      label 源代码
    - id ts
      label TypeScript编译
    - id vite
      label Vite打包
    - id css
      label CSS处理
    - id dist
      label 构建产物
    - id cdn
      label CDN分发
  relations
    - source src
      target ts
    - source ts
      target vite
    - source src
      target css
    - source css
      target vite
    - source vite
      target dist
    - source dist
      target cdn
theme
  palette #e17055 #fdcb6e #00b894 #dfe6e9`

const quadrantSyntax = `infographic compare-quadrant-quarter-simple-card
data
  title 功能优先级矩阵
  compares
    - label 高价值 低成本
      lists
        - label 用户登录优化
        - label 消息推送
    - label 高价值 高成本
      lists
        - label AI推荐引擎
        - label 实时协作编辑
    - label 低价值 低成本
      lists
        - label 主题换肤
        - label 动效优化
    - label 低价值 高成本
      lists
        - label 3D可视化
        - label 语音交互
theme
  palette #00b894 #0984e3 #fdcb6e #d63031`

const quadrantSyntax2 = `infographic compare-quadrant-quarter-simple-card
data
  title 需求四象限分析
  compares
    - label 紧急且重要
      lists
        - label 安全漏洞修复
        - label 核心功能上线
    - label 重要不紧急
      lists
        - label 架构升级
        - label 技术债清理
    - label 紧急不重要
      lists
        - label UI微调
        - label 文案优化
    - label 不紧急不重要
      lists
        - label 彩蛋功能
        - label 实验性特性
theme
  palette #d63031 #0984e3 #fdcb6e #636e72`

export default function ChartsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card/80 backdrop-blur px-6 py-3">
        <h1 className="text-lg font-semibold">图表示例</h1>
        <Badge variant="outline" className="text-orange-600 border-orange-300">仅开发环境 · 构建时不打包</Badge>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-12">

        <ChartSection title="List 列表" description="要点列举、功能清单、特性介绍">
          <ChartCard syntax={listRowSyntax} label="list-row-horizontal-icon-arrow · 产品核心优势" />
          <ChartCard syntax={listGridSyntax} label="list-grid-badge-card · 技术栈清单" />
        </ChartSection>

        <Separator />

        <ChartSection title="Sequence 序列" description="步骤流程、时间线、路线图">
          <ChartCard syntax={sequenceStepsSyntax} label="sequence-ascending-steps · 项目交付流程" />
          <ChartCard syntax={sequenceTimelineSyntax} label="sequence-timeline-simple · 公司发展历程" />
        </ChartSection>

        <Separator />

        <ChartSection title="Chart 数据图" description="数值对比、占比分析、趋势变化">
          <ChartCard syntax={chartColumnSyntax} label="chart-column-simple · 季度营收对比" />
          <ChartCard syntax={chartPieSyntax} label="chart-pie-compact-card · 用户来源分布" />
        </ChartSection>

        <Separator />

        <ChartSection title="Comparison 对比" description="SWOT分析、方案对比、双向对比">
          <ChartCard syntax={compareSwotSyntax} label="compare-swot · 产品SWOT分析" height="360px" />
          <ChartCard syntax={compareBinarySyntax} label="compare-binary-horizontal-simple-fold · 自建vs采购" />
        </ChartSection>

        <Separator />

        <ChartSection title="Hierarchy 层级" description="组织架构、分类树、思维导图">
          <ChartCard syntax={hierarchyStructureSyntax} label="hierarchy-structure · 公司组织架构" height="320px" />
          <ChartCard syntax={hierarchyTreeSyntax} label="hierarchy-tree-curved-line · 产品功能模块" height="320px" />
        </ChartSection>

        <Separator />

        <ChartSection title="Relation 关系" description="系统架构、流程依赖、节点关系">
          <ChartCard syntax={relationDagreSyntax} label="relation-dagre-flow · 系统架构调用" height="320px" />
          <ChartCard syntax={relationFlowSyntax} label="relation-dagre-flow · 前端构建流程" height="320px" />
        </ChartSection>

        <Separator />

        <ChartSection title="Quadrant 象限" description="优先级矩阵、四象限决策分析">
          <ChartCard syntax={quadrantSyntax} label="compare-quadrant · 功能优先级矩阵" />
          <ChartCard syntax={quadrantSyntax2} label="compare-quadrant · 需求四象限分析" />
        </ChartSection>

      </div>
    </main>
  )
}
