"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowLeft } from "lucide-react";

export default function ViewPayslipPage() {
  const router = useRouter();
  const { id } = useParams();

  const payslips = [
    { month: "October 2025", status: "Paid", download: true },
    { month: "September 2025", status: "Paid", download: true },
    { month: "August 2025", status: "Paid", download: true },
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
          <CreditCard className="text-indigo-600" /> Payslips
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
          <CardTitle className="text-indigo-700">Monthly Payslips</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Month</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {payslips.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.month}</td>
                  <td className="p-3 border text-green-600">{item.status}</td>
                  <td className="p-3 border">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      View Payslip
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.main>
  );
}
