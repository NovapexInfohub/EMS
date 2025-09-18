import type React from "react"
import { Navigation } from "./navigation"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
