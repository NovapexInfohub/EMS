"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
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

  const [selectedDate, setSelectedDate] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showOtherRequests, setShowOtherRequests] = useState(false);
  const menuRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSelectedDate(null);
        setShowOtherRequests(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle calendar date click
  const handleDateClick = (info) => {
    const rect = info.dayEl.getBoundingClientRect();

    setMenuPosition({
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 10,
    });

    setSelectedDate(info.dateStr);
    setShowOtherRequests(false);
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
            Click on any date to apply for Leave or Other Requests.
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
              dateClick={handleDateClick}
            />

            {/* ===== Floating Dropdown ===== */}
            {selectedDate && (
              <div
                ref={menuRef}
                style={{
                  position: "absolute",
                  top: menuPosition.y - 100,
                  left: menuPosition.x - 120,
                  zIndex: 1000,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white shadow-xl border border-gray-200 rounded-lg p-3 w-64"
                >
                  <p className="text-sm text-gray-700 mb-2 font-medium text-center">
                    Requests for <span className="text-indigo-600">{selectedDate}</span>
                  </p>

                  {!showOtherRequests ? (
                    <>
                      {/* Leave Request */}
                      <Button
                        className="w-full text-left justify-start bg-blue-100 text-blue-800 hover:bg-blue-200 mb-1"
                        onClick={() =>
                          router.push(
                            `/employeedashboard/${id}/attendance/leave-request`
                          )
                        }
                      >
                        Leave Request
                      </Button>

                      {/* Other Requests */}
                      <Button
                        className="w-full text-left justify-start bg-blue-100 text-blue-800 hover:bg-blue-200"
                        onClick={() => setShowOtherRequests(true)}
                      >
                        Other Requests →
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="w-full text-left justify-start bg-blue-100 text-blue-800 hover:bg-blue-200 mb-1"
                        onClick={() =>
                          router.push(
                            `/employeedashboard/${id}/attendance/halfday-request`
                          )
                        }
                      >
                        Half Day Request
                      </Button>
                      <Button
                        className="w-full text-left justify-start bg-blue-100 text-blue-800 hover:bg-blue-200 mb-1"
                        onClick={() =>
                          router.push(
                            `/employeedashboard/${id}/attendance/wfh-request`
                          )
                        }
                      >
                        Work From Home
                      </Button>
                      <Button
                        className="w-full text-left justify-start bg-blue-100 text-blue-800 hover:bg-blue-200 mb-1"
                        onClick={() =>
                          router.push(
                            `/employeedashboard/${id}/attendance/document-request`
                          )
                        }
                      >
                        Document Request
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full mt-2 text-left justify-start"
                        onClick={() => setShowOtherRequests(false)}
                      >
                        ← Back
                      </Button>
                    </>
                  )}
                </motion.div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.main>
  );
}
