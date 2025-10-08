"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CalendarDays } from "lucide-react";

export default function LeaveRequestPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const leaveBalances = [
    { type: "Sick Leave", balance: 5 },
    { type: "Casual Leave", balance: 3 },
    { type: "Earned Leave", balance: 10 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Leave request submitted by Employee ID: ${id}`);
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8 space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
          <CalendarDays className="text-blue-600" />
          Leave Request
        </h1>
        <Button
          onClick={() => router.push(`/employee/${id}/attendance`)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          ← Back to Attendance
        </Button>
      </div>

      {/* Leave Balance Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaveBalances.map((leave) => (
          <motion.div
            key={leave.type}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-md border border-gray-200">
              <CardHeader>
                <CardTitle>{leave.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">
                  {leave.balance}
                </p>
                <p className="text-gray-600">days remaining</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Leave Request Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-4 max-w-2xl mx-auto"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Apply for Leave
        </h2>

        <div className="grid gap-4">
          <div>
            <label className="font-medium text-gray-700">Leave Type</label>
            <Input
              type="text"
              value={form.leaveType}
              onChange={(e) =>
                setForm({ ...form, leaveType: e.target.value })
              }
              placeholder="e.g. Sick Leave"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">Start Date</label>
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">End Date</label>
              <Input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  setForm({ ...form, endDate: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div>
            <label className="font-medium text-gray-700">Reason</label>
            <Textarea
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Reason for leave..."
              required
            />
          </div>

          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Submit Request
          </Button>
        </div>
      </motion.form>
    </motion.main>
  );
}
