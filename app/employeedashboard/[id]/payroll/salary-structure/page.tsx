"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

export default function SalaryStructurePage() {
  const router = useRouter();
  const { id } = useParams();

  const salaryStructure = [
    { component: "Basic Pay", amount: 50000 },
    { component: "HRA (House Rent Allowance)", amount: 15000 },
    { component: "Conveyance Allowance", amount: 5000 },
    { component: "Medical Allowance", amount: 2500 },
    { component: "Performance Bonus", amount: 10000 },
    { component: "Provident Fund (Employer)", amount: 5000 },
  ];

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <FileText className="text-indigo-600" /> Salary Structure
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
          <CardTitle className="text-indigo-700">Earnings Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Component</th>
                <th className="p-3 border">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {salaryStructure.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.component}</td>
                  <td className="p-3 border">{item.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.main>
  );
}
