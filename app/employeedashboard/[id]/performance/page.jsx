"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  BarChart3,
  ClipboardCheck,
  Target,
  FileText,
  BookOpenCheck,
  Sparkles,
  Lightbulb,
  ThumbsUp,
} from "lucide-react";

export default function EmployeePerformancePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [employee] = useState({
    name: "Alice Johnson",
    department: "Engineering",
    goals: [
      "Improve TypeScript proficiency",
      "Contribute to UI component library",
      "Mentor junior developers",
    ],
    kpis: [
      { name: "Code Quality", value: 90 },
      { name: "Task Completion", value: 95 },
      { name: "Collaboration", value: 88 },
      { name: "Innovation", value: 85 },
    ],
    trainings: [
      "Advanced React Patterns",
      "Time Management for Developers",
      "Effective Code Reviews",
    ],
    reports: [
      { period: "Q1 2025", rating: "4.4 / 5", summary: "Excellent delivery pace" },
      { period: "Q2 2025", rating: "4.3 / 5", summary: "Strong technical initiative" },
    ],
    feedback: {
      h1: {
        title: "H1 Review (Jan - Jun 2025)",
        from: "Manager: Robert Brown",
        comment:
          "Great technical leadership and proactive contributions during the UI refactor. Slight improvement needed in sprint documentation.",
        rating: 4.5,
      },
      h2: {
        title: "H2 Review (Jul - Dec 2025)",
        comment:
          "🌟 Your H2 review is coming soon! Keep pushing your limits — your current progress is inspiring! 🚀",
        status: "upcoming",
      },
      final: {
        title: "Final Review (2025)",
        comment:
          "To be unlocked post-H2 — your consistent performance and growth mindset are setting you up for success.",
      },
    },
  });

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 space-y-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
            <Sparkles className="text-purple-500 w-7 h-7" />
            Performance Module
          </h1>
          <p className="text-gray-600 mt-1">
            Overview for <span className="font-semibold">{employee.name}</span>
          </p>
        </div>
        <Button
          onClick={() => router.push(`/employeedashboard`)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
      </div>

      {/* ===== 1️⃣ SET GOALS ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-lg border border-indigo-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <Target className="text-indigo-600 w-6 h-6" />
            <CardTitle>🎯 Set Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            {employee.goals.map((goal, idx) => (
              <li key={idx} className="ml-5 list-disc">
                {goal}
              </li>
            ))}
            <Input placeholder="Add a new goal..." className="mt-3" />
            <Button variant="outline" className="mt-2">Add Goal</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== 2️⃣ TRACK KPIs ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-lg border border-purple-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <BarChart3 className="text-purple-600 w-6 h-6" />
            <CardTitle>📊 Track KPIs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {employee.kpis.map((kpi, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <span>{kpi.name}</span>
                  <span>{kpi.value}%</span>
                </div>
                <Progress value={kpi.value} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== 3️⃣ SUBMIT SELF-APPRAISAL ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-lg border border-green-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <FileText className="text-green-600 w-6 h-6" />
            <CardTitle>📝 Submit Self-Appraisal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Describe your key achievements..." />
            <Button className="bg-green-600 hover:bg-green-700 text-white mt-2">
              Submit Self-Appraisal
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== 4️⃣ VIEW MANAGER FEEDBACK ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-lg border border-blue-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <ThumbsUp className="text-blue-600 w-6 h-6" />
            <CardTitle>💬 View Manager Feedback</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-5">
            {/* H1 Review */}
            <div className="p-4 rounded-lg border bg-gradient-to-br from-indigo-50 to-white">
              <h2 className="text-lg font-semibold text-indigo-700">
                {employee.feedback.h1.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1">{employee.feedback.h1.from}</p>
              <p className="text-gray-700">{employee.feedback.h1.comment}</p>
              <p className="font-medium text-indigo-700 mt-2">
                ⭐ Rating: {employee.feedback.h1.rating}/5
              </p>
            </div>

            {/* H2 Upcoming */}
            <motion.div
              animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="p-4 rounded-lg border bg-gradient-to-br from-yellow-50 to-white"
            >
              <h2 className="text-lg font-semibold text-yellow-700">
                {employee.feedback.h2.title}
              </h2>
              <p className="mt-2 text-yellow-600 font-medium">
                {employee.feedback.h2.comment}
              </p>
              <p className="mt-1 text-sm text-gray-500 italic">
                Status: {employee.feedback.h2.status.toUpperCase()}
              </p>
            </motion.div>

            {/* Final Review Locked */}
            <div className="p-4 rounded-lg border bg-gradient-to-br from-gray-50 to-white opacity-70">
              <h2 className="text-lg font-semibold text-gray-600">
                {employee.feedback.final.title}
              </h2>
              <p className="text-gray-500 mt-2">{employee.feedback.final.comment}</p>
              <p className="mt-2 italic text-sm text-gray-400">🔒 Will unlock after H2 review</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== 5️⃣ ACCESS TRAINING RECOMMENDATIONS ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-lg border border-teal-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <BookOpenCheck className="text-teal-600 w-6 h-6" />
            <CardTitle>🎓 Access Training Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {employee.trainings.map((train, idx) => (
              <li key={idx} className="ml-5 list-disc text-gray-700">
                {train}
              </li>
            ))}
            <Button variant="outline" className="mt-3">
              Explore More Trainings
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== 6️⃣ VIEW PERFORMANCE REPORTS ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-lg border border-pink-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <ClipboardCheck className="text-pink-600 w-6 h-6" />
            <CardTitle>📈 View Performance Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {employee.reports.map((report, idx) => (
              <div
                key={idx}
                className="p-3 border rounded-lg bg-gradient-to-r from-pink-50 to-white"
              >
                <p className="font-semibold text-pink-700">{report.period}</p>
                <p className="text-gray-700">{report.summary}</p>
                <p className="text-sm text-gray-500">Rating: {report.rating}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.main>
  );
}
