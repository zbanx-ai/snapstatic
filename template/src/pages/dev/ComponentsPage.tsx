import { useState } from "react"
import {
  StarIcon,
  SettingsIcon,
  SearchIcon,
  MailIcon,
  BellIcon,
  InfoIcon,
  TriangleAlertIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  ChevronDownIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  HomeIcon,
  CalendarDaysIcon,
  FileTextIcon,
  PlusIcon,
  TrashIcon,
  EditIcon,
  CopyIcon,
  DownloadIcon,
  ShareIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, Radio } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressIndicator,
  ProgressValue,
} from "@/components/ui/progress"
import { Meter, MeterLabel, MeterTrack, MeterIndicator, MeterValue } from "@/components/ui/meter"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Card, CardHeader, CardTitle, CardDescription, CardPanel, CardFooter,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionPanel,
} from "@/components/ui/accordion"
import {
  Dialog, DialogTrigger, DialogPopup, DialogHeader, DialogTitle,
  DialogDescription, DialogPanel, DialogFooter,
} from "@/components/ui/dialog"
import {
  Sheet, SheetTrigger, SheetPopup, SheetHeader, SheetTitle,
  SheetDescription, SheetPanel, SheetFooter,
} from "@/components/ui/sheet"
import {
  Menu, MenuTrigger, MenuPopup, MenuItem, MenuSeparator,
  MenuCheckboxItem, MenuGroupLabel, MenuGroup,
} from "@/components/ui/menu"
import {
  Select, SelectTrigger, SelectValue, SelectPopup, SelectItem,
} from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverPopup } from "@/components/ui/popover"
import { Tooltip, TooltipTrigger, TooltipPopup } from "@/components/ui/tooltip"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext,
} from "@/components/ui/pagination"
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {
  Drawer, DrawerTrigger, DrawerPopup, DrawerHeader, DrawerTitle,
  DrawerDescription, DrawerPanel,
} from "@/components/ui/drawer"
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { Field, FieldLabel, FieldDescription, FieldControl } from "@/components/ui/field"
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset"
import { Group } from "@/components/ui/group"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import {
  NumberField, NumberFieldGroup, NumberFieldInput,
  NumberFieldDecrement, NumberFieldIncrement,
} from "@/components/ui/number-field"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import {
  AlertDialog, AlertDialogTrigger, AlertDialogPopup,
  AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import {
  ContextMenu, ContextMenuTrigger, ContextMenuPopup,
  ContextMenuItem, ContextMenuSeparator,
} from "@/components/ui/context-menu"
import {
  Command, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandGroupLabel,
} from "@/components/ui/command"
import { Frame } from "@/components/ui/frame"
import { PreviewCard, PreviewCardTrigger, PreviewCardPopup } from "@/components/ui/preview-card"
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar"
import { toastManager } from "@/components/ui/toast"

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-4 flex flex-wrap items-start gap-3">{children}</div>
    </section>
  )
}

function SwitchDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex items-center gap-3">
      <Switch checked={checked} onCheckedChange={setChecked} />
      <span className="text-sm">{checked ? "开启" : "关闭"}</span>
    </div>
  )
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <Label>同意协议</Label>
    </div>
  )
}

function RadioDemo() {
  const [val, setVal] = useState("a")
  return (
    <RadioGroup value={val} onValueChange={setVal}>
      <div className="flex items-center gap-2">
        <Radio value="a" />
        <Label>选项 A</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="b" />
        <Label>选项 B</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="c" />
        <Label>选项 C</Label>
      </div>
    </RadioGroup>
  )
}

function SliderDemo() {
  const [val, setVal] = useState([30])
  return (
    <div className="w-64 space-y-2">
      <Slider value={val} onValueChange={(v) => setVal(Array.isArray(v) ? [...v] : [v])} />
      <p className="text-sm text-muted-foreground">值: {val.join(", ")}</p>
    </div>
  )
}

function ProgressDemo() {
  const [val, setVal] = useState(40)
  return (
    <div className="w-64 space-y-2">
      <Progress value={val}>
        <div className="flex items-center justify-between">
          <ProgressLabel>上传进度</ProgressLabel>
          <ProgressValue>{(formatted) => `${formatted ?? val}`}</ProgressValue>
        </div>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
      <div className="flex gap-2">
        <Button size="xs" variant="outline" onClick={() => setVal(Math.max(0, val - 10))}>-10</Button>
        <Button size="xs" variant="outline" onClick={() => setVal(Math.min(100, val + 10))}>+10</Button>
      </div>
    </div>
  )
}

function InputDemo() {
  const [val, setVal] = useState("")
  return (
    <div className="w-64">
      <Input placeholder="请输入内容..." value={val} onChange={(e) => setVal(e.target.value)} />
      {val && <p className="mt-1 text-xs text-muted-foreground">输入: {val}</p>}
    </div>
  )
}

function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" onClick={() => toastManager.add({ title: "操作成功", description: "数据已保存", type: "success" })}>成功</Button>
      <Button size="sm" variant="outline" onClick={() => toastManager.add({ title: "操作失败", description: "请重试", type: "error" })}>错误</Button>
      <Button size="sm" variant="outline" onClick={() => toastManager.add({ title: "提示信息", description: "查看详情", type: "info" })}>信息</Button>
      <Button size="sm" variant="outline" onClick={() => toastManager.add({ title: "警告", description: "请注意", type: "warning" })}>警告</Button>
    </div>
  )
}

function CollapsibleDemo() {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-64 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">技术栈详情</span>
        <CollapsibleTrigger render={<Button size="icon-sm" variant="ghost" />}>
          <ChevronDownIcon className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-3 py-2 text-sm">React 19</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-3 py-2 text-sm">TypeScript 6.0</div>
        <div className="rounded-md border px-3 py-2 text-sm">Vite 8</div>
        <div className="rounded-md border px-3 py-2 text-sm">Tailwind CSS v4</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card/80 backdrop-blur px-6 py-3">
        <h1 className="text-lg font-semibold">组件预览</h1>
        <Badge variant="outline" className="text-orange-600 border-orange-300">仅开发环境 · 构建时不打包</Badge>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-12">

        <Section title="Button 按钮" description="7 种 variant × 10 种 size">
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="destructive-outline">Destructive Outline</Button>
          </div>
          <Separator className="my-2 w-full" />
          <div className="flex flex-wrap items-center gap-2">
            <Button size="xs">xs</Button>
            <Button size="sm">sm</Button>
            <Button size="default">default</Button>
            <Button size="lg">lg</Button>
            <Button size="xl">xl</Button>
            <Button size="icon" variant="outline"><SettingsIcon /></Button>
            <Button size="icon-sm" variant="outline"><SettingsIcon /></Button>
            <Button size="icon-lg" variant="outline"><SettingsIcon /></Button>
            <Button size="icon-xl" variant="outline"><SettingsIcon /></Button>
            <Button size="icon-xs" variant="outline"><SettingsIcon /></Button>
          </div>
          <Separator className="my-2 w-full" />
          <div className="flex flex-wrap gap-2">
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button variant="outline" loading>Loading</Button>
          </div>
        </Section>

        <Separator />

        <Section title="Badge 标签" description="8 种 variant × 3 种 size">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          <Separator className="my-2 w-full" />
          <div className="flex flex-wrap items-center gap-2">
            <Badge size="sm">sm</Badge>
            <Badge size="default">default</Badge>
            <Badge size="lg">lg</Badge>
          </div>
        </Section>

        <Separator />

        <Section title="Alert 警告" description="5 种 variant: default, info, success, warning, error">
          <div className="w-full space-y-3">
            <Alert>
              <InfoIcon />
              <AlertTitle>默认提示</AlertTitle>
              <AlertDescription>这是一条默认提示信息。</AlertDescription>
            </Alert>
            <Alert variant="info">
              <InfoIcon />
              <AlertTitle>信息提示</AlertTitle>
              <AlertDescription>系统将于今晚 22:00 进行维护升级。</AlertDescription>
            </Alert>
            <Alert variant="success">
              <CircleCheckIcon />
              <AlertTitle>操作成功</AlertTitle>
              <AlertDescription>数据已成功保存到数据库。</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <TriangleAlertIcon />
              <AlertTitle>警告</AlertTitle>
              <AlertDescription>存储空间即将用尽，请及时清理。</AlertDescription>
            </Alert>
            <Alert variant="error">
              <CircleAlertIcon />
              <AlertTitle>错误</AlertTitle>
              <AlertDescription>网络连接失败，请检查网络设置后重试。</AlertDescription>
            </Alert>
          </div>
        </Section>

        <Separator />

        <Section title="Input 输入框" description="3 种 size: sm, default, lg">
          <div className="flex flex-col gap-3 w-72">
            <Input size="sm" placeholder="sm 尺寸" />
            <Input placeholder="default 尺寸" />
            <Input size="lg" placeholder="lg 尺寸" />
            <Input disabled placeholder="disabled" />
            <Input type="search" placeholder="搜索..." />
            <InputDemo />
          </div>
        </Section>

        <Separator />

        <Section title="Textarea 文本域" description="3 种 size: sm, default, lg">
          <div className="flex flex-col gap-3 w-72">
            <Textarea size="sm" placeholder="sm 尺寸" />
            <Textarea placeholder="default 尺寸" />
            <Textarea size="lg" placeholder="lg 尺寸" />
            <Textarea disabled placeholder="disabled" />
          </div>
        </Section>

        <Separator />

        <Section title="Label 标签" description="表单标签组件">
          <Label>用户名</Label>
          <Label>
            <StarIcon className="size-3" /> 带图标标签
          </Label>
        </Section>

        <Separator />

        <Section title="Switch 开关" description="切换状态">
          <SwitchDemo />
          <Switch disabled />
        </Section>

        <Separator />

        <Section title="Checkbox 复选框" description="支持 checked / unchecked">
          <CheckboxDemo />
          <Checkbox disabled />
        </Section>

        <Separator />

        <Section title="RadioGroup 单选组" description="单选按钮">
          <RadioDemo />
        </Section>

        <Separator />

        <Section title="Slider 滑块" description="拖动选取数值">
          <SliderDemo />
        </Section>

        <Separator />

        <Section title="Progress 进度条" description="带标签和数值的进度指示器">
          <ProgressDemo />
        </Section>

        <Separator />

        <Section title="Meter 仪表" description="静态数值展示">
          <div className="w-64">
            <Meter value={75}>
              <MeterLabel>存储空间</MeterLabel>
              <MeterTrack>
                <MeterIndicator />
              </MeterTrack>
              <MeterValue>{(formatted) => `${formatted}`}</MeterValue>
            </Meter>
          </div>
        </Section>

        <Separator />

        <Section title="Separator 分隔线" description="水平/垂直分隔">
          <div className="w-64 space-y-2">
            <p className="text-sm">上方内容</p>
            <Separator />
            <p className="text-sm">下方内容</p>
          </div>
          <div className="flex items-center gap-2 h-8">
            <span className="text-sm">左侧</span>
            <Separator orientation="vertical" className="h-full" />
            <span className="text-sm">右侧</span>
          </div>
        </Section>

        <Separator />

        <Section title="Skeleton 骨架屏" description="加载占位">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </Section>

        <Separator />

        <Section title="Spinner 加载" description="旋转加载指示器">
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </Section>

        <Separator />

        <Section title="Kbd 键盘快捷键" description="键盘按键展示">
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
          <Kbd>Enter</Kbd>
        </Section>

        <Separator />

        <Section title="Avatar 头像" description="用户头像展示">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/40?u=1" alt="用户" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar className="size-12">
            <AvatarFallback className="text-sm">CD</AvatarFallback>
          </Avatar>
        </Section>

        <Separator />
        <Section title="Toggle 切换按钮" description="2 种 variant × 3 种 size">
          <div className="flex flex-wrap gap-2">
            <Toggle variant="default"><BoldIcon aria-hidden="true" /> Bold</Toggle>
            <Toggle variant="outline"><ItalicIcon aria-hidden="true" /> Italic</Toggle>
            <Toggle defaultPressed><UnderlineIcon aria-hidden="true" /></Toggle>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Toggle size="sm" variant="outline"><BoldIcon aria-hidden="true" /></Toggle>
            <Toggle size="default" variant="outline"><BoldIcon aria-hidden="true" /></Toggle>
            <Toggle size="lg" variant="outline"><BoldIcon aria-hidden="true" /></Toggle>
          </div>
        </Section>

        <Separator />

        <Section title="ToggleGroup 切换按钮组" description="单选/多选按钮组">
          <ToggleGroup variant="outline">
            <ToggleGroupItem value="left"><AlignLeftIcon /></ToggleGroupItem>
            <ToggleGroupItem value="center"><AlignCenterIcon /></ToggleGroupItem>
            <ToggleGroupItem value="right"><AlignRightIcon /></ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup variant="default" multiple>
            <ToggleGroupItem value="bold"><BoldIcon /></ToggleGroupItem>
            <ToggleGroupItem value="italic"><ItalicIcon /></ToggleGroupItem>
            <ToggleGroupItem value="underline"><UnderlineIcon /></ToggleGroupItem>
          </ToggleGroup>
        </Section>

        <Separator />

        <Section title="Card 卡片" description="Card / CardHeader / CardTitle / CardDescription / CardPanel / CardFooter">
          <Card className="w-80">
            <CardHeader>
              <CardTitle>项目概览</CardTitle>
              <CardDescription>本月项目运行数据汇总</CardDescription>
            </CardHeader>
            <CardPanel>
              <p className="text-sm text-muted-foreground">卡片内容区域，使用 CardPanel 组件包裹。</p>
            </CardPanel>
            <CardFooter>
              <Button size="sm">查看详情</Button>
            </CardFooter>
          </Card>
        </Section>

        <Separator />

        <Section title="Tabs 标签页" description="TabsTab / TabsPanel, 2 种 variant: default / underline">
          <Tabs defaultValue="tab1" className="w-96">
            <TabsList variant="default">
              <TabsTab value="tab1">概览</TabsTab>
              <TabsTab value="tab2">分析</TabsTab>
              <TabsTab value="tab3">设置</TabsTab>
            </TabsList>
            <TabsPanel value="tab1"><p className="p-4 text-sm">概览面板内容。</p></TabsPanel>
            <TabsPanel value="tab2"><p className="p-4 text-sm">分析面板内容。</p></TabsPanel>
            <TabsPanel value="tab3"><p className="p-4 text-sm">设置面板内容。</p></TabsPanel>
          </Tabs>
          <Tabs defaultValue="tab1" className="w-96">
            <TabsList variant="underline">
              <TabsTab value="tab1">概览</TabsTab>
              <TabsTab value="tab2">分析</TabsTab>
              <TabsTab value="tab3">设置</TabsTab>
            </TabsList>
            <TabsPanel value="tab1"><p className="p-4 text-sm">underline 样式概览。</p></TabsPanel>
            <TabsPanel value="tab2"><p className="p-4 text-sm">underline 样式分析。</p></TabsPanel>
            <TabsPanel value="tab3"><p className="p-4 text-sm">underline 样式设置。</p></TabsPanel>
          </Tabs>
        </Section>

        <Separator />

        <Section title="Accordion 手风琴" description="AccordionItem / AccordionTrigger / AccordionPanel">
          <Accordion className="w-96" defaultValue={["item1"]}>
            <AccordionItem value="item1">
              <AccordionTrigger>什么是 Tailwind CSS？</AccordionTrigger>
              <AccordionPanel>Tailwind CSS 是一个功能优先的 CSS 框架，通过组合工具类来快速构建界面。</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="item2">
              <AccordionTrigger>什么是 coss？</AccordionTrigger>
              <AccordionPanel>coss 是基于 shadcn/ui 的增强组件库，提供更多 variant 和改进的 API。</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="item3">
              <AccordionTrigger>如何使用 AntV Infographic？</AccordionTrigger>
              <AccordionPanel>通过 useInfographic hook 传入语法字符串即可渲染信息图表。</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Section>

        <Separator />

        <Section title="Dialog 对话框" description="DialogTrigger / DialogPopup (render={...} 触发，非 asChild)">
          <Dialog>
            <DialogTrigger render={<Button>打开对话框</Button>} />
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>确认操作</DialogTitle>
                <DialogDescription>此操作不可撤销，确定要继续吗？</DialogDescription>
              </DialogHeader>
              <DialogPanel>
                <p className="text-sm text-muted-foreground">对话框主体内容区域，可放置表单或其他组件。</p>
              </DialogPanel>
              <DialogFooter>
                <Button variant="outline" size="sm">取消</Button>
                <Button size="sm">确认</Button>
              </DialogFooter>
            </DialogPopup>
          </Dialog>
        </Section>

        <Separator />

        <Section title="AlertDialog 确认对话框" description="用于危险操作的确认弹窗">
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive">删除项目</Button>} />
            <AlertDialogPopup>
              <AlertDialogHeader>
                <AlertDialogTitle>确定要删除吗？</AlertDialogTitle>
                <AlertDialogDescription>此操作将永久删除项目及其所有数据，不可恢复。</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button variant="outline" size="sm">取消</Button>
                <Button variant="destructive" size="sm">删除</Button>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialog>
        </Section>

        <Separator />

        <Section title="Sheet 侧边抽屉" description="side: right / left / top / bottom">
          <div className="flex flex-wrap gap-2">
            <Sheet>
              <SheetTrigger render={<Button variant="outline">右侧 Sheet</Button>} />
              <SheetPopup side="right">
                <SheetHeader>
                  <SheetTitle>右侧面板</SheetTitle>
                  <SheetDescription>从右侧滑出的面板</SheetDescription>
                </SheetHeader>
                <SheetPanel>
                  <p className="text-sm text-muted-foreground">面板内容区域。</p>
                </SheetPanel>
                <SheetFooter>
                  <Button size="sm">保存</Button>
                </SheetFooter>
              </SheetPopup>
            </Sheet>
            <Sheet>
              <SheetTrigger render={<Button variant="outline">底部 Sheet</Button>} />
              <SheetPopup side="bottom">
                <SheetHeader>
                  <SheetTitle>底部面板</SheetTitle>
                  <SheetDescription>从底部滑出的面板</SheetDescription>
                </SheetHeader>
                <SheetPanel>
                  <p className="text-sm text-muted-foreground">底部面板内容。</p>
                </SheetPanel>
              </SheetPopup>
            </Sheet>
          </div>
        </Section>

        <Separator />

        <Section title="Menu 下拉菜单" description="MenuTrigger / MenuPopup / MenuItem (render={...} 触发)">
          <Menu>
            <MenuTrigger render={<Button variant="outline">打开菜单 <ChevronDownIcon className="size-4" /></Button>} />
            <MenuPopup>
              <MenuGroup>
                <MenuGroupLabel>文件操作</MenuGroupLabel>
                <MenuItem><FileTextIcon /> 新建文件</MenuItem>
                <MenuItem><DownloadIcon /> 下载</MenuItem>
                <MenuItem><CopyIcon /> 复制</MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuGroup>
                <MenuGroupLabel>设置</MenuGroupLabel>
                <MenuItem><SettingsIcon /> 偏好设置</MenuItem>
                <MenuItem variant="destructive"><TrashIcon /> 删除</MenuItem>
              </MenuGroup>
            </MenuPopup>
          </Menu>
          <Menu>
            <MenuTrigger render={<Button variant="outline">勾选菜单</Button>} />
            <MenuPopup>
              <MenuCheckboxItem checked>自动保存</MenuCheckboxItem>
              <MenuCheckboxItem>显示行号</MenuCheckboxItem>
              <MenuCheckboxItem variant="switch" checked>深色模式</MenuCheckboxItem>
            </MenuPopup>
          </Menu>
        </Section>

        <Separator />

        <Section title="Select 选择器" description="SelectTrigger / SelectPopup / SelectItem">
          <Select defaultValue="react">
            <SelectTrigger className="w-56">
              <SelectValue placeholder="选择框架" />
            </SelectTrigger>
            <SelectPopup>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
              <SelectItem value="angular">Angular</SelectItem>
              <SelectItem value="svelte">Svelte</SelectItem>
            </SelectPopup>
          </Select>
        </Section>

        <Separator />

        <Section title="Popover 弹出框" description="PopoverTrigger / PopoverPopup">
          <Popover>
            <PopoverTrigger render={<Button variant="outline">打开 Popover</Button>} />
            <PopoverPopup className="w-64">
              <p className="text-sm">这是弹出框内容，可以放置任意组件。</p>
            </PopoverPopup>
          </Popover>
        </Section>

        <Separator />

        <Section title="Tooltip 工具提示" description="TooltipTrigger / TooltipPopup">
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="sm">悬停查看</Button>} />
            <TooltipPopup>这是一条提示信息</TooltipPopup>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon"><BellIcon aria-hidden="true" /></Button>} />
            <TooltipPopup>通知中心</TooltipPopup>
          </Tooltip>
        </Section>

        <Separator />

        <Section title="Drawer 抽屉" description="手势拖拽的底部/侧边抽屉">
          <Drawer>
            <DrawerTrigger render={<Button variant="outline">打开 Drawer</Button>} />
            <DrawerPopup showBar>
              <DrawerHeader>
                <DrawerTitle>分享</DrawerTitle>
                <DrawerDescription>选择一种方式分享此内容</DrawerDescription>
              </DrawerHeader>
              <DrawerPanel>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10"><MailIcon className="size-5 text-primary" /></div>
                    <span className="text-xs">邮件</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10"><ShareIcon className="size-5 text-primary" /></div>
                    <span className="text-xs">链接</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10"><CopyIcon className="size-5 text-primary" /></div>
                    <span className="text-xs">复制</span>
                  </div>
                </div>
              </DrawerPanel>
            </DrawerPopup>
          </Drawer>
        </Section>

        <Separator />

        <Section title="Table 表格" description="Table / TableHeader / TableBody / TableRow / TableHead / TableCell">
          <Table className="w-full max-w-2xl rounded-xl border overflow-hidden">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>项目名称</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>进度</TableHead>
                <TableHead className="text-right">预算</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">官网重构</TableCell>
                <TableCell><Badge variant="success">进行中</Badge></TableCell>
                <TableCell>75%</TableCell>
                <TableCell className="text-right">¥128,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">移动端 App</TableCell>
                <TableCell><Badge variant="warning">待审核</Badge></TableCell>
                <TableCell>90%</TableCell>
                <TableCell className="text-right">¥256,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">数据分析平台</TableCell>
                <TableCell><Badge variant="info">规划中</Badge></TableCell>
                <TableCell>10%</TableCell>
                <TableCell className="text-right">¥512,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">内部管理系统</TableCell>
                <TableCell><Badge variant="error">已暂停</Badge></TableCell>
                <TableCell>45%</TableCell>
                <TableCell className="text-right">¥198,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        <Separator />

        <Section title="Toast 消息提示" description="使用 toastManager 触发 toast">
          <ToastDemo />
        </Section>

        <Separator />

        <Section title="ScrollArea 滚动区域" description="自定义滚动条容器">
          <ScrollArea className="h-40 w-64 rounded-md border p-3">
            <div className="space-y-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="text-sm">滚动列表项 {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
        </Section>

        <Separator />

        <Section title="Pagination 分页" description="分页导航">
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </Section>

        <Separator />

        <Section title="Breadcrumb 面包屑" description="层级导航">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#"><HomeIcon className="size-3" aria-hidden="true" /> 首页</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">产品</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>详情页</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>

        <Separator />

        <Section title="Empty 空状态" description="无数据时的占位展示">
          <Empty className="w-72 border rounded-lg p-8">
            <EmptyMedia><SearchIcon className="size-8 text-muted-foreground/40" /></EmptyMedia>
            <EmptyTitle>暂无数据</EmptyTitle>
            <EmptyDescription>当前没有可展示的内容，请稍后再试。</EmptyDescription>
          </Empty>
        </Section>

        <Separator />

        <Section title="Collapsible 折叠" description="展开/收起内容">
          <CollapsibleDemo />
        </Section>

        <Separator />

        <Section title="Field 字段" description="表单字段包装组件">
          <Field className="w-64">
            <FieldLabel>邮箱地址</FieldLabel>
            <FieldDescription>我们不会分享你的邮箱。</FieldDescription>
            <FieldControl render={<Input placeholder="you@example.com" />} />
          </Field>
        </Section>

        <Separator />

        <Section title="Fieldset 字段集" description="分组表单字段">
          <Fieldset className="w-72 flex flex-col gap-3">
            <FieldsetLegend>个人信息</FieldsetLegend>
            <Input placeholder="姓名" />
            <Input placeholder="邮箱" />
          </Fieldset>
        </Section>

        <Separator />

        <Section title="Group 组件组" description="组件分组容器">
          <Group className="w-64">
            <Label>搜索</Label>
            <Input placeholder="搜索..." />
          </Group>
        </Section>

        <Separator />

        <Section title="InputGroup 输入组" description="带前缀/后缀的输入框">
          <InputGroup className="w-64">
            <InputGroupAddon><SearchIcon className="size-4 text-muted-foreground" /></InputGroupAddon>
            <Input placeholder="搜索..." />
          </InputGroup>
          <InputGroup className="w-64">
            <Input placeholder="输入邮箱" />
            <InputGroupAddon align="inline-end"><Button size="xs">发送</Button></InputGroupAddon>
          </InputGroup>
        </Section>

        <Separator />

        <Section title="NumberField 数字输入" description="带增减按钮的数字输入">
          <NumberField defaultValue={10} className="w-48">
            <Label>数量</Label>
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
        </Section>

        <Separator />

        <Section title="ContextMenu 右键菜单" description="右键触发的上下文菜单">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
              在此区域右键
            </ContextMenuTrigger>
            <ContextMenuPopup>
              <ContextMenuItem><CopyIcon /> 复制</ContextMenuItem>
              <ContextMenuItem><EditIcon /> 编辑</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive"><TrashIcon /> 删除</ContextMenuItem>
            </ContextMenuPopup>
          </ContextMenu>
        </Section>

        <Separator />

        <Section title="Command 命令面板" description="可搜索的命令列表">
          <div className="w-72 rounded-lg border">
            <Command>
              <CommandInput placeholder="搜索命令..." />
              <CommandList>
                <CommandEmpty>没有找到匹配项</CommandEmpty>
                <CommandGroup>
                  <CommandGroupLabel>建议</CommandGroupLabel>
                  <CommandItem><CalendarDaysIcon /> 日历</CommandItem>
                  <CommandItem><SearchIcon /> 搜索</CommandItem>
                  <CommandItem><SettingsIcon /> 设置</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <CommandGroupLabel>操作</CommandGroupLabel>
                  <CommandItem><PlusIcon /> 新建文件</CommandItem>
                  <CommandItem><DownloadIcon /> 下载</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </Section>

        <Separator />

        <Section title="Frame 框架" description="内容框架容器">
          <Frame className="w-72">
            <div className="p-4 text-sm">Frame 容器内的内容</div>
          </Frame>
        </Section>

        <Separator />

        <Section title="PreviewCard 预览卡片" description="悬停预览">
          <PreviewCard>
            <PreviewCardTrigger className="text-sm text-primary underline cursor-pointer">悬停预览此链接</PreviewCardTrigger>
            <PreviewCardPopup>
              <p className="font-semibold">预览标题</p>
              <p className="text-sm text-muted-foreground mt-1">这是悬停时展示的预览描述内容。</p>
            </PreviewCardPopup>
          </PreviewCard>
        </Section>

        <Separator />

        <Section title="Toolbar 工具栏" description="工具栏按钮组">
          <Toolbar aria-label="文本格式">
            <ToolbarButton><BoldIcon className="size-4" /></ToolbarButton>
            <ToolbarButton><ItalicIcon className="size-4" /></ToolbarButton>
            <ToolbarButton><UnderlineIcon className="size-4" /></ToolbarButton>
            <ToolbarSeparator />
            <ToolbarButton><AlignLeftIcon className="size-4" /></ToolbarButton>
            <ToolbarButton><AlignCenterIcon className="size-4" /></ToolbarButton>
            <ToolbarButton><AlignRightIcon className="size-4" /></ToolbarButton>
          </Toolbar>
        </Section>

      </div>
    </main>
  )
}
