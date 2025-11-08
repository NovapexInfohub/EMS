"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  LogIn,
  LogOut,
  CalendarDays,
  FileText,
  Timer,
  RefreshCcw,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function AttendanceModulePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const attendanceModules = [
    {
      title: "Check-In",
      icon: <LogIn className="w-6 h-6 text-green-600" />,
      description: "Mark your attendance when you start work.",
      route: null,
    },
    {
      title: "Check-Out",
      icon: <LogOut className="w-6 h-6 text-red-600" />,
      description: "Record your checkout time when you finish work.",
      route: null,
    },
    {
      title: "View Attendance Summary",
      icon: <CalendarDays className="w-6 h-6 text-blue-600" />,
      description: "Review your daily, weekly, and monthly attendance records.",
      route: `/employeedashboard/${id}/attendance/summary`,
    },
    {
      title: "Track Work Hours",
      icon: <Timer className="w-6 h-6 text-indigo-600" />,
      description: "Monitor your total work hours and productivity insights.",
      route: `/employeedashboard/${id}/attendance/workhours`,
    },
    {
      title: "View Overtime Records",
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      description: "Check your logged overtime and approvals.",
      route: `/employeedashboard/${id}/attendance/overtime`,
    },
    {
      title: "Request Attendance Regularization",
      icon: <RefreshCcw className="w-6 h-6 text-orange-600" />,
      description: "Submit a regularization request for missed or incorrect logs.",
      route: `/employeedashboard/${id}/attendance/regularization`,
    },
  ];

  return (
    <motion.main
      className="min-h-screen bg-gray-50 py-10 px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <Clock className="w-7 h-7 text-indigo-600" />
          Attendance Module
        </h1>

        <Button
          onClick={() => router.push(`/employeedashboard/${id}/attendance`)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          ← Back to Calendar
        </Button>
      </div>

      {/* ===== Attendance Module Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {attendanceModules.map((module, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card
              onClick={() => module.route && router.push(module.route)}
              className={`shadow-md hover:shadow-lg transition border border-gray-200 bg-white ${
                module.route ? "cursor-pointer hover:border-indigo-400" : "cursor-not-allowed opacity-90"
              }`}
            >
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-3 bg-gray-100 rounded-full">{module.icon}</div>
                <CardTitle className="text-lg text-gray-800">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{module.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
