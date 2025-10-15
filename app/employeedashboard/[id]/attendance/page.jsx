"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, Plus } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";

export default function EmployeeAttendancePage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  // Static demo data
  const [attendance] = useState({
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

  const events = attendance.records.map((rec) => ({
    title: rec.status,
    start: rec.date,
    color: rec.status === "Present" ? "#22c55e" : "#ef4444",
    textColor: "white",
  }));

  const [hoveredDate, setHoveredDate] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  const handlePlusClick = (date) => {
    router.push(`/employeedashboard/${id}/attendance/request-form?date=${date}`);
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8 space-y-8 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
            <CalendarDays className="text-indigo-600 w-7 h-7" />
            Attendance Calendar
          </h1>
          <p className="text-gray-600">
            Hover on a future date to create a new request.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            onClick={() => router.push(`/employeedashboard`)}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            ← Back
          </Button>
        </motion.div>
      </div>

      {/* ===== Calendar ===== */}
      <Card className="shadow-md border border-gray-200 p-4 relative">
        <CardHeader>
          <CardTitle>Monthly Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[700px] relative">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height="100%"
              events={events}
              dayCellContent={(arg) => {
                const date = arg.date.toISOString().split("T")[0];
                const isHovered = hoveredDate === date;
                const isFutureOrToday = date >= today;

                return (
                  <div
                    onMouseEnter={() => setHoveredDate(date)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className="relative w-full h-full flex flex-col justify-start items-start p-1"
                  >
                    <span className="text-sm">{arg.dayNumberText}</span>

                    {/* Plus icon for new request */}
                    {isHovered && isFutureOrToday && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handlePlusClick(date)}
                        className="absolute bottom-1 right-1 w-6 h-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md flex items-center justify-center transition-all"
                      >
                        <Plus className="w-3 h-3" />
                      </motion.button>
                    )}
                  </div>
                );
              }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.main>
  );
}
