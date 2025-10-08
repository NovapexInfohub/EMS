"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Home } from "lucide-react";

export default function WorkFromHomeRequestPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    date: "",
    reason: "",
  });

  const wfhBalance = 4; // Example: 4 WFHs per month

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Work From Home request submitted by Employee ID: ${id}`);
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
        <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2">
          <Home className="text-green-600" />
          Work From Home Request
        </h1>
        <Button
          onClick={() => router.push(`/employee/${id}/attendance`)}
          className="bg-green-600 hover:bg-green-700"
        >
          ← Back to Attendance
        </Button>
      </div>

      {/* WFH Balance */}
      <Card className="shadow-md border border-gray-200 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Work From Home Balance</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-4xl font-bold text-green-600">{wfhBalance}</p>
          <p className="text-gray-600">days remaining this month</p>
        </CardContent>
      </Card>

      {/* WFH Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-4 max-w-2xl mx-auto"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Request Work From Home
        </h2>

        <div className="grid gap-4">
          <div>
            <label className="font-medium text-gray-700">Date</label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Reason</label>
            <Textarea
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Reason for WFH..."
              required
            />
          </div>

          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Submit Request
          </Button>
        </div>
      </motion.form>
    </motion.main>
  );
}
