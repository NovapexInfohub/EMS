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
//   {
//     name: "Employees",
//     items: [
//       { name: "All Employees", href: "/employees" },
//       //{ name: "Add Employee", href: "/employees/add" },
//       { name: "Departments", href: "/employees/departments" },
//       //{ name: "Profiles", href: "/employees/profiles" },
//       { name: "Payroll", href: "/employees/payroll" },
//     ],
//   },
  {
    name: "Attendance",
    items: [
      { name: "Time Tracking", href: "/attendance/time-tracking" },
      { name: "Leave Requests", href: "/attendance/leave-requests" },
      { name: "Reports", href: "/attendance/reports" },
      //{ name: "Shift & Schedule", href: "/attendance/shift_shedule" },
      { name: "Calendar", href: "/attendance/calendar" }
    ],
  },
  {
    name: "Performance",
    items: [
      { name: "Reviews", href: "/performance/reviews" },
      { name: "Goals", href: "/performance/goals" },
      { name: "Feedback", href: "/performance/feedback" },
      //{ name: "Surveys", href: "/performance/surveys" },
      //{ name: "Rewards", href: "/performance/rewards" },

    ],
  },
//   {
//     name: "Settings",
//     items: [
//       { name: "Company", href: "/settings/company" },
//       { name: "Users", href: "/settings/users" },
//       { name: "Security", href: "/settings/security" },
//     ],
//   },
  {
    name: "Courses",
    items:[
      {name: "Engineering", href:"/courses/engineering"},
      {name: "Marketing", href:"/courses/marketing"},
      {name: "Sales", href:"/courses/sales"},
      {name: "HR", href:"/courses/hr"},
    ]
  }
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="text-xl font-bold text-primary">
          ERP Portal
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
          {/* <Button variant="outline" size="sm">
            Profile
          </Button> */}

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
