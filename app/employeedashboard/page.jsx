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
    // Fetch real employee data later
  }, []);

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 space-y-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-4xl font-extrabold text-indigo-700 flex items-center gap-2">
           Welcome, {employee.name}
        </h1>
        <Badge
          className={`text-sm px-4 py-2 rounded-full font-medium shadow-md ${
            employee.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {employee.status}
        </Badge>
      </div>

      {/* ===== Overview Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/** Profile **/}
        <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md transition-all duration-300">
          <CardHeader className="flex items-center gap-3 p-4">
            <User className="text-indigo-600 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">Profile Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 p-4">
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Employee ID:</strong> {employee.id}</p>
          </CardContent>
        </motion.div>

        {/** Attendance **/}
        <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md transition-all duration-300">
          <CardHeader className="flex items-center gap-3 p-4">
            <CalendarDays className="text-indigo-600 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4">
            <p className="text-gray-700 font-medium">Attendance Rate: {employee.attendance}%</p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${employee.attendance}%` }}
              className="h-3 bg-indigo-500 rounded-full"
            ></motion.div>
            <Button
              onClick={() => router.push(`/employeedashboard/${employee.id}/attendance`)}
              className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200"
            >
              View Details
            </Button>
          </CardContent>
        </motion.div>

        {/** Performance **/}
        <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md transition-all duration-300">
          <CardHeader className="flex items-center gap-3 p-4">
            <TrendingUp className="text-indigo-600 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4">
            <p className="text-gray-700 font-medium">
              Performance Score: {employee.performance}%
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${employee.performance}%` }}
              className="h-3 bg-green-500 rounded-full"
            ></motion.div>
            <Button
              onClick={() => router.push(`/employeedashboard/${employee.id}/performance`)}
              className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200"
            >
              View Details
            </Button>
          </CardContent>
        </motion.div>
      </div>

      {/* ===== Company Overview ===== */}
      <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md transition-all duration-300">
        <CardHeader className="flex items-center gap-3 p-4">
          <Building2 className="text-indigo-600 w-6 h-6" />
          <CardTitle className="text-lg font-semibold">Company Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700 p-4">
          <p><strong>Company Name:</strong> Novapex Infohub</p>
          <p><strong>Mission:</strong> Empowering education and digital learning for underprivileged children.</p>
          <p><strong>Departments:</strong> Engineering, HR, Finance, Training, Operations.</p>
          <p><strong>Achievements:</strong> Launched 15+ learning programs and impacted over 10,000 students globally.</p>
        </CardContent>
      </motion.div>

      {/* ===== Projects ===== */}
      <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md transition-all duration-300">
        <CardHeader className="flex items-center gap-3 p-4">
          <ClipboardList className="text-indigo-600 w-6 h-6" />
          <CardTitle className="text-lg font-semibold">Current Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          {employee.projects.map((project, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-gray-700 font-medium">{project.title}</p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                className="h-3 bg-indigo-500 rounded-full"
              ></motion.div>
            </div>
          ))}
        </CardContent>
      </motion.div>

      {/* ===== Skills ===== */}
      <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md transition-all duration-300">
        <CardHeader className="flex items-center gap-3 p-4">
          <BookOpen className="text-indigo-600 w-6 h-6" />
          <CardTitle className="text-lg font-semibold">Skills</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 p-4">
          {employee.skills.map((skill, index) => (
            <Badge
              key={index}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium shadow-sm hover:scale-105 transition-transform duration-200"
            >
              {skill}
            </Badge>
          ))}
        </CardContent>
      </motion.div>

      {/* ===== Goals & Feedback ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/** Goals **/}
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md transition-all duration-300">
          <CardHeader className="flex items-center gap-3 p-4">
            <Target className="text-indigo-600 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4">
            {employee.goals.map((goal, idx) => (
              <div key={idx} className="p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-all">
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
        </motion.div>

        {/** Feedback **/}
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md transition-all duration-300">
          <CardHeader className="flex items-center gap-3 p-4">
            <MessageSquare className="text-indigo-600 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            {employee.feedback.map((fb, idx) => (
              <div key={idx} className="p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-all">
                <p className="text-sm text-gray-500 mb-1">
                  {fb.date} • {fb.from}
                </p>
                <p className="font-medium">{fb.comment}</p>
              </div>
            ))}
          </CardContent>
        </motion.div>
      </div>

      {/* ===== Upcoming Events ===== */}
      <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md transition-all duration-300">
        <CardHeader className="p-4">
          <CardTitle className="text-indigo-700 text-lg font-semibold">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4">
          {employee.upcomingEvents.length > 0 ? (
            employee.upcomingEvents.map((event, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-all"
              >
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No upcoming events.</p>
          )}
        </CardContent>
      </motion.div>

      {/* ===== Contact ===== */}
      <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md transition-all duration-300">
        <CardHeader className="flex items-center gap-3 p-4">
          <PhoneCall className="text-indigo-600 w-6 h-6" />
          <CardTitle className="text-lg font-semibold">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-2 p-4">
          <p>📧 HR Email: hr@bigbuddy.org</p>
          <p>📞 Support: +91 98765 43210</p>
          <p>💬 Reach out for leave requests, performance queries, or IT issues.</p>
        </CardContent>
      </motion.div>
    </motion.main>
  );
}
