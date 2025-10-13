"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";

export default function DocumentRequestPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form, setForm] = useState({
    documentType: "",
    purpose: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Document Request submitted by Employee ID: ${id}`);
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
          <FileText className="text-indigo-600" />
          Document Request
        </h1>
        <Button
          onClick={() => router.push(`/employeedashboard/${id}/attendance`)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Attendance
        </Button>
      </div>

      {/* ===== Document Request Form ===== */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-6 max-w-3xl mx-auto"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">
          Request for Official Documents
        </h2>

        <div className="grid gap-5">
          <div>
            <label className="font-medium text-gray-700">Document Type</label>
            <Input
              name="documentType"
              placeholder="e.g. Experience Letter, Salary Slip, etc."
              value={form.documentType}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Purpose</label>
            <Textarea
              name="purpose"
              placeholder="Why do you need this document?"
              value={form.purpose}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Additional Notes</label>
            <Textarea
              name="additionalNotes"
              placeholder="Any extra details or instructions..."
              value={form.additionalNotes}
              onChange={handleChange}
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
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-3">
          <p>📄 <strong>Processing Time:</strong> Document requests usually take 3–5 business days to process.</p>
          <p>📬 <strong>Collection:</strong> Once approved, documents can be collected from the HR department or emailed to your registered address.</p>
          <p>⚠️ <strong>Note:</strong> Ensure all your personal and professional details are updated before requesting official documents.</p>
        </CardContent>
      </Card>
    </motion.main>
  );
}
