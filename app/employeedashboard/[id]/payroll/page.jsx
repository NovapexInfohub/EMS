"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, FileDown } from "lucide-react";

export default function PayrollPage() {
  const router = useRouter();
  const { id } = useParams();

  const payroll = {
    month: "October 2025",
    employeeName: "Alice Johnson",
    employeeId: id,
    department: "Engineering",
    position: "Frontend Developer",
    payDate: "November 1, 2025",
    earnings: [
      { label: "Basic Pay", amount: 50000 },
      { label: "House Rent Allowance (HRA)", amount: 15000 },
      { label: "Conveyance Allowance", amount: 5000 },
      { label: "Performance Bonus", amount: 10000 },
    ],
    deductions: [
      { label: "Provident Fund (PF)", amount: 5000 },
      { label: "Professional Tax", amount: 200 },
      { label: "Health Insurance", amount: 800 },
    ],
  };

  const totalEarnings = payroll.earnings.reduce((acc, e) => acc + e.amount, 0);
  const totalDeductions = payroll.deductions.reduce((acc, d) => acc + d.amount, 0);
  const netPay = totalEarnings - totalDeductions;

  const handleDownload = () => {
    alert("Payslip download feature coming soon!");
  };

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <CreditCard className="text-indigo-600 w-7 h-7" /> Payroll Details
        </h1>
        <Button
          onClick={() => router.push(`/employeedashboard/${id}`)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
      </div>

      {/* Payroll Summary */}
      <Card className="shadow-md border border-gray-200 bg-white mb-8">
        <CardHeader>
          <CardTitle className="text-lg text-indigo-700">
            Payroll Summary — {payroll.month}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong>Employee Name:</strong> {payroll.employeeName}
          </p>
          <p>
            <strong>Employee ID:</strong> {payroll.employeeId}
          </p>
          <p>
            <strong>Department:</strong> {payroll.department}
          </p>
          <p>
            <strong>Position:</strong> {payroll.position}
          </p>
          <p>
            <strong>Pay Date:</strong> {payroll.payDate}
          </p>
        </CardContent>
      </Card>

      {/* Earnings & Deductions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Earnings */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md transition-all duration-300"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-700">
              Earnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4">
            {payroll.earnings.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-gray-700 border-b border-gray-100 pb-2"
              >
                <span>{item.label}</span>
                <span>₹{item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-green-700 mt-3">
              <span>Total Earnings</span>
              <span>₹{totalEarnings.toLocaleString()}</span>
            </div>
          </CardContent>
        </motion.div>

        {/* Deductions */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md transition-all duration-300"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-red-700">
              Deductions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4">
            {payroll.deductions.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-gray-700 border-b border-gray-100 pb-2"
              >
                <span>{item.label}</span>
                <span>- ₹{item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-red-700 mt-3">
              <span>Total Deductions</span>
              <span>₹{totalDeductions.toLocaleString()}</span>
            </div>
          </CardContent>
        </motion.div>
      </div>

      {/* Net Pay Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mt-8 rounded-2xl shadow-xl border border-gray-200 bg-white transition-all duration-300"
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-700">
            Net Pay Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row justify-between items-center p-6">
          <div className="text-gray-700">
            <p>
              <strong>Total Earnings:</strong> ₹{totalEarnings.toLocaleString()}
            </p>
            <p>
              <strong>Total Deductions:</strong> ₹{totalDeductions.toLocaleString()}
            </p>
            <p className="text-lg mt-2 font-bold text-green-700">
              Net Pay (in hand): ₹{netPay.toLocaleString()}
            </p>
          </div>
          <Button
            onClick={handleDownload}
            className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
          >
            <FileDown className="w-5 h-5" /> Download Payslip
          </Button>
        </CardContent>
      </motion.div>
    </motion.main>
  );
}
