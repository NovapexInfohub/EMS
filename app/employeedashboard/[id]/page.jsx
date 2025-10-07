"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function EmployeeDashboard() {
  const router = useRouter();
  const { id } = useParams();

  // Mock employee data
  const employees = {
    1: {
      name: "Alice Johnson",
      department: "Engineering",
      position: "Frontend Developer",
      performance: 88,
      attendance: 96,
      status: "Active",
      description: "Specializes in React and UI design.",
    },
    2: {
      name: "Bob Smith",
      department: "HR",
      position: "HR Manager",
      performance: 75,
      attendance: 90,
      status: "Active",
      description: "Handles recruitment and employee relations.",
    },
    3: {
      name: "Charlie Lee",
      department: "Finance",
      position: "Accountant",
      performance: 82,
      attendance: 94,
      status: "On Leave",
      description: "Manages payroll and budgeting tasks.",
    },
  };

  const employee = employees[id] || {
    name: "Unknown",
    department: "N/A",
    position: "N/A",
    performance: 0,
    attendance: 0,
    status: "Inactive",
    description: "No data available",
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Back Button */}
      <div>
        <Button
          onClick={() => router.push("/employeedashboard")}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Employees
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-indigo-700">
            {employee.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p>
            <strong>Status:</strong>{" "}
            <Badge
              className={`${
                employee.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {employee.status}
            </Badge>
          </p>
          <p><strong>About:</strong> {employee.description}</p>
        </CardContent>
      </Card>

      {/* Performance Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>Overall Rating: {employee.performance}%</p>
            <Progress value={employee.performance} className="h-3" />
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>Attendance Rate: {employee.attendance}%</p>
            <Progress value={employee.attendance} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
            <p className="font-medium">Team Meeting</p>
            <p className="text-sm text-gray-500">Today, 2:00 PM</p>
          </div>
          <div className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
            <p className="font-medium">Project Review</p>
            <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
