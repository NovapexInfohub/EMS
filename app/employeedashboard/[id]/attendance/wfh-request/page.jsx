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
    duration: "",
    reason: "",
    location: "",
    contact: "",
    toolsNeeded: "",
    document: null,
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
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
          <Home className="text-blue-600" />
          Work From Home Request
        </h1>
        <Button
          onClick={() => router.push(`/employeedashboard/${id}/attendance`)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          ← Back to Attendance
        </Button>
      </div>

      {/* ===== WFH Form ===== */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 space-y-6 max-w-3xl mx-auto border border-gray-200"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Request Work From Home
        </h2>

        <div className="grid gap-5">
          {/* Date & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="font-medium text-gray-700">Date</label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Duration</label>
              <Input
                type="text"
                placeholder="e.g. Full Day, Half Day"
                value={form.duration}
                onChange={(e) =>
                  setForm({ ...form, duration: e.target.value })
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
              placeholder="Explain why you are requesting work from home..."
              required
            />
          </div>

          {/* Location */}
          {/* <div>
            <label className="font-medium text-gray-700">Work Location</label>
            <Input
              type="text"
              placeholder="e.g. Home, Outstation, etc."
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
              required
            />
          </div> */}

          {/* Tools/Resources */}
          {/* <div>
            <label className="font-medium text-gray-700">
              Tools or Resources Needed
            </label>
            <Textarea
              placeholder="List any tools, software, or support you need..."
              value={form.toolsNeeded}
              onChange={(e) =>
                setForm({ ...form, toolsNeeded: e.target.value })
              }
            />
          </div> */}

          {/* Contact */}
          <div>
            <label className="font-medium text-gray-700">
              Contact During Work From Home
            </label>
            <Input
              type="text"
              placeholder="Enter phone number or email"
              value={form.contact}
              onChange={(e) =>
                setForm({ ...form, contact: e.target.value })
              }
              required
            />
          </div>

          {/* File Upload
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
          </div> */}

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              Submit WFH Request
            </Button>
          </div>
        </div>
      </motion.form>

      {/* ===== WFH Balance (Now Below Form) ===== */}
      <div className="pt-10 flex justify-center">
        <Card className="shadow-md border border-gray-200 w-full max-w-md">
          <CardHeader>
            <CardTitle>Work From Home Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-blue-600">{wfhBalance}</p>
            <p className="text-gray-600">days remaining this month</p>
          </CardContent>
        </Card>
      </div>
    </motion.main>
  );
}
