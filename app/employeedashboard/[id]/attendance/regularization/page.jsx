"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCcw, ArrowLeft, FileText, CheckCircle, XCircle, Hourglass } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AttendanceRegularization() {
  const router = useRouter();

  // ===== STATE =====
  const [formData, setFormData] = useState({
    date: "",
    type: "",
    reason: "",
    attachment: null,
  });

  const [requests, setRequests] = useState([
    {
      date: "2025-11-01",
      type: "Missed Check-In",
      reason: "Forgot to mark attendance in the morning.",
      status: "Approved",
      remarks: "Verified with manager.",
    },
    {
      date: "2025-11-04",
      type: "Late Arrival",
      reason: "Network issue delayed login.",
      status: "Pending",
      remarks: "-",
    },
    {
      date: "2025-11-06",
      type: "Early Checkout",
      reason: "Left early for a personal emergency.",
      status: "Rejected",
      remarks: "Not approved by supervisor.",
    },
  ]);

  // ===== HANDLERS =====
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.type || !formData.reason) return alert("Please fill all required fields");

    const newRequest = {
      ...formData,
      status: "Pending",
      remarks: "-",
    };

    setRequests([...requests, newRequest]);
    setFormData({ date: "", type: "", reason: "", attachment: null });
    alert("Regularization request submitted successfully!");
  };

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
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <RefreshCcw className="text-indigo-600 w-7 h-7" /> Attendance Regularization
        </h1>
        <Button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
      </div>

      {/* ===== FORM SECTION ===== */}
      <Card className="shadow-md border border-gray-200 bg-white mb-10">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Request Regularization</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700">Date of Attendance *</Label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label className="text-gray-700">Regularization Type *</Label>
                <Select
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Missed Check-In">Missed Check-In</SelectItem>
                    <SelectItem value="Missed Check-Out">Missed Check-Out</SelectItem>
                    <SelectItem value="Late Arrival">Late Arrival</SelectItem>
                    <SelectItem value="Early Checkout">Early Checkout</SelectItem>
                    <SelectItem value="Incorrect Entry">Incorrect Entry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-700">Reason / Explanation *</Label>
              <Textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Explain the reason for regularization..."
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label className="text-gray-700">Attach Supporting Document (Optional)</Label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="mt-2"
              />
              {formData.attachment && (
                <p className="text-sm text-gray-600 mt-1">
                  Attached: {formData.attachment.name}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* ===== REQUEST HISTORY TABLE ===== */}
      <Card className="shadow-md border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <FileText className="text-indigo-600" /> Regularization Request History
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700 border-collapse">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Reason</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-100 hover:bg-indigo-50 transition-all"
                >
                  <td className="py-3 px-4">{req.date}</td>
                  <td className="py-3 px-4">{req.type}</td>
                  <td className="py-3 px-4">{req.reason}</td>
                  <td
                    className={`py-3 px-4 font-medium ${
                      req.status === "Approved"
                        ? "text-green-600"
                        : req.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {req.status}
                  </td>
                  <td className="py-3 px-4">{req.remarks}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.main>
  );
}
