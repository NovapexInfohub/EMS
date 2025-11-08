"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ArrowLeft, CheckCircle, XCircle, Clock, Coffee } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AttendanceSummary() {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const [viewMode, setViewMode] = useState("Month");

  // ===================== CHART DATA =====================
  const weeklyData = [
    { date: "Mon", present: 1, absent: 0, leave: 0 },
    { date: "Tue", present: 1, absent: 0, leave: 0 },
    { date: "Wed", present: 0, absent: 1, leave: 0 },
    { date: "Thu", present: 1, absent: 0, leave: 0 },
    { date: "Fri", present: 1, absent: 0, leave: 0 },
    { date: "Sat", present: 1, absent: 0, leave: 0 },
  ];

  const monthlyData = Array.from({ length: 30 }, (_, i) => ({
    date: `${(i + 1).toString().padStart(2, "0")} Nov`,
    present: i % 6 !== 2 ? 1 : 0, // random absent every 6th day
    absent: i % 6 === 2 ? 1 : 0,
    leave: i % 15 === 0 ? 1 : 0,
  }));

  const yearlyData = [
    { month: "Jan", present: 20, absent: 2, leave: 3, percentage: "87%" },
    { month: "Feb", present: 18, absent: 4, leave: 2, percentage: "80%" },
    { month: "Mar", present: 22, absent: 1, leave: 1, percentage: "92%" },
    { month: "Apr", present: 19, absent: 3, leave: 2, percentage: "85%" },
    { month: "May", present: 21, absent: 2, leave: 1, percentage: "88%" },
    { month: "Jun", present: 20, absent: 1, leave: 3, percentage: "89%" },
    { month: "Jul", present: 22, absent: 2, leave: 2, percentage: "91%" },
    { month: "Aug", present: 21, absent: 1, leave: 2, percentage: "90%" },
    { month: "Sep", present: 20, absent: 2, leave: 3, percentage: "86%" },
    { month: "Oct", present: 19, absent: 3, leave: 1, percentage: "84%" },
    { month: "Nov", present: 22, absent: 2, leave: 1, percentage: "91%" },
    { month: "Dec", present: 20, absent: 3, leave: 2, percentage: "85%" },
  ];

  const activeData =
    viewMode === "Week" ? weeklyData : viewMode === "Month" ? monthlyData : yearlyData;

  // ===================== SUMMARY CARDS =====================
  const summary = {
    totalDays: viewMode === "Year" ? 365 : viewMode === "Month" ? 30 : 7,
    presentDays: viewMode === "Year" ? 240 : viewMode === "Month" ? 22 : 5,
    absentDays: viewMode === "Year" ? 80 : viewMode === "Month" ? 5 : 1,
    leaveDays: viewMode === "Year" ? 45 : viewMode === "Month" ? 3 : 1,
  };

  const attendancePercent = ((summary.presentDays / summary.totalDays) * 100).toFixed(1);

  // ===================== TABLE DATA =====================
  const weeklyLogs = [
    { day: "Mon", date: "2025-11-03", status: "Present" },
    { day: "Tue", date: "2025-11-04", status: "Present" },
    { day: "Wed", date: "2025-11-05", status: "Absent" },
    { day: "Thu", date: "2025-11-06", status: "Present" },
    { day: "Fri", date: "2025-11-07", status: "Present" },
    { day: "Sat", date: "2025-11-08", status: "Leave" },
  ];

  const monthlyLogs = Array.from({ length: 30 }, (_, i) => ({
    date: `2025-11-${(i + 1).toString().padStart(2, "0")}`,
    checkIn: i % 6 === 2 ? "-" : "09:0" + (i % 10) + " AM",
    checkOut: i % 6 === 2 ? "-" : "06:0" + (i % 10) + " PM",
    hours: i % 6 === 2 ? "-" : "8h " + (i % 3) * 10 + "m",
    status: i % 6 === 2 ? "Absent" : i % 15 === 0 ? "Leave" : "Present",
  }));

  const handleBack = () => {
    router.push(`/employeedashboard/${id}/attendance/mark?date=${date}`);
  };

  // ===================== UI START =====================
  return (
    <motion.main
      className="min-h-screen bg-gray-50 py-10 px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
            <CalendarDays className="text-indigo-600 w-7 h-7" /> Attendance Summary
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your attendance performance across Week, Month, and Year.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex overflow-hidden">
            {["Week", "Month", "Year"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  viewMode === mode
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <Button onClick={handleBack} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back
          </Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "Attendance Percentage",
            value: `${attendancePercent}%`,
            icon: <Clock className="text-blue-600 w-6 h-6" />,
            color: "bg-blue-100",
          },
          {
            title: "Days Present",
            value: summary.presentDays,
            icon: <CheckCircle className="text-green-600 w-6 h-6" />,
            color: "bg-green-100",
          },
          {
            title: "Days Absent",
            value: summary.absDays,
            icon: <XCircle className="text-red-600 w-6 h-6" />,
            color: "bg-red-100",
          },
          {
            title: "Leaves Taken",
            value: summary.leaveDays,
            icon: <Coffee className="text-yellow-600 w-6 h-6" />,
            color: "bg-yellow-100",
          },
        ].map((item, i) => (
          <motion.div key={i} whileHover={{ scale: 1.04 }}>
            <Card className="shadow-md border border-gray-200 bg-white hover:border-indigo-300 transition">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-2">{item.value}</h3>
                </div>
                <div className={`p-3 rounded-full ${item.color}`}>{item.icon}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CHART */}
      <Card className="shadow-md border border-gray-200 bg-white mb-10">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">{viewMode}ly Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey={viewMode === "Year" ? "month" : "date"} tick={{ fill: "#4b5563" }} />
              <YAxis tick={{ fill: "#4b5563" }} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb" }} />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="leave" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* TABLE SECTION */}
      <Card className="shadow-md border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">
            {viewMode === "Year"
              ? "Yearly Attendance Summary"
              : viewMode === "Month"
              ? "Monthly Attendance Logs"
              : "Weekly Attendance Summary"}
          </CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          {viewMode === "Year" ? (
            // YEARLY TABLE
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Month</th>
                  <th className="py-3 px-4 text-left">Present</th>
                  <th className="py-3 px-4 text-left">Absent</th>
                  <th className="py-3 px-4 text-left">Leave</th>
                  <th className="py-3 px-4 text-left">Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {yearlyData.map((y, i) => (
                  <tr key={i} className="border-b hover:bg-indigo-50 transition">
                    <td className="py-3 px-4">{y.month}</td>
                    <td className="py-3 px-4 text-green-600">{y.present}</td>
                    <td className="py-3 px-4 text-red-600">{y.absent}</td>
                    <td className="py-3 px-4 text-yellow-600">{y.leave}</td>
                    <td className="py-3 px-4">{y.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : viewMode === "Month" ? (
            // MONTHLY TABLE
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Check-In</th>
                  <th className="py-3 px-4 text-left">Check-Out</th>
                  <th className="py-3 px-4 text-left">Total Hours</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {monthlyLogs.map((log, i) => (
                  <tr key={i} className="border-b hover:bg-indigo-50 transition">
                    <td className="py-3 px-4">{log.date}</td>
                    <td className="py-3 px-4">{log.checkIn}</td>
                    <td className="py-3 px-4">{log.checkOut}</td>
                    <td className="py-3 px-4">{log.hours}</td>
                    <td
                      className={`py-3 px-4 font-medium ${
                        log.status === "Present"
                          ? "text-green-600"
                          : log.status === "Absent"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {log.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // WEEKLY TABLE
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Day</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {weeklyLogs.map((log, i) => (
                  <tr key={i} className="border-b hover:bg-indigo-50 transition">
                    <td className="py-3 px-4">{log.day}</td>
                    <td className="py-3 px-4">{log.date}</td>
                    <td
                      className={`py-3 px-4 font-medium ${
                        log.status === "Present"
                          ? "text-green-600"
                          : log.status === "Absent"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {log.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </motion.main>
  );
}
