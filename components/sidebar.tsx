"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, ChevronUp, Filter, LayoutGrid, Tag, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "landing-page", name: "登陆页面", count: 12 },
  { id: "ecommerce", name: "电子商务", count: 8 },
  { id: "blog", name: "博客", count: 10 },
  { id: "dashboard", name: "仪表盘", count: 6 },
  { id: "portfolio", name: "作品集", count: 5 },
  { id: "saas", name: "SaaS", count: 7 },
]

const technologies = [
  { id: "tailwind", name: "Tailwind CSS", count: 24 },
  { id: "shadcn", name: "shadcn/ui", count: 18 },
  { id: "typescript", name: "TypeScript", count: 20 },
  { id: "app-router", name: "App Router", count: 15 },
  { id: "framer-motion", name: "Framer Motion", count: 8 },
]

interface SidebarProps {
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
}

export function Sidebar({ selectedCategories, setSelectedCategories }: SidebarProps) {
  const [techOpen, setTechOpen] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(true)
  const [mobileTechOpen, setMobileTechOpen] = useState(true)
  const [mobilePriceOpen, setMobilePriceOpen] = useState(true)

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(
      selectedCategories.includes(categoryId)
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...selectedCategories, categoryId],
    )
  }

  // Desktop sidebar
  const DesktopSidebar = (
    <div className="w-64 shrink-0 hidden md:block">
      <div className="sticky top-24 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <LayoutGrid className="h-5 w-5" />
            <h3 className="font-semibold">分类</h3>
          </div>
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "w-full justify-between font-normal",
                  selectedCategories.includes(category.id) && "bg-muted font-medium",
                )}
                onClick={() => toggleCategory(category.id)}
              >
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-auto">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-between p-2"
            onClick={() => setTechOpen(!techOpen)}
          >
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              <h3 className="font-semibold">技术栈</h3>
            </div>
            {techOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          {techOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1 mt-1"
            >
              {technologies.map((tech) => (
                <Button key={tech.id} variant="ghost" className="w-full justify-between font-normal">
                  <span>{tech.name}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {tech.count}
                  </Badge>
                </Button>
              ))}
            </motion.div>
          )}
        </div>

        <Separator />

        {/* <div>
          <h3 className="font-semibold mb-3">价格</h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start font-normal">
              免费
            </Button>
            <Button variant="ghost" className="w-full justify-start font-normal">
              付费
            </Button>
          </div>
        </div> */}

        {/* <Separator /> */}

        <Button variant="outline" className="w-full" onClick={() => setSelectedCategories([])}>
          重置筛选
        </Button>
      </div>
    </div>
  )

  // Mobile filters
  const MobileFilters = (
    <div className="md:hidden">
      <Button
        variant="outline"
        className="flex items-center gap-2 mb-4"
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
      >
        <Filter className="h-4 w-4" />
        筛选选项
        {selectedCategories.length > 0 && (
          <Badge variant="secondary" className="ml-1">
            {selectedCategories.length}
          </Badge>
        )}
        {mobileFiltersOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
      </Button>

      {/* Mobile active filters display */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.map((categoryId) => {
            const category = categories.find((c) => c.id === categoryId)
            return (
              <Badge key={categoryId} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {category?.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1"
                  onClick={() => toggleCategory(categoryId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )
          })}
        </div>
      )}

      {mobileFiltersOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-lg border p-4 mb-6 shadow-sm"
        >
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-between p-2"
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5" />
                  <h3 className="font-semibold">分类</h3>
                </div>
                {mobileCategoryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              {mobileCategoryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1 mt-1"
                >
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-between font-normal",
                        selectedCategories.includes(category.id) && "bg-muted font-medium",
                      )}
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </motion.div>
              )}
            </div>

            <Separator />

            {/* Technologies */}
            <div>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-between p-2"
                onClick={() => setMobileTechOpen(!mobileTechOpen)}
              >
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  <h3 className="font-semibold">技术栈</h3>
                </div>
                {mobileTechOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              {mobileTechOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1 mt-1"
                >
                  {technologies.map((tech) => (
                    <Button key={tech.id} variant="ghost" className="w-full justify-between font-normal">
                      <span>{tech.name}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {tech.count}
                      </Badge>
                    </Button>
                  ))}
                </motion.div>
              )}
            </div>

            <Separator />

            {/* Price */}
            {/* <div>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-between p-2"
                onClick={() => setMobilePriceOpen(!mobilePriceOpen)}
              >
                <h3 className="font-semibold">价格</h3>
                {mobilePriceOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              {mobilePriceOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1 mt-1"
                >
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    免费
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    付费
                  </Button>
                </motion.div>
              )}
            </div> */}

            {/* <Separator /> */}

            <Button variant="outline" className="w-full" onClick={() => setSelectedCategories([])}>
              重置筛选
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )

  return (
    <>
      {DesktopSidebar}
      {MobileFilters}
    </>
  )
}
