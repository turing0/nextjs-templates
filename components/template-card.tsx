"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Heart } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface Template {
  id: string
  title: string
  description: string
  image: string
  categories: string[]
  technologies: string[]
  demoUrl: string
  githubUrl: string
}

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden flex flex-col h-full border-muted-foreground/20 group">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={template.image || "/placeholder.svg"}
            alt={template.title}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1">{template.title}</CardTitle>
          <CardDescription className="line-clamp-2">{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {template.categories.map((category) => (
              <Badge key={category} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {category}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {template.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href={template.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              代码
            </Link>
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            asChild
          >
            <Link href={template.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              预览
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
