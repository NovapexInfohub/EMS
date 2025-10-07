"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

export default function EmployeeAttendancePage() {
  const { id } = useParams();
  const router = useRouter();

  // 🧠 Mock Attendance Data
  const [attendance, setAttendance] = useState({
    employeeId: id,
    name: "Alice Johnson",
    department: "Engineering",
    totalDays: 30,
    presentDays: 27,
    absentDays: 3,
    records: [
      { date: "2025-10-01", status: "Present" },
      { date: "2025-10-02", status: "Present" },
      { date: "2025-10-03", status: "Absent" },
      { date: "2025-10-04", status: "Present" },
      { date: "2025-10-05", status: "Present" },
      // ...more
    ],
  });

  const percentage = Math.round((attendance.presentDays / attendance.totalDays) * 100);

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8 space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <CalendarDays className="text-indigo-600 w-7 h-7" />
          Attendance Report
        </h1>
        <Button
          onClick={() => router.back()}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          ← Back to Dashboard
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-2">
          <p><strong>Name:</strong> {attendance.name}</p>
          <p><strong>Department:</strong> {attendance.department}</p>
          <p><strong>Total Working Days:</strong> {attendance.totalDays}</p>
          <p><strong>Attendance Rate:</strong> {percentage}%</p>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-green-100 text-green-700">
              Present: {attendance.presentDays}
            </Badge>
            <Badge className="bg-red-100 text-red-700">
              Absent: {attendance.absentDays}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Log */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle>Daily Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {attendance.records.map((record, index) => (
              <motion.div
                key={index}
                className={`p-3 border rounded-lg shadow-sm ${
                  record.status === "Present"
                    ? "bg-green-50 border-green-200 hover:shadow-green-200"
                    : "bg-red-50 border-red-200 hover:shadow-red-200"
                } transition-all duration-300`}
                whileHover={{ scale: 1.03 }}
              >
                <p className="font-medium">{record.date}</p>
                <Badge
                  className={`${
                    record.status === "Present"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {record.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.main>
  );
}
