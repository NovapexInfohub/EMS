"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { User, CalendarDays, BookOpen, TrendingUp } from "lucide-react";

export default function EmployeeDashboardMain() {
  const router = useRouter();

  // 🧠 Mock employee (replace with API call later)
  const [employee, setEmployee] = useState({
    id: 101,
    name: "Alice Johnson",
    department: "Engineering",
    position: "Frontend Developer",
    status: "Active",
    performance: 88,
    attendance: 96,
    skills: ["React", "Next.js", "Tailwind CSS", "REST APIs"],
    upcomingEvents: [
      { title: "Team Meeting", date: "2025-10-06", time: "10:00 AM" },
      { title: "Performance Review", date: "2025-10-10", time: "3:00 PM" },
    ],
  });

  // Example: useEffect(() => fetch(`/api/employees/${id}`)...) for backend integration
  useEffect(() => {
    // TODO: Fetch from Spring Boot backend later
  }, []);

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8 space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-indigo-700">
          👤 Welcome, {employee.name}
        </h1>
        <Badge
          className={`text-sm px-3 py-1 ${
            employee.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {employee.status}
        </Badge>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader className="flex items-center gap-3">
            <User className="text-indigo-600 w-6 h-6" />
            <CardTitle>Profile Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Employee ID:</strong> {employee.id}</p>
          </CardContent>
        </Card>

        {/* Attendance Card */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader className="flex items-center gap-3">
            <CalendarDays className="text-indigo-600 w-6 h-6" />
            <CardTitle>Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">Attendance Rate: {employee.attendance}%</p>
            <Progress value={employee.attendance} className="h-3" />
          </CardContent>
        </Card>

        {/* Performance Card */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader className="flex items-center gap-3">
            <TrendingUp className="text-indigo-600 w-6 h-6" />
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">Performance Score: {employee.performance}%</p>
            <Progress value={employee.performance} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Skills Section */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex items-center gap-3">
          <BookOpen className="text-indigo-600 w-6 h-6" />
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {employee.skills.map((skill, index) => (
            <Badge key={index} className="bg-indigo-100 text-indigo-700">
              {skill}
            </Badge>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-indigo-700">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {employee.upcomingEvents.length > 0 ? (
            employee.upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-all"
              >
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">
                  {event.date} • {event.time}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No upcoming events.</p>
          )}
        </CardContent>
      </Card>

      {/* Button to View Admin or Edit Info */}
      <div className="flex justify-end">
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Go to Admin Dashboard
        </Button>
      </div>
    </motion.main>
  );
}
