"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"

export default function ProfilesPage() {
  const [selectedEmployee, setSelectedEmployee] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  const employees = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Engineering",
      position: "Senior Developer",
      status: "Active",
      joinDate: "2022-03-15",
      avatar: "/professional-woman-developer.png",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Street, San Francisco, CA 94105",
      salary: "$95,000",
      manager: "John Smith",
      skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
      performance: 94,
      projects: 8,
      completedTasks: 156,
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      department: "Sales",
      position: "Sales Manager",
      status: "Active",
      joinDate: "2021-08-22",
      avatar: "/professional-man-sales.jpg",
      phone: "+1 (555) 234-5678",
      address: "456 Business Ave, New York, NY 10001",
      salary: "$85,000",
      manager: "Lisa Rodriguez",
      skills: ["Sales Strategy", "CRM", "Negotiation", "Lead Generation"],
      performance: 88,
      projects: 12,
      completedTasks: 203,
    },
  ]

  const currentEmployee = employees.find((emp) => emp.id === selectedEmployee) || employees[0]

  const performanceData = [
    { month: "Jan", score: 85 },
    { month: "Feb", score: 88 },
    { month: "Mar", score: 92 },
    { month: "Apr", score: 89 },
    { month: "May", score: 94 },
    { month: "Jun", score: 91 },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3 animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Profiles</h1>
          <p className="text-muted-foreground mt-2">Detailed view of employee information and performance</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 transition-colors">Export Profile</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Employee List */}
        <Card className="animate-in slide-in-from-left-5">
          <CardHeader>
            <CardTitle>Select Employee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {employees.map((employee) => (
              <Button
                key={employee.id}
                variant={selectedEmployee === employee.id ? "default" : "ghost"}
                className="w-full justify-start h-auto p-3"
                onClick={() => setSelectedEmployee(employee.id)}
              >
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                  <AvatarFallback>
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-medium text-sm">{employee.name}</div>
                  <div className="text-xs text-muted-foreground">{employee.position}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Employee Details */}
        <Card className="lg:col-span-3 animate-in slide-in-from-right-5">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentEmployee.avatar || "/placeholder.svg"} alt={currentEmployee.name} />
                <AvatarFallback className="text-lg">
                  {currentEmployee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{currentEmployee.name}</CardTitle>
                <CardDescription className="text-lg">{currentEmployee.position}</CardDescription>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline">{currentEmployee.department}</Badge>
                  <Badge variant={currentEmployee.status === "Active" ? "default" : "secondary"}>
                    {currentEmployee.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{currentEmployee.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span>{currentEmployee.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Address:</span>
                        <span className="text-right">{currentEmployee.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Employment Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Join Date:</span>
                        <span>{new Date(currentEmployee.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Manager:</span>
                        <span>{currentEmployee.manager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Salary:</span>
                        <span>{currentEmployee.salary}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{currentEmployee.performance}%</div>
                      <p className="text-sm text-muted-foreground">Performance Score</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{currentEmployee.projects}</div>
                      <p className="text-sm text-muted-foreground">Active Projects</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{currentEmployee.completedTasks}</div>
                      <p className="text-sm text-muted-foreground">Completed Tasks</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Performance Trends</h4>
                  <div className="space-y-3">
                    {performanceData.map((data, index) => (
                      <div key={data.month} className="flex items-center space-x-4">
                        <span className="w-12 text-sm text-muted-foreground">{data.month}</span>
                        <Progress value={data.score} className="flex-1" />
                        <span className="w-12 text-sm font-medium">{data.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentEmployee.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Employment History</h4>
                  <div className="space-y-3">
                    <div className="border-l-2 border-primary pl-4">
                      <div className="font-medium">Senior Developer</div>
                      <div className="text-sm text-muted-foreground">March 2022 - Present</div>
                      <div className="text-sm">Promoted to senior role with increased responsibilities</div>
                    </div>
                    <div className="border-l-2 border-muted pl-4">
                      <div className="font-medium">Junior Developer</div>
                      <div className="text-sm text-muted-foreground">March 2022 - March 2023</div>
                      <div className="text-sm">Started as junior developer in the engineering team</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
