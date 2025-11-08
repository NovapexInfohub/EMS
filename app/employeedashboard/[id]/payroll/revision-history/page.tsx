"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, ArrowLeft } from "lucide-react";

export default function SalaryRevisionHistoryPage() {
  const router = useRouter();
  const { id } = useParams();

  const revisions = [
    {
      effectiveDate: "January 2025",
      previousCTC: 750000,
      newCTC: 850000,
      remarks: "Annual Performance Increment",
    },
    {
      effectiveDate: "July 2024",
      previousCTC: 650000,
      newCTC: 750000,
      remarks: "Mid-Year Promotion Adjustment",
    },
  ];

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <RefreshCcw className="text-indigo-600" /> Salary Revision History
        </h1>
        <Button
          onClick={() => router.push(`/employeedashboard/${id}/payroll`)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
      </div>

      <Card className="shadow-lg border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-indigo-700">Revision Records</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Effective Date</th>
                <th className="p-3 border">Previous CTC</th>
                <th className="p-3 border">New CTC</th>
                <th className="p-3 border">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {revisions.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-3 border">{r.effectiveDate}</td>
                  <td className="p-3 border">₹{r.previousCTC.toLocaleString()}</td>
                  <td className="p-3 border text-green-700 font-semibold">
                    ₹{r.newCTC.toLocaleString()}
                  </td>
                  <td className="p-3 border">{r.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.main>
  );
}
