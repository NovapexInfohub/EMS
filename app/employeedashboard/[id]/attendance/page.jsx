"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

  /** ------------------ ATTENDANCE RECORDS ------------------ */
  const [attendance] = useState({
    records: [
      { date: "2025-11-01", status: "Present" },
      { date: "2025-11-02", status: "Absent" },
      { date: "2025-11-03", status: "Present" },
      { date: "2025-11-06", status: "Present" },
      { date: "2025-11-10", status: "Absent" },
      { date: "2025-11-14", status: "Present" },
      { date: "2025-11-17", status: "Present" },
    ],
  });

  /** ------------------ NATIONAL HOLIDAYS ------------------ */
  const indianHolidays = [
    { date: "2025-01-26", name: "Republic Day" },
    { date: "2025-08-15", name: "Independence Day" },
    { date: "2025-10-02", name: "Gandhi Jayanti" },
    { date: "2025-12-25", name: "Christmas" },
  ];

  /** FIX → use locale date to avoid timezone shift */
  const today = new Date().toLocaleDateString("en-CA");

  /** ------------------ UI STATE ------------------ */
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePlusClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleOptionClick = (option) => {
    setShowModal(false);

    if (option === "attendance") {
      router.push(`/employeedashboard/${id}/attendance/mark?date=${selectedDate}`);
    } else {
      router.push(`/employeedashboard/${id}/attendance/request-form?date=${selectedDate}`);
    }
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
            <CalendarDays className="text-indigo-600 w-7 h-7" />
            Attendance Calendar
          </h1>
          <p className="text-gray-600">Hover on a future date to create a new request.</p>
        </div>

        <Button
          onClick={() => router.push(`/employeedashboard`)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          ← Back
        </Button>
      </div>

      {/* CALENDAR */}
      <Card className="shadow-md border border-gray-200 p-4">
        <CardHeader>
          <CardTitle>Monthly Attendance</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-[700px] relative">

            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height="100%"

              dayCellDidMount={(info) => {
                info.el.style.backgroundColor = "transparent";
              }}

              dayCellContent={(arg) => {
                const date = arg.date.toLocaleDateString("en-CA");

                const record = attendance.records.find((r) => r.date === date);
                const holiday = indianHolidays.find((h) => h.date === date);

                const isHovered = hoveredDate === date;
                const isFutureOrToday = date >= today;
                const isPast = date < today;

                /** ------------------ RULES APPLIED ------------------ */

                let dotColor = "";
                let cellBg = "";

                /** NATIONAL HOLIDAY → Light green block + green dot */
                if (holiday) {
                  dotColor = "bg-green-600";
                  cellBg = "rgba(34,197,94,0.25)"; // light green
                }

                /** TODAY → Yellow dot only */
                else if (date === today) {
                  dotColor = "bg-yellow-500";
                }

                /** ABSENT RECORD → Red dot */
                else if (record?.status === "Absent") {
                  dotColor = "bg-red-500";
                }

                /** PRESENT RECORD → Green dot */
                else if (record?.status === "Present") {
                  dotColor = "bg-green-600";
                }

                /** NO RECORD BUT PAST DAY → Green dot (default present) */
                else if (isPast) {
                  dotColor = "bg-green-600";
                }

                /** FUTURE → No dot */
                else {
                  dotColor = "";
                }

                return (
                  <div
                    onMouseEnter={() => setHoveredDate(date)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className="relative w-full h-full flex flex-col justify-start items-start p-1 rounded-md"
                    style={{ backgroundColor: cellBg }}
                  >
                    {/* DATE NUMBER */}
                    <span className="text-sm font-medium">{arg.dayNumberText}</span>

                    {/* HOLIDAY NAME */}
                    {holiday && (
                      <span className="text-[10px] mt-1 text-green-700 font-semibold leading-none">
                        {holiday.name}
                      </span>
                    )}

                    {/* DOT */}
                    {dotColor && <div className={`w-2 h-2 rounded-full mt-1 ${dotColor}`}></div>}

                    {/* PLUS BUTTON → disabled for holidays */}
                    {!holiday && isHovered && isFutureOrToday && date !== today && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handlePlusClick(date)}
                        className="absolute bottom-1 right-1 w-6 h-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md flex items-center justify-center"
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

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center space-y-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Select Action for {selectedDate}
              </h2>

              <div className="space-y-3">
                <Button
                  onClick={() => handleOptionClick("attendance")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  🕒 Mark Attendance
                </Button>
                <Button
                  onClick={() => handleOptionClick("leave")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  🌴 Apply for Leave
                </Button>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
