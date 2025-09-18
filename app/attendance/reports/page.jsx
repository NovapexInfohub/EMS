"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, PieChart, TrendingUp, Calendar, Download, Filter, ArrowLeft, Users, Clock } from "lucide-react"

export default function AttendanceReportsPage() {
  const [animateCards, setAnimateCards] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const reportStats = [
    { title: "Average Attendance", value: "94.5%", change: "+2.1%", icon: Users, color: "text-green-600" },
    { title: "On-Time Arrivals", value: "87.2%", change: "+1.5%", icon: Clock, color: "text-blue-600" },
    { title: "Overtime Hours", value: "245", change: "-8.3%", icon: TrendingUp, color: "text-orange-600" },
    { title: "Leave Utilization", value: "68.4%", change: "+5.2%", icon: Calendar, color: "text-purple-600" },
  ]

  const departmentAttendance = [
    { department: "Engineering", attendance: 96.2, employees: 45, color: "bg-blue-500" },
    { department: "Sales", attendance: 93.8, employees: 28, color: "bg-green-500" },
    { department: "Marketing", attendance: 91.5, employees: 22, color: "bg-purple-500" },
    { department: "Design", attendance: 94.7, employees: 12, color: "bg-orange-500" },
    { department: "HR", attendance: 97.1, employees: 8, color: "bg-red-500" },
  ]

  const monthlyTrends = [
    { month: "Jan", attendance: 92.5, target: 95 },
    { month: "Feb", attendance: 94.2, target: 95 },
    { month: "Mar", attendance: 93.8, target: 95 },
    { month: "Apr", attendance: 95.1, target: 95 },
    { month: "May", attendance: 94.5, target: 95 },
    { month: "Jun", attendance: 96.2, target: 95 },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-4 animate-in slide-in-from-left-5 duration-700">
          <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Attendance
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Attendance Reports</h1>
            <p className="text-muted-foreground">Comprehensive analytics and insights on employee attendance</p>
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

        {/* Period Selection */}
        <div className="flex gap-2 animate-in slide-in-from-top-3 duration-500">
          {["week", "month", "quarter", "year"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className="capitalize hover:scale-105 transition-transform duration-200"
            >
              {period}
            </Button>
          ))}
        </div>

        {/* Report Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportStats.map((stat, index) => (
            <Card
              key={index}
              className={`hover:shadow-xl hover:scale-105 transition-all duration-500 hover:-translate-y-1 ${
                animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} from last period
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <Card
            className={`hover:shadow-lg transition-all duration-500 ${
              animateCards ? "animate-in slide-in-from-left-4" : "opacity-0"
            }`}
            style={{ animationDelay: "600ms" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 animate-bounce" />
                Monthly Attendance Trends
              </CardTitle>
              <CardDescription>Attendance percentage over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrends.map((month, index) => (
                  <div
                    key={month.month}
                    className={`space-y-2 ${animateCards ? "animate-in slide-in-from-left-3" : "opacity-0"}`}
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{month.month}</span>
                      <span className="text-muted-foreground">{month.attendance}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          month.attendance >= month.target ? "bg-green-500" : "bg-orange-500"
                        }`}
                        style={{
                          width: animateCards ? `${month.attendance}%` : "0%",
                          transitionDelay: `${900 + index * 150}ms`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Target: {month.target}%</span>
                      <span className={month.attendance >= month.target ? "text-green-600" : "text-orange-600"}>
                        {month.attendance >= month.target ? "✓ Met" : "Below target"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Breakdown */}
          <Card
            className={`hover:shadow-lg transition-all duration-500 ${
              animateCards ? "animate-in slide-in-from-right-4" : "opacity-0"
            }`}
            style={{ animationDelay: "600ms" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 animate-spin" style={{ animationDuration: "3s" }} />
                Department Attendance
              </CardTitle>
              <CardDescription>Attendance rates by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentAttendance.map((dept, index) => (
                  <div
                    key={dept.department}
                    className={`flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-all duration-300 ${
                      animateCards ? "animate-in slide-in-from-right-3" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${dept.color}`} />
                      <div>
                        <p className="font-medium">{dept.department}</p>
                        <p className="text-sm text-muted-foreground">{dept.employees} employees</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{dept.attendance}%</p>
                      <Badge
                        variant={dept.attendance >= 95 ? "default" : "secondary"}
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        {dept.attendance >= 95 ? "Excellent" : "Good"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className={`hover:shadow-lg transition-all duration-500 ${
              animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
            }`}
            style={{ animationDelay: "1000ms" }}
          >
            <CardHeader>
              <CardTitle className="text-lg">Peak Hours Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { time: "9:00 AM", percentage: 85, label: "Most arrivals" },
                  { time: "6:00 PM", percentage: 78, label: "Most departures" },
                  { time: "12:00 PM", percentage: 92, label: "Peak presence" },
                ].map((peak, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{peak.time}</span>
                      <span className="text-muted-foreground">{peak.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: animateCards ? `${peak.percentage}%` : "0%",
                          transitionDelay: `${1200 + index * 200}ms`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{peak.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card
            className={`hover:shadow-lg transition-all duration-500 ${
              animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
            }`}
            style={{ animationDelay: "1100ms" }}
          >
            <CardHeader>
              <CardTitle className="text-lg">Leave Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">68.4%</div>
                <p className="text-sm text-muted-foreground mb-4">Leave utilization rate</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Annual Leave</span>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Sick Leave</span>
                    <span>15%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Personal Leave</span>
                    <span>8.4%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`hover:shadow-lg transition-all duration-500 ${
              animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
            }`}
            style={{ animationDelay: "1200ms" }}
          >
            <CardHeader>
              <CardTitle className="text-lg">Productivity Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">8.2h</div>
                <p className="text-sm text-muted-foreground mb-4">Average daily hours</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Regular hours</span>
                    <span>7.8h</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Overtime</span>
                    <span>0.4h</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Efficiency</span>
                    <span>94%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
