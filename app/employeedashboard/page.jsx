"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  User,
  CalendarDays,
  BookOpen,
  TrendingUp,
  Building2,
  ClipboardList,
  Target,
  MessageSquare,
  PhoneCall,
} from "lucide-react";

export default function EmployeeDashboardMain() {
  const router = useRouter();

  // Mock employee (replace with backend API call later)
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
    projects: [
      { title: "Website Revamp", progress: 85 },
      { title: "Employee Portal", progress: 60 },
      { title: "UI Component Library", progress: 40 },
    ],
    goals: [
      { title: "Improve React performance optimization", status: "In Progress" },
      { title: "Learn GraphQL basics", status: "Pending" },
    ],
    feedback: [
      {
        from: "Manager (Robert Brown)",
        comment: "Excellent consistency and teamwork shown in last sprint!",
        date: "2025-09-30",
      },
    ],
  });

  useEffect(() => {
    // You can fetch real data from backend later using:
    // fetch(`/api/employee/${id}`).then(...)
  }, []);

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8 space-y-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
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

      {/* ======== Overview Cards ======== */}
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
        <Card
          onClick={() => router.push(`/employeedashboard/${employee.id}/attendance`)}
          className="shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300"
        >
        {/* Attendance */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader className="flex items-center gap-3">
            <CalendarDays className="text-indigo-600 w-6 h-6" />
            <CardTitle>Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-2">
              Attendance Rate: {employee.attendance}%
            </p>
            <Progress value={employee.attendance} className="h-3" />
            <Button
              variant="outline"
              className="w-full mt-3 border-indigo-500 text-indigo-600 hover:bg-indigo-50"
            >
              View Details
            </Button>
          </CardContent>
        </Card>


        {/* Performance */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader className="flex items-center gap-3">
            <TrendingUp className="text-indigo-600 w-6 h-6" />
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-2">
              Performance Score: {employee.performance}%
            </p>
            <Progress value={employee.performance} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* ======== Company Overview ======== */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex items-center gap-3">
          <Building2 className="text-indigo-600 w-6 h-6" />
          <CardTitle>Company Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            <strong>Company Name:</strong> Big Buddy Foundation
          </p>
          <p>
            <strong>Mission:</strong> Empowering education and digital learning
            for underprivileged children.
          </p>
          <p>
            <strong>Departments:</strong> Engineering, HR, Finance, Training,
            Operations.
          </p>
          <p>
            <strong>Achievements:</strong> Launched 15+ learning programs and
            impacted over 10,000 students globally.
          </p>
        </CardContent>
      </Card>

      {/* ======== Employee Projects ======== */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex items-center gap-3">
          <ClipboardList className="text-indigo-600 w-6 h-6" />
          <CardTitle>Current Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {employee.projects.map((project, idx) => (
            <div key={idx}>
              <p className="text-gray-700 font-medium">{project.title}</p>
              <Progress value={project.progress} className="h-3" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ======== Skills Section ======== */}
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

      {/* ======== Goals & Feedback ======== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goals */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader className="flex items-center gap-3">
            <Target className="text-indigo-600 w-6 h-6" />
            <CardTitle>Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {employee.goals.map((goal, idx) => (
              <div
                key={idx}
                className="p-3 rounded-md border bg-gray-50 hover:bg-gray-100 transition"
              >
                <p className="font-medium">{goal.title}</p>
                <Badge
                  className={`mt-1 ${
                    goal.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {goal.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader className="flex items-center gap-3">
            <MessageSquare className="text-indigo-600 w-6 h-6" />
            <CardTitle>Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {employee.feedback.map((fb, idx) => (
              <div
                key={idx}
                className="p-3 rounded-md border bg-gray-50 hover:bg-gray-100"
              >
                <p className="text-sm text-gray-500 mb-1">
                  {fb.date} • {fb.from}
                </p>
                <p className="font-medium">{fb.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ======== Upcoming Events ======== */}
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

      {/* ======== Contact Section ======== */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex items-center gap-3">
          <PhoneCall className="text-indigo-600 w-6 h-6" />
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-2">
          <p>📧 HR Email: hr@bigbuddy.org</p>
          <p>📞 Support: +91 98765 43210</p>
          <p>
            💬 Reach out for leave requests, performance queries, or IT issues.
          </p>
        </CardContent>
      </Card>

    </motion.main>
  );
}
