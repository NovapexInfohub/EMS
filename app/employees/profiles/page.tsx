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
      passportNo: "P1234567",
      passportExpiry: "2028-05-15",
      visaType: "H1-B",
      visaExpiry: "2026-09-10",
      bankName: "Bank of America",
      accountNo: "1234567890",
      ifscCode: "BOFAUS3N",
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
      passportNo: "M9876543",
      passportExpiry: "2027-12-01",
      visaType: "Work Visa",
      visaExpiry: "2025-08-30",
      bankName: "Chase Bank",
      accountNo: "9876543210",
      ifscCode: "CHASUS33",
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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="information">Information</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-semibold">Email:</span> {currentEmployee.email}</div>
                  <div><span className="font-semibold">Phone:</span> {currentEmployee.phone}</div>
                  <div><span className="font-semibold">Address:</span> {currentEmployee.address}</div>
                  <div><span className="font-semibold">Join Date:</span> {currentEmployee.joinDate}</div>
                  <div><span className="font-semibold">Manager:</span> {currentEmployee.manager}</div>
                  <div><span className="font-semibold">Salary:</span> {currentEmployee.salary}</div>
                </div>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-2">Overall Performance</h4>
                  <Progress value={currentEmployee.performance} className="h-2" />
                  <p className="text-sm mt-1">{currentEmployee.performance}% Efficiency</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div><span className="font-semibold">Projects:</span> {currentEmployee.projects}</div>
                  <div><span className="font-semibold">Tasks Completed:</span> {currentEmployee.completedTasks}</div>
                  <div><span className="font-semibold">Recent Score:</span> {performanceData[performanceData.length-1].score}</div>
                </div>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-4 mt-6">
                <div className="flex flex-wrap gap-2">
                  {currentEmployee.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-4 mt-6">
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Joined on {currentEmployee.joinDate}</li>
                  <li>Assigned under manager {currentEmployee.manager}</li>
                  <li>Worked on {currentEmployee.projects} major projects</li>
                  <li>Completed {currentEmployee.completedTasks} tasks successfully</li>
                </ul>
              </TabsContent>

              {/* Information Tab (already existing) */}
              <TabsContent value="information" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Passport Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Passport No:</span>
                        <span>{currentEmployee.passportNo || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expiry Date:</span>
                        <span>{currentEmployee.passportExpiry || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Visa Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Visa Type:</span>
                        <span>{currentEmployee.visaType || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expiry Date:</span>
                        <span>{currentEmployee.visaExpiry || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Bank Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bank Name:</span>
                      <span>{currentEmployee.bankName || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account No:</span>
                      <span>{currentEmployee.accountNo || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IFSC Code:</span>
                      <span>{currentEmployee.ifscCode || "N/A"}</span>
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
