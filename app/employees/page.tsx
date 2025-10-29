"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi"; // search icon

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All Departments");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const employees = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Engineering",
      position: "Senior Developer",
      status: "Active",
      joinDate: "2022-03-12",
      avatar: "/professional-woman-diverse.png",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      department: "Sales",
      position: "Sales Manager",
      status: "Active",
      joinDate: "2021-08-12",
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
      department: "Frontend Developer",
      position: "Frontend Developer",
      status: "On Leave",
      joinDate: "2022-05-11",
      avatar: "/professional-man-developer.png",
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      department: "HR",
      position: "HR Manager",
      status: "Active",
      joinDate: "2020-02-15",
      avatar: "/professional-woman-hr.png",
    },
    {
      id: 6,
      name: "Alex Thompson",
      email: "alex.thompson@company.com",
      department: "Finance",
      position: "Financial Analyst",
      status: "Active",
      joinDate: "2023-01-01",
      avatar: "/professional-person-finance.jpg",
    },
  ];

  const departments = [
    "All Departments",
    "Engineering",
    "Sales",
    "Marketing",
    "HR",
    "Finance",
  ];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "All Departments" ||
      employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse bg-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Employee Directory
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and view all employees in your organization
          </p>
        </div>
        <Button className="bg-[#0066cc] hover:bg-[#005bb5] text-white rounded-md px-6 py-2 shadow-sm">
          Add new Employee
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3.5 text-gray-400 text-lg" />
          <Input
            type="text"
            placeholder="Search employees by name, email, or position"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-5 border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <Button
              key={dept}
              onClick={() => setFilterDepartment(dept)}
              variant="outline"
              className={`text-sm px-4 py-2 rounded-md ${
                filterDepartment === dept
                  ? "bg-[#0066cc] text-white border-[#0066cc]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {dept}
            </Button>
          ))}
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-[#e8f1ff] border border-[#d7e6ff] shadow-sm hover:shadow-md hover:border-[#80bfff] transition-all rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-gray-900">
                      {employee.name}
                    </h3>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                  </div>
                  <Badge
                    className={`text-xs px-2 py-1 ${
                      employee.status === "Active"
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                    }`}
                  >
                    {employee.status}
                  </Badge>
                </div>

                <div className="text-sm space-y-1 mb-5">
                  <p className="text-gray-700">
                    <strong className="text-gray-800">Email:</strong>{" "}
                    {employee.email}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-gray-800">Department:</strong>{" "}
                    {employee.department}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-gray-800">Joined:</strong>{" "}
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Equal-Sized Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-white text-[#0066cc] border border-[#0066cc] hover:bg-[#0066cc] hover:text-white text-sm font-medium">
                    Edit
                  </Button>
                  <Button className="flex-1 bg-[#0066cc] text-white hover:bg-[#005bb5] text-sm font-medium">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card className="text-center py-10 bg-[#e8f1ff] border border-[#d7e6ff]">
          <CardContent>
            <div className="text-5xl mb-3">👥</div>
            <h3 className="text-lg font-semibold text-gray-800">
              No employees found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
