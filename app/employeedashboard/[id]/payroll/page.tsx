"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CreditCard,
  FileText,
  Banknote,
  Download,
  BarChart,
  Landmark,
  ClipboardList,
  RefreshCcw,
  Send,
} from "lucide-react";

export default function PayrollModulePage() {
  const router = useRouter();
  const { id } = useParams();

  const payrollOptions = [
    {
      title: "View Salary Structure",
      icon: <FileText className="text-indigo-600 w-6 h-6" />,
      description: "Check your detailed salary components and allowances.",
      route: `/employeedashboard/${id}/payroll/salary-structure`,
    },
    {
      title: "View Payslip",
      icon: <CreditCard className="text-indigo-600 w-6 h-6" />,
      description: "View your monthly payslips for previous and current months.",
      route: `/employeedashboard/${id}/payroll/view-payslip`,
    },
    {
      title: "Download Payslip",
      icon: <Download className="text-indigo-600 w-6 h-6" />,
      description: "Download your payslip in PDF format for record keeping.",
      route: `/employeedashboard/${id}/payroll/download-payslip`,
    },
    {
      title: "View Tax Summary",
      icon: <BarChart className="text-indigo-600 w-6 h-6" />,
      description: "View TDS, income tax deductions, and yearly tax reports.",
      route: `/employeedashboard/${id}/payroll/tax-summary`,
    },
    {
      title: "Check Bank Details",
      icon: <Landmark className="text-indigo-600 w-6 h-6" />,
      description: "Verify your registered bank account and payment details.",
      route: `/employeedashboard/${id}/payroll/bank-details`,
    },
    {
      title: "Submit Reimbursement Claim",
      icon: <Send className="text-indigo-600 w-6 h-6" />,
      description: "Submit bills and claims for approved reimbursements.",
      route: `/employeedashboard/${id}/payroll/reimbursement-claim`,
    },
    {
      title: "View Salary Revision History",
      icon: <RefreshCcw className="text-indigo-600 w-6 h-6" />,
      description: "Check your previous salary hikes and revision records.",
      route: `/employeedashboard/${id}/payroll/revision-history`,
    },
  ];

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <Banknote className="text-indigo-600 w-8 h-8" /> Payroll Module
        </h1>
        <Button
          onClick={() => router.push(`/employeedashboard`)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
      </div>

      {/* ===== Payroll Options Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payrollOptions.map((option, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="flex items-center gap-3 p-5">
              {option.icon}
              <CardTitle className="text-lg font-semibold text-gray-800">
                {option.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <p className="text-gray-600 mb-4">{option.description}</p>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-full transition-all"
                onClick={() => router.push(option.route)}
              >
                Open
              </Button>
            </CardContent>
          </motion.div>
        ))}
      </div>

      {/* ===== Payroll Overview Card ===== */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mt-10 rounded-2xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md transition-all duration-300"
      >
        <CardHeader className="flex items-center gap-3 p-5">
          <ClipboardList className="text-indigo-600 w-6 h-6" />
          <CardTitle className="text-lg font-semibold text-indigo-700">
            Payroll Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 p-5">
          <p className="mb-3">
            The payroll module manages your complete salary-related information — from salary structure and deductions to reimbursement claims and tax summaries. It ensures that payments, revisions, and financial records are maintained accurately and transparently.
          </p>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            <li>Access payslips and download them as needed</li>
            <li>Track income tax and deductions over time</li>
            <li>Check bank details and reimbursement submissions</li>
            <li>Review salary revision history with ease</li>
          </ul>
        </CardContent>
      </motion.div>
    </motion.main>
  );
}
