"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  const metrics = [
    { label: "Employee Satisfaction", value: 87, change: "+5%", trend: "up" },
    { label: "Productivity Index", value: 92, change: "+12%", trend: "up" },
    { label: "Turnover Rate", value: 8, change: "-3%", trend: "down" },
    { label: "Training Completion", value: 94, change: "+8%", trend: "up" },
  ]

  const departmentData = [
    { name: "Engineering", employees: 45, productivity: 95, satisfaction: 89 },
    { name: "Sales", employees: 32, productivity: 88, satisfaction: 85 },
    { name: "Marketing", employees: 28, productivity: 91, satisfaction: 92 },
    { name: "HR", employees: 12, productivity: 87, satisfaction: 88 },
    { name: "Finance", employees: 18, productivity: 93, satisfaction: 86 },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">Comprehensive insights into your organization's performance</p>
        </div>
        <div className="flex items-center space-x-2">
          {["7d", "30d", "90d", "1y"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="transition-all duration-200"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={metric.label} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">{metric.label}</h3>
                <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                  {metric.change}
                </Badge>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{metric.value}%</div>
              <Progress value={metric.value} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Detailed breakdown by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {departmentData.map((dept, index) => (
              <div
                key={dept.name}
                className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-300 animate-in slide-in-from-left-5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{dept.name}</h4>
                    <p className="text-sm text-muted-foreground">{dept.employees} employees</p>
                  </div>
                  <Badge variant="outline">{dept.employees} people</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Productivity</span>
                      <span className="text-sm text-muted-foreground">{dept.productivity}%</span>
                    </div>
                    <Progress value={dept.productivity} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Satisfaction</span>
                      <span className="text-sm text-muted-foreground">{dept.satisfaction}%</span>
                    </div>
                    <Progress value={dept.satisfaction} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trends Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>Historical data over the selected time period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-muted-foreground">Interactive charts would be displayed here</p>
              <p className="text-sm text-muted-foreground mt-1">Integration with charting library needed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
