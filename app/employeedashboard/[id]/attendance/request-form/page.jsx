"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useSearchParams, useRouter } from "next/navigation";

export default function RequestFormPage() {
  const params = useParams();
  const id = params?.id;
  const searchParams = useSearchParams();
  const router = useRouter();
  const date = searchParams.get("date") || "Not Selected";

  const [requestType, setRequestType] = useState("");
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${requestType} submitted successfully by Employee ID: ${id}`);
  };

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-8 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-full max-w-4xl shadow-2xl border border-gray-200 bg-white rounded-3xl p-12">
        {/* ===== Header ===== */}
        <CardHeader className="text-center space-y-4 pb-8">
          <CardTitle className="text-4xl font-bold text-indigo-700">
            Create Request for{" "}
            <span className="text-indigo-900 font-extrabold">{date}</span>
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Select the type of request and fill in the required details below.
          </p>
        </CardHeader>

        {/* ===== Body ===== */}
        <CardContent className="space-y-8">
          {/* ===== Request Type Selector ===== */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3 text-lg">
              Request Type
            </label>
            <Select onValueChange={(val) => setRequestType(val)}>
              <SelectTrigger className="w-full h-14 text-lg rounded-xl border-gray-300">
                <SelectValue placeholder="Select Request Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Leave Request">Leave Request</SelectItem>
                <SelectItem value="Half Day Request">Half Day Request</SelectItem>
                <SelectItem value="Work From Home">Work From Home</SelectItem>
                <SelectItem value="Document Request">Document Request</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ===== Dynamic Form Section ===== */}
          <AnimatePresence mode="wait">
            {requestType && (
              <motion.form
                key={requestType}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-8 pt-6"
              >
                {/* ===== Leave Request ===== */}
                {requestType === "Leave Request" && (
                  <>
                    <Input
                      name="leaveType"
                      placeholder="Leave Type (e.g. Sick Leave)"
                      onChange={handleChange}
                      required
                      className="h-14 text-lg"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        name="startDate"
                        type="date"
                        onChange={handleChange}
                        required
                        className="h-14 text-lg"
                      />
                      <Input
                        name="endDate"
                        type="date"
                        onChange={handleChange}
                        required
                        className="h-14 text-lg"
                      />
                    </div>
                    <Textarea
                      name="reason"
                      placeholder="Reason for leave..."
                      onChange={handleChange}
                      required
                      className="min-h-[140px] text-lg"
                    />
                    <Input
                      name="contact"
                      placeholder="Contact During Leave"
                      onChange={handleChange}
                      required
                      className="h-14 text-lg"
                    />
                  </>
                )}

                {/* ===== Half Day Request ===== */}
                {requestType === "Half Day Request" && (
                  <>
                    <Input
                      name="date"
                      type="date"
                      onChange={handleChange}
                      required
                      className="h-14 text-lg"
                    />
                    <select
                      name="session"
                      onChange={handleChange}
                      required
                      className="w-full h-14 text-lg p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Session</option>
                      <option value="First Half">First Half (Morning)</option>
                      <option value="Second Half">Second Half (Afternoon)</option>
                    </select>
                    <Textarea
                      name="reason"
                      placeholder="Reason for half-day..."
                      onChange={handleChange}
                      required
                      className="min-h-[140px] text-lg"
                    />
                  </>
                )}

                {/* ===== Work From Home ===== */}
                {requestType === "Work From Home" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        name="date"
                        type="date"
                        onChange={handleChange}
                        required
                        className="h-14 text-lg"
                      />
                      <Input
                        name="duration"
                        placeholder="Full Day / Half Day"
                        onChange={handleChange}
                        required
                        className="h-14 text-lg"
                      />
                    </div>
                    <Textarea
                      name="reason"
                      placeholder="Reason for WFH..."
                      onChange={handleChange}
                      required
                      className="min-h-[140px] text-lg"
                    />
                    <Input
                      name="contact"
                      placeholder="Contact During WFH"
                      onChange={handleChange}
                      required
                      className="h-14 text-lg"
                    />
                  </>
                )}

                {/* ===== Document Request ===== */}
                {requestType === "Document Request" && (
                  <>
                    <Input
                      name="documentType"
                      placeholder="Document Type (e.g. Salary Slip)"
                      onChange={handleChange}
                      required
                      className="h-14 text-lg"
                    />
                    <Textarea
                      name="purpose"
                      placeholder="Purpose of request..."
                      onChange={handleChange}
                      required
                      className="min-h-[140px] text-lg"
                    />
                    <Textarea
                      name="notes"
                      placeholder="Additional Notes (optional)"
                      onChange={handleChange}
                      className="min-h-[100px] text-lg"
                    />
                  </>
                )}

                {/* ===== Buttons ===== */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-lg h-14 rounded-xl shadow-md"
                  >
                    Submit {requestType}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg h-14 rounded-xl"
                  >
                    ← Back to Attendance
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.main>
  );
}
