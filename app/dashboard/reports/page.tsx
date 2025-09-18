"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const reports = [
    {
      id: 1,
      title: "Monthly Attendance Report",
      description: "Comprehensive attendance tracking for all employees",
      type: "Attendance",
      lastGenerated: "2 hours ago",
      status: "Ready",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "Payroll Summary Q4",
      description: "Quarterly payroll breakdown and analysis",
      type: "Payroll",
      lastGenerated: "1 day ago",
      status: "Ready",
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "Performance Review Analytics",
      description: "Employee performance metrics and trends",
      type: "Performance",
      lastGenerated: "3 days ago",
      status: "Ready",
      size: "3.2 MB",
    },
    {
      id: 4,
      title: "Department Productivity Report",
      description: "Cross-departmental productivity comparison",
      type: "Analytics",
      lastGenerated: "5 days ago",
      status: "Generating",
      size: "Pending",
    },
    {
      id: 5,
      title: "Employee Satisfaction Survey",
      description: "Annual satisfaction survey results and insights",
      type: "Survey",
      lastGenerated: "1 week ago",
      status: "Ready",
      size: "4.1 MB",
    },
  ]

  const quickReports = [
    { name: "Today's Attendance", icon: "👥", description: "Current day attendance status" },
    { name: "Pending Approvals", icon: "⏳", description: "Items requiring manager approval" },
    { name: "Payroll Preview", icon: "💰", description: "Next payroll cycle preview" },
    { name: "Leave Calendar", icon: "📅", description: "Upcoming leave schedule" },
  ]

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports Center</h1>
          <p className="text-muted-foreground mt-2">Generate, view, and manage all your organizational reports</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 transition-colors">Create New Report</Button>
      </div>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
          <CardDescription>Generate instant reports for common metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickReports.map((report, index) => (
              <Button
                key={report.name}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary/10 hover:border-primary transition-all duration-300 animate-in slide-in-from-top-5 bg-transparent"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl">{report.icon}</div>
                <div className="text-center">
                  <div className="font-medium text-sm">{report.name}</div>
                  <div className="text-xs text-muted-foreground">{report.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
          <CardDescription>Browse and download your generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              placeholder="Search reports by name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="space-y-4">
            {filteredReports.map((report, index) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-300 animate-in slide-in-from-left-5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold">{report.title}</h4>
                    <Badge variant="outline">{report.type}</Badge>
                    <Badge variant={report.status === "Ready" ? "default" : "secondary"}>{report.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{report.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Last generated: {report.lastGenerated}</span>
                    <span>Size: {report.size}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled={report.status !== "Ready"}>
                    Preview
                  </Button>
                  <Button size="sm" disabled={report.status !== "Ready"}>
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
