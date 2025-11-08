"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, ArrowLeft, Clock, Calendar, TrendingUp, BarChart3 } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Progress } from "@/components/ui/progress";

export default function WorkHoursPage() {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0]; // fallback to today

  const [viewMode, setViewMode] = useState("Week");

  const workData = [
    { day: "Mon", hours: 8 },
    { day: "Tue", hours: 7 },
    { day: "Wed", hours: 9 },
    { day: "Thu", hours: 8 },
    { day: "Fri", hours: 7.5 },
    { day: "Sat", hours: 4 },
  ];

  const totalHours = workData.reduce((acc, d) => acc + d.hours, 0);
  const weeklyGoal = 48;
  const progress = Math.min((totalHours / weeklyGoal) * 100, 100).toFixed(1);

  const stats = [
    { title: "Total Hours This Week", value: `${totalHours} hrs`, icon: <Clock className="text-blue-600 w-6 h-6" /> },
    { title: "Average Daily Hours", value: `${(totalHours / workData.length).toFixed(1)} hrs`, icon: <TrendingUp className="text-green-600 w-6 h-6" /> },
    { title: "Overtime Logged", value: "4.5 hrs", icon: <Timer className="text-orange-600 w-6 h-6" /> },
    { title: "Attendance Days", value: `${workData.length} days`, icon: <Calendar className="text-purple-600 w-6 h-6" /> },
  ];

  const handleBack = () => {
    router.push(`/employeedashboard/${id}/attendance/mark?date=${date}`);
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50 py-10 px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
            <Timer className="text-indigo-600 w-7 h-7" /> Work Hours Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Monitor your weekly and monthly working patterns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-md border border-gray-200 shadow-sm text-sm text-gray-700">
            <span className="font-semibold text-indigo-600">{viewMode}</span> View
          </div>
          <Button
            onClick={handleBack}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back
          </Button>
        </div>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="shadow-md border border-gray-200 bg-white hover:border-indigo-300 transition">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-2">{item.value}</h3>
                </div>
                <div className="bg-gray-100 p-3 rounded-full">{item.icon}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ===== WEEKLY WORK HOURS CHART ===== */}
      <Card className="shadow-md border border-gray-200 bg-white mb-10">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <BarChart3 className="text-indigo-600 w-5 h-5" /> Weekly Work Hours Overview
          </CardTitle>
          <div className="text-sm text-gray-500">
            Progress: <span className="font-semibold text-indigo-600">{progress}%</span>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={workData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fill: "#4b5563" }} />
              <YAxis tick={{ fill: "#4b5563" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="hours" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Progress Bar */}
          <div className="mt-6">
            <Progress value={progress} className="h-3 bg-gray-100" />
          </div>
        </CardContent>
      </Card>

      {/* ===== DAILY INSIGHTS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              <span className="font-semibold text-indigo-600">Wednesday</span> recorded the highest working hours.
            </p>
            <p>
              Try maintaining an average of <span className="font-semibold text-green-600">7–8 hrs/day</span> for balanced productivity.
            </p>
            <p>
              Keep an eye on your <span className="font-semibold text-orange-600">overtime trends</span> to prevent burnout.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle>Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <ul className="list-disc pl-5">
              <li>Log your work completion daily before checkout.</li>
              <li>Follow consistent working patterns for better insights.</li>
              <li>Check this dashboard weekly for productivity reports.</li>
              <li>Engage your manager for workload balance.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* ===== WEEK SUMMARY SECTION ===== */}
      <div className="mt-10">
        <Card className="shadow-md border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <ul className="divide-y divide-gray-100">
              {workData.map((d, i) => (
                <li key={i} className="flex justify-between py-3">
                  <span className="font-medium text-gray-800">{d.day}</span>
                  <span>{d.hours} hrs</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.main>
  );
}
