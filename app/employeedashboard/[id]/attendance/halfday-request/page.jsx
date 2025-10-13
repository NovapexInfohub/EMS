"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowLeft } from "lucide-react";

export default function HalfDayRequestPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form, setForm] = useState({
    date: "",
    session: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Half Day Request submitted by Employee ID: ${id}`);
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8 space-y-10"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
          <CalendarDays className="text-indigo-600" />
          Half Day Request
        </h1>
        <Button
          onClick={() => router.push(`/employeedashboard/${id}/attendance`)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Attendance
        </Button>
      </div>

      {/* ===== Half Day Request Form ===== */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-6 max-w-3xl mx-auto"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">
          Apply for Half Day Leave
        </h2>

        <div className="grid gap-5">
          <div>
            <label className="font-medium text-gray-700">Select Date</label>
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Session</label>
            <select
              name="session"
              value={form.session}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Session</option>
              <option value="First Half">First Half (Morning)</option>
              <option value="Second Half">Second Half (Afternoon)</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">Reason</label>
            <Textarea
              name="reason"
              placeholder="Specify your reason for taking half day leave..."
              value={form.reason}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-2"
          >
            Submit Request
          </Button>
        </div>
      </motion.form>

      {/* ===== Additional Info / Guidelines Section ===== */}
      <Card className="shadow-md border border-gray-200 max-w-3xl mx-auto bg-white">
        <CardHeader>
          <CardTitle>Important Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-3">
          <p>🕐 <strong>Notice Period:</strong> Please apply for a half-day leave at least 1 day in advance.</p>
          <p>📅 <strong>Eligibility:</strong> You can avail up to 2 half-day leaves per month.</p>
          <p>📞 <strong>Contact:</strong> Inform your reporting manager before leaving the office.</p>
          <p>⚠️ <strong>Note:</strong> Repeated unapproved half-day leaves may affect attendance records.</p>
        </CardContent>
      </Card>
    </motion.main>
  );
}
