"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"

export default function DepartmentsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  const departments = [
    {
      id: 1,
      name: "Engineering",
      description: "Software development and technical operations",
      headOfDepartment: "Sarah Johnson",
      headAvatar: "/professional-woman-manager.png",
      employeeCount: 45,
      budget: "$2,400,000",
      budgetUsed: 78,
      performance: 94,
      projects: 12,
      openPositions: 3,
    },
    {
      id: 2,
      name: "Sales",
      description: "Revenue generation and client acquisition",
      headOfDepartment: "Mike Chen",
      headAvatar: "/professional-man-sales.jpg",
      employeeCount: 32,
      budget: "$1,800,000",
      budgetUsed: 65,
      performance: 88,
      projects: 8,
      openPositions: 2,
    },
    {
      id: 3,
      name: "Marketing",
      description: "Brand management and customer engagement",
      headOfDepartment: "Emily Rodriguez",
      headAvatar: "/professional-woman-marketing.png",
      employeeCount: 28,
      budget: "$1,200,000",
      budgetUsed: 82,
      performance: 91,
      projects: 15,
      openPositions: 1,
    },
    {
      id: 4,
      name: "Human Resources",
      description: "Employee relations and organizational development",
      headOfDepartment: "Lisa Wang",
      headAvatar: "/professional-woman-hr.png",
      employeeCount: 12,
      budget: "$800,000",
      budgetUsed: 71,
      performance: 87,
      projects: 5,
      openPositions: 0,
    },
    {
      id: 5,
      name: "Finance",
      description: "Financial planning and accounting operations",
      headOfDepartment: "Alex Thompson",
      headAvatar: "/professional-person-finance.jpg",
      employeeCount: 18,
      budget: "$1,000,000",
      budgetUsed: 69,
      performance: 93,
      projects: 6,
      openPositions: 1,
    },
    {
      id: 6,
      name: "Operations",
      description: "Business operations and process optimization",
      headOfDepartment: "James Wilson",
      headAvatar: "/professional-man-operations.png",
      employeeCount: 22,
      budget: "$1,500,000",
      budgetUsed: 75,
      performance: 89,
      projects: 9,
      openPositions: 2,
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
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
          <h1 className="text-3xl font-bold text-foreground">Department Overview</h1>
          <p className="text-muted-foreground mt-2">Manage departments, budgets, and organizational structure</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 transition-colors">Create Department</Button>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">
              {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Employees</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{departments.length}</div>
            <p className="text-sm text-muted-foreground">Active Departments</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">
              {departments.reduce((sum, dept) => sum + dept.projects, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Active Projects</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">
              {departments.reduce((sum, dept) => sum + dept.openPositions, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Open Positions</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((department, index) => (
          <Card
            key={department.id}
            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom-5"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{department.name}</CardTitle>
                  <CardDescription className="mt-1">{department.description}</CardDescription>
                </div>
                <Badge variant="outline">{department.employeeCount} employees</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Department Head */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={department.headAvatar || "/placeholder.svg"} alt={department.headOfDepartment} />
                  <AvatarFallback>
                    {department.headOfDepartment
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{department.headOfDepartment}</p>
                  <p className="text-xs text-muted-foreground">Department Head</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Budget Usage</span>
                    <span className="text-sm text-muted-foreground">{department.budgetUsed}%</span>
                  </div>
                  <Progress value={department.budgetUsed} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{department.budget} allocated</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Performance</span>
                    <span className="text-sm text-muted-foreground">{department.performance}%</span>
                  </div>
                  <Progress value={department.performance} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Overall rating</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground">Projects: {department.projects}</span>
                  <span className="text-muted-foreground">Open roles: {department.openPositions}</span>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
