"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";

export default function DownloadPayslipPage() {
  const router = useRouter();
  const { id } = useParams();

  // ✅ Explicitly type the parameter as a string
  const handleDownload = (month: string) => {
    alert(`Payslip for ${month} downloaded successfully.`);
  };

  const payslipMonths: string[] = ["October 2025", "September 2025", "August 2025"];

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <Download className="text-indigo-600" /> Download Payslips
        </h1>
        <Button
          onClick={() => router.push(`/employeedashboard/${id}/payroll`)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
      </div>

      <Card className="shadow-lg border border-gray-200 bg-white p-6">
        {payslipMonths.map((month, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b py-3"
          >
            <p className="font-medium">{month}</p>
            <Button
              onClick={() => handleDownload(month)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Download
            </Button>
          </div>
        ))}
      </Card>
    </motion.main>
  );
}
