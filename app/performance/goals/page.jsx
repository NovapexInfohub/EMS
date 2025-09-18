"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Filter, ArrowLeft, CheckCircle, Clock, AlertCircle, Edit } from "lucide-react"

export default function GoalTrackingPage() {
  const [animateCards, setAnimateCards] = useState(false)
  const [showNewGoal, setShowNewGoal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const goals = [
    {
      id: 1,
      employee: "Sarah Johnson",
      avatar: "/diverse-woman-portrait.png",
      department: "Engineering",
      title: "Complete React Migration Project",
      description: "Migrate legacy components to React 18 with improved performance",
      category: "Technical",
      priority: "High",
      progress: 85,
      status: "In Progress",
      dueDate: "2024-03-15",
      createdDate: "2024-01-01",
      milestones: [
        { title: "Component Analysis", completed: true },
        { title: "Migration Plan", completed: true },
        { title: "Core Components", completed: true },
        { title: "Testing & QA", completed: false },
        { title: "Deployment", completed: false },
      ],
    },
    {
      id: 2,
      employee: "Michael Chen",
      avatar: "/thoughtful-man.png",
      department: "Product",
      title: "Launch New Feature Set",
      description: "Design and launch user dashboard with analytics capabilities",
      category: "Product",
      priority: "High",
      progress: 100,
      status: "Completed",
      dueDate: "2024-02-01",
      createdDate: "2023-12-01",
      milestones: [
        { title: "Requirements Gathering", completed: true },
        { title: "Design Mockups", completed: true },
        { title: "Development", completed: true },
        { title: "User Testing", completed: true },
        { title: "Launch", completed: true },
      ],
    },
    {
      id: 3,
      employee: "Emily Davis",
      avatar: "/diverse-woman-portrait.png",
      department: "Design",
      title: "Improve Design System",
      description: "Create comprehensive design system with reusable components",
      category: "Design",
      priority: "Medium",
      progress: 60,
      status: "In Progress",
      dueDate: "2024-04-30",
      createdDate: "2024-01-15",
      milestones: [
        { title: "Audit Current Components", completed: true },
        { title: "Define Standards", completed: true },
        { title: "Create Component Library", completed: false },
        { title: "Documentation", completed: false },
        { title: "Team Training", completed: false },
      ],
    },
    {
      id: 4,
      employee: "David Wilson",
      avatar: "/thoughtful-man.png",
      department: "Analytics",
      title: "Implement Advanced Analytics",
      description: "Set up comprehensive analytics dashboard for business insights",
      category: "Analytics",
      priority: "Medium",
      progress: 25,
      status: "At Risk",
      dueDate: "2024-03-30",
      createdDate: "2024-01-10",
      milestones: [
        { title: "Data Source Integration", completed: true },
        { title: "Dashboard Framework", completed: false },
        { title: "Visualization Components", completed: false },
        { title: "Performance Optimization", completed: false },
        { title: "User Training", completed: false },
      ],
    },
  ]

  const goalStats = [
    { title: "Total Goals", value: "24", color: "text-blue-600" },
    { title: "Completed", value: "8", color: "text-green-600" },
    { title: "In Progress", value: "12", color: "text-orange-600" },
    { title: "At Risk", value: "4", color: "text-red-600" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "At Risk":
        return "bg-red-500"
      case "Not Started":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-orange-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return CheckCircle
      case "In Progress":
        return Clock
      case "At Risk":
        return AlertCircle
      default:
        return Clock
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-4 animate-in slide-in-from-left-5 duration-700">
          <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Performance
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Goal Tracking</h1>
            <p className="text-muted-foreground">Monitor employee goals and objectives progress</p>
          </div>
          <Button
            onClick={() => setShowNewGoal(true)}
            className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>

        {/* Goal Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {goalStats.map((stat, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg hover:scale-105 transition-all duration-500 ${
                animateCards ? "animate-in slide-in-from-top-3" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card className="animate-in slide-in-from-top-5 duration-500">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search goals by title or employee..."
                  className="pl-10 pr-4 py-2 w-full bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                />
              </div>
              <select className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300">
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="at-risk">At Risk</option>
                <option value="not-started">Not Started</option>
              </select>
              <select className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300">
                <option value="">All Categories</option>
                <option value="technical">Technical</option>
                <option value="product">Product</option>
                <option value="design">Design</option>
                <option value="analytics">Analytics</option>
              </select>
              <Button variant="outline" className="hover:scale-105 transition-transform duration-200 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Goals List */}
        <div className="space-y-6">
          {goals.map((goal, index) => (
            <Card
              key={goal.id}
              className={`hover:shadow-xl hover:scale-105 transition-all duration-500 hover:-translate-y-1 ${
                animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
              }`}
              style={{ animationDelay: `${600 + index * 150}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 hover:scale-110 transition-transform duration-200">
                      <AvatarImage src={goal.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {goal.employee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {goal.employee} • {goal.department}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{goal.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${getPriorityColor(goal.priority)} text-white hover:scale-110 transition-transform duration-200`}
                    >
                      {goal.priority}
                    </Badge>
                    <Badge
                      className={`${getStatusColor(goal.status)} text-white hover:scale-110 transition-transform duration-200`}
                    >
                      {(() => {
                        const IconComponent = getStatusIcon(goal.status)
                        return <IconComponent className="w-3 h-3 mr-1" />
                      })()}
                      {goal.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            goal.progress === 100
                              ? "bg-green-500"
                              : goal.progress >= 75
                                ? "bg-blue-500"
                                : goal.progress >= 50
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                          }`}
                          style={{
                            width: animateCards ? `${goal.progress}%` : "0%",
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">{goal.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{goal.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">{new Date(goal.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Milestones</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {goal.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 p-2 rounded-lg border ${
                          milestone.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            milestone.completed ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-xs ${milestone.completed ? "text-green-700" : "text-gray-600"}`}>
                          {milestone.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 hover:scale-105 transition-transform duration-200">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Goal
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform duration-200 bg-transparent"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
