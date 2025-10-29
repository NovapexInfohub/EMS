"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X } from "lucide-react"

const navigationItems = [
  {
    name: "Dashboard",
    items: [
      { name: "Overview", href: "/dashboard" },
      { name: "Analytics", href: "/dashboard/analytics" },
      { name: "Reports", href: "/dashboard/reports" },
    ],
  },
  {
    name: "Employees",
    items: [
      { name: "All Employees", href: "/employees" },
      { name: "Add Employee", href: "/employees/add" },
      { name: "Departments", href: "/employees/departments" },
      { name: "Profiles", href: "/employees/profiles" },
      { name: "Payroll", href: "/employees/payroll" },
    ],
  },
  {
    name: "Attendance",
    items: [
      { name: "Time Tracking", href: "/attendance/time-tracking" },
      { name: "Leave Requests", href: "/attendance/leave-requests" },
      { name: "Reports", href: "/attendance/reports" },
      { name: "Shift & Schedule", href: "/attendance/shift_shedule" },
      { name: "Calendar", href: "/attendance/calendar" },
    ],
  },
  {
    name: "Performance",
    items: [
      { name: "Reviews", href: "/performance/reviews" },
      { name: "Goals", href: "/performance/goals" },
      { name: "Feedback", href: "/performance/feedback" },
      { name: "Surveys", href: "/performance/surveys" },
      { name: "Rewards", href: "/performance/rewards" },
    ],
  },
  {
    name: "Settings",
    items: [
      { name: "Company", href: "/settings/company" },
      { name: "Users", href: "/settings/users" },
      { name: "Security", href: "/settings/security" },
    ],
  },
  {
    name: "Courses",
    items: [
      { name: "Engineering", href: "/courses/engineering" },
      { name: "Marketing", href: "/courses/marketing" },
      { name: "Sales", href: "/courses/sales" },
      { name: "HR", href: "/courses/hr" },
    ],
  },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className=" font-bold">
          <h1 className="text-[#0077ff] font-bold text-lg tracking-wide">ERP PORTAL</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigationItems.map((section) => (
            <DropdownMenu
              key={section.name}
              open={openMenu === section.name}
              onOpenChange={(isOpen) =>
                setOpenMenu(isOpen ? section.name : null)
              }
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                  onMouseEnter={() => setOpenMenu(section.name)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  {section.name}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                onMouseEnter={() => setOpenMenu(section.name)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                {section.items.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.href}
                      className="flex items-center px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Profile Button with Base64 Image */}
          <Button
            variant="outline"
            size="sm"
            className="p-0 w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-primary"
          >
            <img
              src="data:image/png;base64,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"
              alt="Profile"
              className="object-cover w-10 h-10 rounded-full"
            />
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded hover:bg-primary/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation (Sliding Drawer) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 space-y-4"
          >
            {navigationItems.map((section) => (
              <div key={section.name}>
                <p className="text-sm font-semibold text-primary">{section.name}</p>
                <div className="pl-3 mt-2 space-y-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
