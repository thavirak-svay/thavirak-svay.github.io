"use client"

import { useSearchParams } from "next/navigation"
import Template1 from "@/components/template1/Template1"
import Template2 from "@/components/template2/Template2"
import Template3 from "@/components/template3/Template3"

const templates = {
  "1": Template1,
  "2": Template2,
  "3": Template3,
}

export default function Home() {
  const searchParams = useSearchParams()
  const template = searchParams.get("template")

  const TemplateComponent = templates[template as keyof typeof templates] || Template1

  return <TemplateComponent />
}