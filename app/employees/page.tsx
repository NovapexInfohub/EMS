"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
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
      avatar: "/professional-woman-diverse.png",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      department: "Sales",
      position: "Sales Manager",
      status: "Active",
      joinDate: "2021-08-22",
      avatar: "/professional-man.png",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      department: "Marketing",
      position: "Marketing Specialist",
      status: "Active",
      joinDate: "2023-01-10",
      avatar: "/professional-woman-marketing.png",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@company.com",
      department: "Engineering",
      position: "Frontend Developer",
      status: "On Leave",
      joinDate: "2022-11-05",
      avatar: "/professional-man-developer.png",
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      department: "HR",
      position: "HR Manager",
      status: "Active",
      joinDate: "2020-06-18",
      avatar: "/professional-woman-hr.png",
    },
    {
      id: 6,
      name: "Alex Thompson",
      email: "alex.thompson@company.com",
      department: "Finance",
      position: "Financial Analyst",
      status: "Active",
      joinDate: "2023-04-12",
      avatar: "/professional-person-finance.jpg",
    },
  ]

  const departments = ["all", "Engineering", "Sales", "Marketing", "HR", "Finance"]

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-muted rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="h-3 bg-muted rounded w-32"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Directory</h1>
          <p className="text-muted-foreground mt-2">Manage and view all employees in your organization</p>
        </div>
        <Link href="/employees/add">
          <Button className="bg-primary hover:bg-primary/90 transition-colors">Add New Employee</Button>
        </Link>
      </motion.div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search employees by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={filterDepartment === dept ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterDepartment(dept)}
                  className="transition-all duration-200"
                >
                  {dept === "all" ? "All Departments" : dept}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className="transition-all duration-300 hover:shadow-lg hover:border-blue-500 hover:scale-[1.02]"
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={employee.avatar || "/placeholder.svg?height=48&width=48"}
                      alt={employee.name}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                  </div>
                  <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
                    {employee.status}
                  </Badge>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center">
                    <span className="text-muted-foreground w-20">Email:</span>
                    <span className="text-foreground truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground w-20">Department:</span>
                    <Badge variant="outline" className="text-xs">{employee.department}</Badge>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground w-20">Joined:</span>
                    <span className="text-foreground">{new Date(employee.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold mb-2">No employees found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
