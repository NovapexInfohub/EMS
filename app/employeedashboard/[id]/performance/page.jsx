"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Star,
  Award,
  BarChart3,
  ChevronLeft,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function EmployeePerformancePage({ params }) {
  // ✅ unwrap params using React.use()
  const { id } = React.use(params);
  const router = useRouter();

  // Mock performance data (replace with API call later)
  const [employee, setEmployee] = useState({
    id,
    name: "Alice Johnson",
    department: "Engineering",
    position: "Frontend Developer",
    performanceHistory: [
      { month: "May", score: 75 },
      { month: "Jun", score: 80 },
      { month: "Jul", score: 85 },
      { month: "Aug", score: 88 },
      { month: "Sep", score: 92 },
      { month: "Oct", score: 89 },
    ],
    taskCompletion: 93,
    collaboration: 87,
    creativity: 82,
    punctuality: 95,
    achievements: [
      "Built 5 new UI components for core product",
      "Led front-end migration to Next.js",
      "Received ‘Employee of the Month’ (August 2025)",
    ],
    feedback: [
      {
        from: "Manager (Robert Brown)",
        comment:
          "Alice consistently delivers quality work ahead of deadlines. Keep focusing on UI optimization!",
        date: "2025-09-30",
      },
      {
        from: "Team Lead (Sophia Lee)",
        comment:
          "Great collaboration in the last sprint! Continue maintaining that communication flow.",
        date: "2025-08-15",
      },
    ],
  });

  useEffect(() => {
    // Example future API call:
    // fetch(`/api/employees/${id}/performance`)
    //   .then(res => res.json())
    //   .then(setEmployee)
  }, [id]);

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8 space-y-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">
            📊 Performance Overview
          </h1>
          <p className="text-gray-600">
            Detailed performance analytics for <strong>{employee.name}</strong>
          </p>
        </div>

        <Button
          onClick={() => router.push(`/employeedashboard/${id}`)}
          className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </Button>
      </div>

      {/* ===== Performance Chart ===== */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex items-center gap-3">
          <BarChart3 className="text-indigo-600 w-6 h-6" />
          <CardTitle>Performance Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={employee.performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ===== Performance Breakdown ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Task Completion", value: employee.taskCompletion },
          { title: "Collaboration", value: employee.collaboration },
          { title: "Creativity", value: employee.creativity },
          { title: "Punctuality", value: employee.punctuality },
        ].map((item, idx) => (
          <Card key={idx} className="border shadow-sm">
            <CardHeader className="flex items-center gap-3">
              <TrendingUp className="text-indigo-600 w-6 h-6" />
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">{item.value}%</p>
              <Progress value={item.value} className="h-3" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ===== Achievements ===== */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex items-center gap-3">
          <Award className="text-indigo-600 w-6 h-6" />
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          {employee.achievements.map((ach, idx) => (
            <li key={idx} className="list-disc ml-5">
              {ach}
            </li>
          ))}
        </CardContent>
      </Card>

      {/* ===== Feedback ===== */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-indigo-700">Manager Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {employee.feedback.length > 0 ? (
            employee.feedback.map((fb, idx) => (
              <div
                key={idx}
                className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100"
              >
                <p className="text-sm text-gray-500 mb-1">
                  {fb.date} • {fb.from}
                </p>
                <p className="font-medium">{fb.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No feedback available.</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={() => router.push(`/employeedashboard/${id}`)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Back to Dashboard
        </Button>
      </div>
    </motion.main>
  );
}
