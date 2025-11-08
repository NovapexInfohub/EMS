"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft, Clock, CheckCircle, Hourglass, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
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

export default function OvertimePage() {
  const router = useRouter();

  // ===== DUMMY OVERTIME DATA =====
  const overtimeSummary = {
    totalHours: 24,
    approved: 18,
    pending: 4,
    rejected: 2,
  };

  const overtimeChartData = [
    { week: "Week 1", hours: 5 },
    { week: "Week 2", hours: 8 },
    { week: "Week 3", hours: 6 },
    { week: "Week 4", hours: 5 },
  ];

  const overtimeLogs = [
    {
      date: "2025-11-01",
      project: "ERP Revamp",
      hours: 3,
      status: "Approved",
      approvedBy: "HR Manager",
    },
    {
      date: "2025-11-03",
      project: "Fire Safety NOC Automation",
      hours: 2.5,
      status: "Pending",
      approvedBy: "-",
    },
    {
      date: "2025-11-05",
      project: "Smart India Hackathon Dashboard",
      hours: 4,
      status: "Approved",
      approvedBy: "Team Lead",
    },
    {
      date: "2025-11-07",
      project: "Bug Fixing - Fire NOC",
      hours: 1.5,
      status: "Rejected",
      approvedBy: "Team Lead",
    },
    {
      date: "2025-11-08",
      project: "Performance Report Update",
      hours: 2,
      status: "Pending",
      approvedBy: "-",
    },
  ];

  // ===== HANDLE BACK =====
  const handleBack = () => {
    router.push("http://localhost:3000/employeedashboard/101/attendance/mark?date=2025-11-08");
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50 py-10 px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ===== PAGE HEADER ===== */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <FileText className="text-indigo-600 w-7 h-7" /> Overtime Records
        </h1>
        <Button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "Total Overtime Hours",
            value: `${overtimeSummary.totalHours} hrs`,
            icon: <Clock className="text-blue-600 w-6 h-6" />,
            color: "bg-blue-100",
          },
          {
            title: "Approved Hours",
            value: `${overtimeSummary.approved} hrs`,
            icon: <CheckCircle className="text-green-600 w-6 h-6" />,
            color: "bg-green-100",
          },
          {
            title: "Pending Hours",
            value: `${overtimeSummary.pending} hrs`,
            icon: <Hourglass className="text-yellow-600 w-6 h-6" />,
            color: "bg-yellow-100",
          },
          {
            title: "Rejected Hours",
            value: `${overtimeSummary.rejected} hrs`,
            icon: <XCircle className="text-red-600 w-6 h-6" />,
            color: "bg-red-100",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="shadow-md border border-gray-200 bg-white hover:border-indigo-300 transition">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-2">
                    {item.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-full ${item.color}`}>{item.icon}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ===== OVERTIME CHART ===== */}
      <Card className="shadow-md border border-gray-200 bg-white mb-10">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">
            Weekly Overtime Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={overtimeChartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fill: "#4b5563" }} />
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
        </CardContent>
      </Card>

      {/* ===== OVERTIME LOGS TABLE ===== */}
      <Card className="shadow-md border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Detailed Overtime Logs</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700 border-collapse">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Project / Task</th>
                <th className="py-3 px-4 text-left">Hours</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Approved By</th>
              </tr>
            </thead>
            <tbody>
              {overtimeLogs.map((log, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-100 hover:bg-indigo-50 transition-all"
                >
                  <td className="py-3 px-4">{log.date}</td>
                  <td className="py-3 px-4">{log.project}</td>
                  <td className="py-3 px-4">{log.hours} hrs</td>
                  <td
                    className={`py-3 px-4 font-medium ${
                      log.status === "Approved"
                        ? "text-green-600"
                        : log.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {log.status}
                  </td>
                  <td className="py-3 px-4">{log.approvedBy}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.main>
  );
}
