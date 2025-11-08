"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, ArrowLeft } from "lucide-react";

export default function TaxSummaryPage() {
  const router = useRouter();
  const { id } = useParams();

  const taxDetails = [
    { label: "Gross Income", value: 870000 },
    { label: "Taxable Income", value: 780000 },
    { label: "TDS Deducted (YTD)", value: 65000 },
    { label: "Tax Paid", value: 60000 },
    { label: "Balance Payable/Refundable", value: 5000 },
  ];

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <BarChart className="text-indigo-600" /> Tax Summary
        </h1>
        <Button
          onClick={() => router.push(`/employeedashboard/${id}/payroll`)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
      </div>

      {/* Tax Summary Card */}
      <Card className="shadow-lg border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-indigo-700">Yearly Tax Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3 text-gray-700">
          {taxDetails.map((t, i) => (
            <div
              key={i}
              className="flex justify-between border-b pb-2 text-sm md:text-base"
            >
              <span className="font-medium">{t.label}</span>
              <span className="font-semibold text-indigo-700">
                ₹{t.value.toLocaleString()}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.main>
  );
}
