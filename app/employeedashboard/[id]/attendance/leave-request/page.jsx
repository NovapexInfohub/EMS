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
    contact: "",
    document: null,
  });

  const leaveBalances = [
    { type: "Sick Leave", balance: 5 },
    { type: "Casual Leave", balance: 3 },
    { type: "Earned Leave", balance: 10 },
    { type: "Maternity/Paternity", balance: 30 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Leave request submitted successfully by Employee ID: ${id}`);
  };

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8 space-y-10"
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
          onClick={() => router.push(`/employeedashboard/${id}/attendance`)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          ← Back to Attendance
        </Button>
      </div>

      {/* Leave Request Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 space-y-6 max-w-3xl mx-auto border border-gray-200"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-2xl font-semibold text-blue-700 mb-2 text-center">
          Apply for Leave
        </h2>

        <div className="grid gap-5">
          {/* Leave Type */}
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

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

          {/* Reason */}
          <div>
            <label className="font-medium text-gray-700">Reason</label>
            <Textarea
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Reason for leave..."
              required
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="font-medium text-gray-700">
              Contact During Leave
            </label>
            <Input
              type="text"
              value={form.contact}
              onChange={(e) =>
                setForm({ ...form, contact: e.target.value })
              }
              placeholder="Enter phone number or email"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="font-medium text-gray-700">
              Attach Supporting Document (Optional)
            </label>
            <Input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) =>
                setForm({ ...form, document: e.target.files[0] })
              }
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 text-center">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2"
            >
              Submit Leave Request
            </Button>
          </div>
        </div>
      </motion.form>

      {/* Leave Balance Section (Equal Cards) */}
      <section className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {leaveBalances.map((leave) => (
          <motion.div
            key={leave.type}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex"
          >
            <Card className="flex flex-col justify-between w-full h-40 shadow-md border border-gray-200 rounded-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-base text-gray-800">
                  {leave.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {leave.balance}
                </p>
                <p className="text-gray-600 text-sm">days remaining</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </motion.main>
  );
}
