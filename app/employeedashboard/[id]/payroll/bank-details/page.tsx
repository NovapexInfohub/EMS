"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, ArrowLeft } from "lucide-react";

export default function BankDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const bankDetails = {
    bankName: "HDFC Bank",
    accountNumber: "XXXXXX9843",
    ifsc: "HDFC0001024",
    branch: "Baner, Pune",
    accountType: "Salary Account",
    upiLinked: "alice@hdfcbank",
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <Landmark className="text-indigo-600" /> Bank Details
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
          <CardTitle className="text-indigo-700">Registered Bank Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3 text-gray-700">
          {Object.entries(bankDetails).map(([key, value], i) => (
            <div
              key={i}
              className="flex justify-between border-b pb-2 capitalize"
            >
              <span className="font-medium">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="font-semibold text-indigo-700">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.main>
  );
}
