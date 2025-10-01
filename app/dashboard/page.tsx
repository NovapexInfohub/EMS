"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, Settings } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AuthGuard from "@/components/AuthGuard"

// ✅ Import Chatbot
import Chatbot from "@/components/ui/chatbot"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    onLeave: 0,
    pendingRequests: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalEmployees: 247,
        presentToday: 198,
        onLeave: 12,
        pendingRequests: 8,
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  const recentActivities = [
    { id: 1, action: "New employee added", user: "Sarah Johnson", time: "2 hours ago", type: "success" },
    { id: 2, action: "Leave request approved", user: "Mike Chen", time: "4 hours ago", type: "info" },
    { id: 3, action: "Employee Settings updated", user: "System", time: "1 day ago", type: "success" },
    { id: 4, action: "Performance review due", user: "Alex Rodriguez", time: "2 days ago", type: "warning" },
  ]

  const upcomingEvents = [
    { id: 1, title: "Team Meeting", date: "Today, 2:00 PM", department: "Engineering" },
    { id: 2, title: "Performance Reviews", date: "Tomorrow, 9:00 AM", department: "HR" },
    { id: 3, title: "Quarterly Planning", date: "Friday, 10:00 AM", department: "Management" },
  ]

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening today.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 transition-colors">Generate Report</Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Employees", value: stats.totalEmployees, color: "text-primary", extra: "+12 this month" },
            { label: "Present Today", value: stats.presentToday, color: "text-green-600", progress: true },
            { label: "On Leave", value: stats.onLeave, color: "text-orange-600", extra: "Scheduled" },
            { label: "Pending Requests", value: stats.pendingRequests, color: "text-red-600", extra: "Needs attention" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                className="transition-all duration-300 
                hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)] 
                rounded-xl cursor-pointer"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  {stat.progress && (
                    <>
                      <Progress value={(stats.presentToday / stats.totalEmployees) * 100} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round((stats.presentToday / stats.totalEmployees) * 100)}% attendance
                      </p>
                    </>
                  )}
                  {stat.extra && (
                    <Badge
                      variant={stat.label === "Pending Requests" ? "destructive" : "secondary"}
                      className="text-xs mt-2"
                    >
                      {stat.extra}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activities & Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates and actions in your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "success"
                            ? "bg-green-500"
                            : activity.type === "warning"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your schedule for the next few days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                      <Badge variant="outline" className="text-xs mt-2">
                        {event.department}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Attendance Management",
              description: "Track attendance, monitor presence, and view daily reports with ease.",
              href: "/attendance",
              icon: <Users className="w-6 h-6 text-blue-500" />,
              color: "from-blue-600 to-blue-800",
              image:
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Performance Management",
              description: "Manage performance reviews, feedback cycles, and track growth metrics.",
              href: "/performance",
              icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
              color: "from-purple-600 to-purple-800",
              image:
                "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Settings",
              description: "Configure user roles, manage preferences, and system-wide settings.",
              href: "/settings",
              icon: <Settings className="w-6 h-6 text-gray-200" />,
              color: "from-gray-700 to-gray-900",
              image:
                "https://images.unsplash.com/photo-1605902711622-cfb43c4437d9?auto=format&fit=crop&w=800&q=80",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3, duration: 0.6, ease: "easeOut" }}
            >
              <Link href={card.href}>
                <div className="relative h-56 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                  {/* Background Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-80`}></div>

                  {/* Content */}
                  <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                    <div className="flex items-center gap-3 text-white">
                      {card.icon}
                      <h3 className="text-xl font-bold">{card.title}</h3>
                    </div>
                    <p className="text-sm text-gray-100 mt-2 flex-1">{card.description}</p>
                    <Button className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white font-semibold backdrop-blur-sm">
                      Go to {card.title.split(" ")[0]}
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ✅ Chatbot Floating Component */}
        <Chatbot />
      </div>
    </AuthGuard>
  )
}
