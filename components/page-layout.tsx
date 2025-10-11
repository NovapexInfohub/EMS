"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "@/components/navigation"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname()

  // Hide navigation for employee dashboard routes
  const hideNavbar = pathname.startsWith("/employeedashboard")

  return (
    <div className="min-h-screen bg-background">
      {!hideNavbar && <Navigation />}
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
