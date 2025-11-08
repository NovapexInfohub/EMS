"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Clock,
  LogIn,
  LogOut,
  CalendarDays,
  FileText,
  Timer,
  RefreshCcw,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AttendanceModulePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [isCheckInOpen, setCheckInOpen] = useState(false);
  const [isCheckOutOpen, setCheckOutOpen] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  // ✅ Update live clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ✅ Load data from localStorage
  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInTime");
    const storedCheckOut = localStorage.getItem("checkOutTime");
    if (storedCheckIn) setCheckInTime(storedCheckIn);
    if (storedCheckOut) setCheckOutTime(storedCheckOut);
  }, []);

  // ✅ Handle Check-In
  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setCheckInTime(now);
    localStorage.setItem("checkInTime", now);
    setCheckInOpen(false);
  };

  // ✅ Handle Check-Out
  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setCheckOutTime(now);
    localStorage.setItem("checkOutTime", now);
    setCheckOutOpen(false);
  };

  // ✅ Clear both (optional reset button feature)
  const resetAttendance = () => {
    localStorage.removeItem("checkInTime");
    localStorage.removeItem("checkOutTime");
    setCheckInTime(null);
    setCheckOutTime(null);
  };

  const attendanceModules = [
    {
      title: "Check-In",
      icon: <LogIn className="w-6 h-6 text-green-600" />,
      description: checkInTime
        ? `You checked in at ${checkInTime}`
        : "Mark your attendance when you start work.",
      onClick: () => setCheckInOpen(true),
    },
    {
      title: "Check-Out",
      icon: <LogOut className="w-6 h-6 text-red-600" />,
      description: checkOutTime
        ? `You checked out at ${checkOutTime}`
        : "Record your checkout time when you finish work.",
      onClick: checkInTime ? () => setCheckOutOpen(true) : null, // disable until check-in
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

        <div className="flex gap-3 items-center">
          <span className="text-gray-700 font-medium text-sm bg-gray-100 px-3 py-1 rounded-md">
            ⏰ {currentTime}
          </span>
          <Button
            onClick={() => router.push(`/employeedashboard/${id}/attendance`)}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Calendar
          </Button>
        </div>
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
              onClick={() =>
                module.route
                  ? router.push(module.route)
                  : module.onClick && module.onClick()
              }
              className={`shadow-md hover:shadow-lg transition border border-gray-200 bg-white ${
                module.route || module.onClick
                  ? "cursor-pointer hover:border-indigo-400"
                  : "cursor-not-allowed opacity-80"
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

      {/* ===== Reset Attendance Data ===== */}
      {(checkInTime || checkOutTime) && (
        <div className="text-center mt-10">
          <Button
            onClick={resetAttendance}
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50"
          >
            Reset Attendance
          </Button>
        </div>
      )}

      {/* ===== Check-In Dialog ===== */}
      <Dialog open={isCheckInOpen} onOpenChange={setCheckInOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-indigo-700">
              Mark Check-In
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 mb-4">
            Confirm your check-in for{" "}
            <strong>{new Date().toLocaleDateString()}</strong>
          </p>
          <div className="bg-gray-100 p-3 rounded-md text-center text-gray-800 font-semibold">
            Current Time: {currentTime}
          </div>
          <DialogFooter className="mt-4">
            <Button
              onClick={handleCheckIn}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Confirm Check-In
            </Button>
            <Button variant="outline" onClick={() => setCheckInOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== Check-Out Dialog ===== */}
      <Dialog open={isCheckOutOpen} onOpenChange={setCheckOutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-indigo-700">
              Mark Check-Out
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 mb-4">
            Confirm your check-out for{" "}
            <strong>{new Date().toLocaleDateString()}</strong>
          </p>
          <div className="bg-gray-100 p-3 rounded-md text-center text-gray-800 font-semibold">
            Current Time: {currentTime}
          </div>
          <DialogFooter className="mt-4">
            <Button
              onClick={handleCheckOut}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Confirm Check-Out
            </Button>
            <Button variant="outline" onClick={() => setCheckOutOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.main>
  );
}
