"use client"

import { useState } from "react"
import { TemplateCard } from "@/components/template-card"
import { Sidebar } from "@/components/sidebar"
import { templates } from "@/lib/data"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"

export default function TemplatesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      template.categories.some((category) => selectedCategories.includes(category.toLowerCase().replace(/\s+/g, "-")))

    const matchesSearch =
      searchQuery === "" ||
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">N</span>
            </div>
            <span className="font-bold text-xl">Next模板库</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
            {/* <Button className="rounded-full">登录</Button> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden w-full">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]"></div>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Next.js 项目模板
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            发现适合您项目的完美 Next.js 模板。从登陆页面到电子商务，我们提供各种高质量的起始模板。
          </p>
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Input
                placeholder="搜索模板..."
                className="pl-10 h-12 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl flex-1 flex flex-col md:flex-row gap-8 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <Sidebar selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />

        {/* Templates Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {selectedCategories.length > 0
                ? `${selectedCategories.map((c) => c.charAt(0).toUpperCase() + c.slice(1).replace("-", " ")).join(", ")} 模板`
                : "所有模板"}
            </h2>
            <p className="text-muted-foreground">显示 {filteredTemplates.length} 个模板</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">没有找到匹配的模板</h3>
              <p className="text-muted-foreground">尝试使用不同的筛选条件或搜索词</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-10 bg-muted/30 w-full">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold">Next.js 模板库</h3>
            <p className="mt-4 text-muted-foreground">为您的下一个项目提供高质量的 Next.js 起始模板。</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">快速链接</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  所有模板
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  博客
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">联系我们</h4>
            <p className="mt-4 text-muted-foreground">有问题或建议？请随时联系我们。</p>
            <Button variant="outline" className="mt-4">
              联系我们
            </Button>
          </div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Next.js 模板库。保留所有权利。</p>
        </div>
      </footer>
    </div>
  )
}
