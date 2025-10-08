"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function EmployeeAttendancePage() {
  const { id } = useParams();
  const router = useRouter();

  // 🧠 Mock Attendance Data
  const [attendance, setAttendance] = useState({
    employeeId: id,
    name: "Alice Johnson",
    department: "Engineering",
    totalDays: 30,
    presentDays: 26,
    absentDays: 4,
    records: [
      { date: "2025-10-01", status: "Present" },
      { date: "2025-10-02", status: "Absent" },
      { date: "2025-10-03", status: "Present" },
      { date: "2025-10-04", status: "Present" },
      { date: "2025-10-05", status: "Absent" },
      { date: "2025-10-06", status: "Present" },
      { date: "2025-10-07", status: "Present" },
      { date: "2025-10-08", status: "Absent" },
    ],
  });

  const percentage = Math.round(
    (attendance.presentDays / attendance.totalDays) * 100
  );

  // 🟢 Convert attendance records to calendar events
  const events = attendance.records.map((rec) => ({
    title: rec.status,
    start: rec.date,
    color: rec.status === "Present" ? "#22c55e" : "#ef4444",
    textColor: "white",
  }));

  // 🎬 Smooth transition animation
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6, ease: "easeInOut" },
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8 space-y-8"
      {...pageTransition}
    >
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
            <CalendarDays className="text-indigo-600 w-7 h-7" />
            Attendance Overview
          </h1>
          <p className="text-gray-600">
            Track attendance, view leave and work-from-home requests.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            onClick={() => router.push(`/employee/${id}/dashboard`)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            ← Back to Dashboard
          </Button>
        </motion.div>
      </div>

      {/* ===== Summary Card ===== */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle>Employee Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-2">
          <p>
            <strong>Name:</strong> {attendance.name}
          </p>
          <p>
            <strong>Department:</strong> {attendance.department}
          </p>
          <p>
            <strong>Total Working Days:</strong> {attendance.totalDays}
          </p>
          <p>
            <strong>Attendance Rate:</strong>{" "}
            <span
              className={`font-semibold ${
                percentage >= 90
                  ? "text-green-600"
                  : percentage >= 75
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {percentage}%
            </span>
          </p>
        </CardContent>
      </Card>

      {/* ===== Calendar ===== */}
      <Card className="shadow-md border border-gray-200 p-4">
        <CardHeader>
          <CardTitle>Monthly Attendance Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[700px]">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height="100%"
              events={events}
              dayCellDidMount={(info) => {
                const record = attendance.records.find(
                  (r) => r.date === info.date.toISOString().split("T")[0]
                );
                if (record) {
                  if (record.status === "Present") {
                    info.el.style.color = "#16a34a"; // green
                    info.el.style.fontWeight = "bold";
                  } else if (record.status === "Absent") {
                    info.el.style.color = "#dc2626"; // red
                    info.el.style.fontWeight = "bold";
                  }
                }
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* ===== Action Buttons Below Calendar ===== */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            onClick={() => router.push(`/employeedashboard/${id}/attendance/leave-request`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            🏖️ Request Leave
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            onClick={() => router.push(`/employeedashboard/${id}/attendance/wfh-request`)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
          >
            🏠 Work From Home Request
          </Button>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
