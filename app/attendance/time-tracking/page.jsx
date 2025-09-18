"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  Filter,
  Search,
  Download,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export default function TimeTrackingPage() {
  const [animateCards, setAnimateCards] = useState(false)
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  )
const [openDept, setOpenDept] = useState(null)
  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // ✅ Extended with department
  const timeEntries = [
    {
      employee: "Sarah Johnson",
      avatar: "/diverse-woman-portrait.png",
      department: "Engineering",
      date: "2024-01-15",
      checkIn: "09:00 AM",
      checkOut: "06:15 PM",
      breakTime: "1h 00m",
      totalHours: "8h 15m",
      status: "Completed",
      project: "Web Application",
    },
    {
      employee: "Michael Chen",
      avatar: "/thoughtful-man.png",
      department: "Engineering",
      date: "2024-01-15",
      checkIn: "08:45 AM",
      checkOut: "05:30 PM",
      breakTime: "45m",
      totalHours: "8h 00m",
      status: "Completed",
      project: "Mobile App",
    },
    {
      employee: "Emily Davis",
      avatar: "/diverse-woman-portrait.png",
      department: "Design",
      date: "2024-01-15",
      checkIn: "09:15 AM",
      checkOut: "--",
      breakTime: "30m",
      totalHours: "6h 30m",
      status: "In Progress",
      project: "UI Design",
    },
    {
      employee: "David Wilson",
      avatar: "/thoughtful-man.png",
      department: "Data Analytics",
      date: "2024-01-15",
      checkIn: "09:30 AM",
      checkOut: "--",
      breakTime: "15m",
      totalHours: "6h 15m",
      status: "In Progress",
      project: "Data Analysis",
    },
  ]

  const weeklyStats = [
    { day: "Mon", hours: 8.5, target: 8 },
    { day: "Tue", hours: 7.8, target: 8 },
    { day: "Wed", hours: 8.2, target: 8 },
    { day: "Thu", hours: 8.0, target: 8 },
    { day: "Fri", hours: 7.5, target: 8 },
  ]

  // Group entries by department
const groupedEntries = timeEntries.reduce((acc, entry) => {
  if (!acc[entry.department]) {
    acc[entry.department] = [];
  }
  acc[entry.department].push(entry);
  return acc;
}, {});


  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-in slide-in-from-left-5 duration-700">
          <Button
            variant="ghost"
            size="sm"
            className="hover:scale-105 transition-transform duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Attendance
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Time Tracking
            </h1>
            <p className="text-muted-foreground">
              Monitor employee work hours and productivity
            </p>
          </div>
        </div>

        {/* Weekly Overview */}
        <Card
          className={`hover:shadow-lg transition-all duration-500 ${
            animateCards ? "animate-in slide-in-from-left-4" : "opacity-0"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          <CardHeader>
            <CardTitle>Weekly Hours Overview</CardTitle>
            <CardDescription>
              Track daily progress against targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {weeklyStats.map((day, index) => (
                <div
                  key={day.day}
                  className={`text-center p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-300 ${
                    animateCards
                      ? "animate-in slide-in-from-bottom-3"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <p className="text-sm font-medium mb-2">{day.day}</p>
                  <div className="space-y-2">
                    <p className="text-lg font-bold">{day.hours}h</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          day.hours >= day.target
                            ? "bg-green-500"
                            : "bg-orange-500"
                        }`}
                        style={{
                          width: animateCards
                            ? `${(day.hours / day.target) * 100}%`
                            : "0%",
                          transitionDelay: `${500 + index * 150}ms`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Target: {day.target}h
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="animate-in slide-in-from-top-5 duration-500">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="pl-10 pr-4 py-2 w-full bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                />
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
              />
              <Button
                variant="outline"
                className="hover:scale-105 transition-transform duration-200 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Time Entries Grouped by Department (Accordion style) */}
        <Card
          className={`hover:shadow-lg transition-all duration-500 ${
            animateCards ? "animate-in slide-in-from-bottom-5" : "opacity-0"
          }`}
          style={{ animationDelay: "600ms" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 animate-pulse" />
              Time Entries
            </CardTitle>
            <CardDescription>
              Click a department to view employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.keys(groupedEntries).map((department, idx) => (
                <Card
                  key={idx}
                  className="border border-border hover:shadow-md transition-all duration-300"
                >
                  <CardHeader
                    onClick={() =>
                      setOpenDept(openDept === department ? null : department)
                    }
                    className="flex flex-row justify-between items-center cursor-pointer"
                  >
                    <div>
                      <CardTitle>{department}</CardTitle>
                      <CardDescription>
                        {groupedEntries[department].length} employees
                      </CardDescription>
                    </div>
                    {openDept === department ? <ChevronUp /> : <ChevronDown />}
                  </CardHeader>

                  {openDept === department && (
                    <CardContent className="space-y-4">
                      {groupedEntries[department].map((entry, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-300"
                        >
                          {/* Employee Info */}
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12 hover:scale-110 transition-transform duration-200">
                              <AvatarImage
                                src={entry.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {entry.employee
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{entry.employee}</p>
                              <p className="text-sm text-muted-foreground">
                                {entry.project}
                              </p>
                            </div>
                          </div>

                          {/* Time Details */}
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">
                                Check In
                              </p>
                              <p className="font-medium">{entry.checkIn}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">
                                Check Out
                              </p>
                              <p className="font-medium">{entry.checkOut}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">
                                Break
                              </p>
                              <p className="font-medium">{entry.breakTime}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">
                                Total
                              </p>
                              <p className="font-medium">{entry.totalHours}</p>
                            </div>
                            <Badge
                              variant={
                                entry.status === "Completed"
                                  ? "default"
                                  : "secondary"
                              }
                              className="hover:scale-110 transition-transform duration-200"
                            >
                              {entry.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
