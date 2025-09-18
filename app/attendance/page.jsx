"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Calendar, Users, TrendingUp, CheckCircle, AlertCircle, Filter, Download } from "lucide-react"

export default function AttendancePage() {
  const [animateCards, setAnimateCards] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100)
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => {
      clearTimeout(timer)
      clearInterval(timeInterval)
    }
  }, [])

  const attendanceStats = [
    { title: "Present Today", value: "142", change: "+5%", icon: CheckCircle, color: "text-green-600" },
    { title: "Late Arrivals", value: "8", change: "-12%", icon: AlertCircle, color: "text-orange-600" },
    { title: "On Leave", value: "15", change: "+2%", icon: Calendar, color: "text-blue-600" },
    { title: "Average Hours", value: "8.2", change: "+0.3", icon: Clock, color: "text-purple-600" },
  ]

  const todayAttendance = [
    {
      name: "Sarah Johnson",
      avatar: "/diverse-woman-portrait.png",
      checkIn: "09:00 AM",
      checkOut: "06:15 PM",
      totalHours: "8h 45m",
      status: "Present",
      department: "Engineering",
    },
    {
      name: "Michael Chen",
      avatar: "/thoughtful-man.png",
      checkIn: "08:45 AM",
      checkOut: "05:30 PM",
      totalHours: "8h 15m",
      status: "Present",
      department: "Product",
    },
    {
      name: "Emily Davis",
      avatar: "/diverse-woman-portrait.png",
      checkIn: "09:15 AM",
      checkOut: "--",
      totalHours: "6h 30m",
      status: "Active",
      department: "Design",
    },
    {
      name: "David Wilson",
      avatar: "/thoughtful-man.png",
      checkIn: "09:30 AM",
      checkOut: "--",
      totalHours: "6h 15m",
      status: "Late",
      department: "Analytics",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-500"
      case "Active":
        return "bg-blue-500"
      case "Late":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-in slide-in-from-left-5 duration-700">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance Overview</h1>
            <p className="text-muted-foreground">Monitor and manage employee attendance and time tracking</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="hover:scale-105 transition-transform duration-200 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Current Time Display */}
        <Card
          className={`hover:shadow-lg transition-all duration-500 ${
            animateCards ? "animate-in slide-in-from-top-4" : "opacity-0"
          }`}
          style={{ animationDelay: "100ms" }}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{currentTime.toLocaleTimeString()}</div>
              <p className="text-muted-foreground">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attendanceStats.map((stat, index) => (
            <Card
              key={index}
              className={`hover:shadow-xl hover:scale-105 transition-all duration-500 hover:-translate-y-1 ${
                animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
              }`}
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} from yesterday
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg bg-muted ${stat.color} hover:rotate-12 transition-transform duration-300`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Attendance */}
        <Card
          className={`hover:shadow-lg transition-all duration-500 ${
            animateCards ? "animate-in slide-in-from-bottom-5" : "opacity-0"
          }`}
          style={{ animationDelay: "600ms" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 animate-pulse" />
              Today's Attendance
            </CardTitle>
            <CardDescription>Real-time attendance tracking for all employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAttendance.map((employee, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 hover:scale-102 hover:shadow-md transition-all duration-300 ${
                    animateCards ? "animate-in slide-in-from-left-3" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 hover:scale-110 transition-transform duration-200">
                      <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{employee.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Check In</p>
                      <p className="font-medium">{employee.checkIn}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Check Out</p>
                      <p className="font-medium">{employee.checkOut}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Total Hours</p>
                      <p className="font-medium">{employee.totalHours}</p>
                    </div>
                    <Badge
                      className={`${getStatusColor(employee.status)} text-white hover:scale-110 transition-transform duration-200`}
                    >
                      {employee.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className={`hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer ${
              animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
            }`}
            style={{ animationDelay: "1000ms" }}
          >
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-primary hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-lg font-semibold mb-2">Time Tracking</h3>
              <p className="text-sm text-muted-foreground mb-4">View detailed time logs and employee work hours</p>
              <Button className="w-full hover:scale-105 transition-transform duration-200">View Time Logs</Button>
            </CardContent>
          </Card>

          <Card
            className={`hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer ${
              animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
            }`}
            style={{ animationDelay: "1100ms" }}
          >
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-primary hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-lg font-semibold mb-2">Leave Requests</h3>
              <p className="text-sm text-muted-foreground mb-4">Manage employee leave requests and approvals</p>
              <Button className="w-full hover:scale-105 transition-transform duration-200">Manage Leaves</Button>
            </CardContent>
          </Card>

          <Card
            className={`hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer ${
              animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
            }`}
            style={{ animationDelay: "1200ms" }}
          >
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-lg font-semibold mb-2">Attendance Reports</h3>
              <p className="text-sm text-muted-foreground mb-4">Generate comprehensive attendance analytics</p>
              <Button className="w-full hover:scale-105 transition-transform duration-200">View Reports</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
