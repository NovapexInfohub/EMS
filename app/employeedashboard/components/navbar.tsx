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

/* ------------------------------------------------------------------
    ADMIN NAVBAR (FULLY COMMENTED OUT AS REQUESTED)
--------------------------------------------------------------------

// const navigationItems = [
//   {
//     name: "Dashboard",
//     items: [
//       { name: "Overview", href: "/dashboard" },
//       { name: "Analytics", href: "/dashboard/analytics" },
//       { name: "Reports", href: "/dashboard/reports" },
//     ],
//   },
//   {
//     name: "Attendance",
//     items: [
//       { name: "Time Tracking", href: "/attendance/time-tracking" },
//       { name: "Leave Requests", href: "/attendance/leave-requests" },
//       { name: "Reports", href: "/attendance/reports" },
//       { name: "Calendar", href: "/attendance/calendar" }
//     ],
//   },
//   {
//     name: "Performance",
//     items: [
//       { name: "Reviews", href: "/performance/reviews" },
//       { name: "Goals", href: "/performance/goals" },
//       { name: "Feedback", href: "/performance/feedback" },
//     ],
//   },
//   {
//     name: "Courses",
//     items:[
//       {name: "Engineering", href:"/courses/engineering"},
//       {name: "Marketing", href:"/courses/marketing"},
//       {name: "Sales", href:"/courses/sales"},
//       {name: "HR", href:"/courses/hr"},
//     ]
//   }
// ];

------------------------------------------------------------------ */

/* ------------------------------------------------------------------
        NEW EMPLOYEE NAVBAR (ACCORDING TO EMPLOYEE DASHBOARD)
-------------------------------------------------------------------- */


export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const employeeNavigation = [
    { name: "Dashboard", href: "/employeedashboard" },
    { name: "Attendance", href: "/employeedashboard/101/attendance" },
    { name: "Performance", href: "/employeedashboard/101/performance" },
    { name: "Payroll", href: "/employeedashboard/101/payroll" },
    { name: "Settings", href: "/employeedashboard/101/settings" },
  ];

  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between w-full">

        {/* LEFT: LOGO */}
        <Link
          href="/employeedashboard"
          className="text-xl font-bold text-primary"
        >
          ERP Portal
        </Link>

        {/* CENTER: NAVIGATION */}
        <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
          {employeeNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* RIGHT: MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 rounded hover:bg-primary/10"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 space-y-3"
          >
            {employeeNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-foreground hover:text-primary px-2"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
