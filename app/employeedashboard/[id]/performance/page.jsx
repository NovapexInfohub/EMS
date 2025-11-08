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
  Target,
  BarChart3,
  FileText,
  ThumbsUp,
  BookOpenCheck,
  ClipboardCheck,
  Sparkles,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";

export default function EmployeePerformancePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [newGoal, setNewGoal] = useState("");
  const [selfAppraisal, setSelfAppraisal] = useState({
    achievements: "",
    comments: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [employee, setEmployee] = useState({
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
    feedback: [
      {
        title: "H1 Review (Jan–Jun 2025)",
        manager: "Robert Brown",
        comment:
          "Strong contribution to project architecture and mentoring. Needs minor improvement in task documentation.",
        rating: "4.5 / 5",
      },
      {
        title: "H2 Review (Jul–Dec 2025)",
        manager: "Pending",
        comment:
          "Review scheduled soon. Continue maintaining code quality and mentoring sessions.",
        rating: "Pending",
      },
    ],
    trainings: [
      "Advanced React Patterns",
      "Effective Code Reviews",
      "Time Management for Developers",
      "Improving Sprint Documentation",
    ],
    reports: [
      {
        period: "Q1 2025",
        summary:
          "Exceeded project delivery goals and maintained 98% sprint adherence.",
        rating: "4.4 / 5",
      },
      {
        period: "Q2 2025",
        summary:
          "Improved collaboration with cross-functional teams and initiated new UI performance metrics.",
        rating: "4.3 / 5",
      },
    ],
  });

  // Handle new goal addition
  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setEmployee((prev) => ({
        ...prev,
        goals: [...prev.goals, newGoal],
      }));
      setNewGoal("");
    }
  };

  // Handle KPI progress update simulation
  const handleIncreaseKPI = (index) => {
    setEmployee((prev) => {
      const updatedKPIs = [...prev.kpis];
      updatedKPIs[index].value = Math.min(updatedKPIs[index].value + 1, 100);
      return { ...prev, kpis: updatedKPIs };
    });
  };

  // Handle self-appraisal submit
  const handleSubmitAppraisal = () => {
    if (!selfAppraisal.achievements.trim() || !selfAppraisal.comments.trim()) {
      alert("Please fill in both fields before submitting.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Auto-hide success after 3s
  };

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
            Performance Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Overview for <span className="font-semibold">{employee.name}</span>{" "}
            — Department: {employee.department}
          </p>
        </div>
        <Button
          onClick={() => router.push(`/employeedashboard`)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
      </div>

      {/* ===== 🎯 SET GOALS ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-md border border-indigo-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <Target className="text-indigo-600 w-6 h-6" />
            <CardTitle>🎯 Goals & Objectives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            {employee.goals.length > 0 ? (
              employee.goals.map((goal, idx) => (
                <li key={idx} className="ml-5 list-disc">
                  {goal}
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic ml-2">
                No goals added yet. Add one below.
              </p>
            )}
            <div className="flex gap-2 mt-3">
              <Input
                placeholder="Add a new goal..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={handleAddGoal}
                className="flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" /> Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== 📊 TRACK KPIs ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-md border border-purple-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <BarChart3 className="text-purple-600 w-6 h-6" />
            <CardTitle>📊 Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {employee.kpis.map((kpi, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1 text-gray-700">
                  <span className="font-medium">{kpi.name}</span>
                  <span>{kpi.value}%</span>
                </div>
                <Progress value={kpi.value} className="h-3" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncreaseKPI(idx)}
                  className="mt-1"
                >
                  Improve +
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== 📝 SELF APPRAISAL ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-md border border-green-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <FileText className="text-green-600 w-6 h-6" />
            <CardTitle>📝 Self-Appraisal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Describe your key achievements..."
              value={selfAppraisal.achievements}
              onChange={(e) =>
                setSelfAppraisal((p) => ({
                  ...p,
                  achievements: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Any challenges or feedback for improvement..."
              value={selfAppraisal.comments}
              onChange={(e) =>
                setSelfAppraisal((p) => ({
                  ...p,
                  comments: e.target.value,
                }))
              }
            />
            <Button
              className="bg-green-600 hover:bg-green-700 text-white mt-2"
              onClick={handleSubmitAppraisal}
            >
              Submit Appraisal
            </Button>
            {submitted && (
              <div className="flex items-center gap-2 text-green-700 font-medium mt-2">
                <CheckCircle2 className="w-5 h-5" />
                Self-Appraisal Submitted Successfully!
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== 💬 MANAGER FEEDBACK ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-md border border-blue-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <ThumbsUp className="text-blue-600 w-6 h-6" />
            <CardTitle>💬 Manager Feedback</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-5">
            {employee.feedback.map((fb, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border bg-gradient-to-br from-indigo-50 to-white"
              >
                <h2 className="text-lg font-semibold text-indigo-700">
                  {fb.title}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  Manager: {fb.manager}
                </p>
                <p className="text-gray-700">{fb.comment}</p>
                <p className="font-medium text-indigo-700 mt-2">
                  ⭐ Rating: {fb.rating}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== 🎓 TRAINING RECOMMENDATIONS ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-md border border-teal-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <BookOpenCheck className="text-teal-600 w-6 h-6" />
            <CardTitle>🎓 Training Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {employee.trainings.map((train, idx) => (
              <li key={idx} className="ml-5 list-disc text-gray-700">
                {train}
              </li>
            ))}
            <Button variant="outline" className="mt-3">
              View All Trainings
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== 📈 PERFORMANCE REPORTS ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="shadow-md border border-pink-100 hover:shadow-xl transition-all">
          <CardHeader className="flex items-center gap-3">
            <ClipboardCheck className="text-pink-600 w-6 h-6" />
            <CardTitle>📈 Performance Reports</CardTitle>
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
