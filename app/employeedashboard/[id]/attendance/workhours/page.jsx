"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function WorkHoursPage() {
  const router = useRouter();
  const { id } = useParams();

  return (
    <motion.main
      className="min-h-screen bg-gray-50 py-10 px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
          <Timer className="text-indigo-600" /> Track Work Hours
        </h1>
        <Button
          onClick={() => router.push(`/employeedashboard/${id}/attendance/module`)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
      </div>

      <Card className="shadow-md border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle>Work Hours Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Display work hour data or progress charts here.</p>
        </CardContent>
      </Card>
    </motion.main>
  );
}
