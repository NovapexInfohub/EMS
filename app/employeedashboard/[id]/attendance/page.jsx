"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, ChevronDown } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function EmployeeAttendancePage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

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
            Attendance Calendar
          </h1>
          <p className="text-gray-600">
            View attendance, leave requests, and work-from-home requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Request Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
                Request <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/employeedashboard/${id}/attendance/leave-request`)
                }
              >
                Leave Request
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/employeedashboard/${id}/attendance/wfh-request`)
                }
              >
                Work From Home Request
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/employeedashboard/${id}/attendance/halfday-request`)
                }
              >
                Half Day Request
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/employeedashboard/${id}/attendance/document-request`)
                }
              >
                Document Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Back Button */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={() => router.push(`/employeedashboard`)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              ← Back
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ===== Calendar ===== */}
      <Card className="shadow-md border border-gray-200 p-4">
        <CardHeader>
          <CardTitle>Monthly Attendance</CardTitle>
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
                  info.el.style.color =
                    record.status === "Present" ? "#16a34a" : "#dc2626";
                  info.el.style.fontWeight = "bold";
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.main>
  );
}
