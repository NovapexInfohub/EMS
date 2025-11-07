"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DepartmentReportGenerator() {
  const [department, setDepartment] = useState("");
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!department || !reportType || !description.trim()) {
      alert("⚠️ Please fill all fields (department, report type, and description).");
      return;
    }

    setIsGenerating(true);

    // Simulate API call or backend process
    setTimeout(() => {
      setIsGenerating(false);
      alert(`✅ ${reportType} report for ${department} department generated successfully!\nDescription: ${description}`);
      setDescription(""); // clear input
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#f8f9fb] text-gray-800 flex justify-center items-center p-8"
    >
      <Card className="w-full max-w-2xl bg-white shadow-lg border border-gray-200 rounded-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">Generate Department Report</CardTitle>
            <Link href="/attendance">
              <Button variant="outline" className="text-sm">Back</Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Select department and report type, then write a short description before generating your report.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Department Selection */}
          <div>
            <p className="text-sm font-medium mb-1">Select Department</p>
            <Select onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Choose department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HR">HR Department</SelectItem>
                <SelectItem value="Tech">Tech Department</SelectItem>
                <SelectItem value="Finance">Finance Department</SelectItem>
                <SelectItem value="Marketing">Marketing Department</SelectItem>
                <SelectItem value="Operations">Operations Department</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Report Type Selection */}
          <div>
            <p className="text-sm font-medium mb-1">Select Report Type</p>
            <Select onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Choose report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Attendance">Attendance Report</SelectItem>
                <SelectItem value="Performance">Performance Report</SelectItem>
                <SelectItem value="Leave">Leave Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description Box */}
          <div>
            <p className="text-sm font-medium mb-1">Description</p>
            <Textarea
              placeholder="Write a short description about the purpose of this report..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none h-28"
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-end">
            <Button
              className="bg-[#0077ff] hover:bg-[#0063d1] text-white px-5 py-2 rounded-md"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Report"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
