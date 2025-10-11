"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Award,
  ThumbsUp,
  Target,
  ChevronLeft,
  TrendingUp,
} from "lucide-react";

export default function EmployeePerformancePage({ params }) {
  const { id } = React.use(params);
  const router = useRouter();

  const [employee, setEmployee] = useState({
    id,
    name: "Alice Johnson",
    department: "Engineering",
    position: "Frontend Developer",
    taskCompletion: 93,
    collaboration: 87,
    creativity: 82,
    punctuality: 95,
    achievements: [
      "Built 5 new UI components for the core product",
      "Led front-end migration to Next.js",
      "Received ‘Employee of the Month’ (August 2025)",
    ],
    strengths: [
      "Strong communication and collaboration",
      "Consistently meets deadlines",
      "Takes initiative in solving UI challenges",
      "Mentors junior developers effectively",
    ],
    appreciations: [
      {
        from: "Manager (Robert Brown)",
        comment:
          "Your contributions to the recent sprint made a huge impact! Keep it up 🎯",
        date: "2025-09-25",
      },
      {
        from: "Team Lead (Sophia Lee)",
        comment:
          "Great teamwork and ownership on the new dashboard project 👏",
        date: "2025-08-15",
      },
    ],
    goals: [
      "Enhance TypeScript and testing automation skills",
      "Lead a cross-team UI initiative",
      "Participate in UI/UX design workshops",
    ],
    recommendedTrainings: [
      "Advanced React & TypeScript",
      "Leadership in Tech Teams",
      "Effective Communication & Team Collaboration",
    ],
  });

  useEffect(() => {
    // Future API call here
  }, [id]);

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 p-8 space-y-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">
            🌟 Employee Growth Overview
          </h1>
          <p className="text-gray-600">
            A positive snapshot for <strong>{employee.name}</strong>
          </p>
        </div>

        <Button
          onClick={() => router.push(`/employeedashboard`)}
          className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </Button>
      </div>

      {/* ===== Quick Stats ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[ 
          { title: "Task Completion", value: employee.taskCompletion },
          { title: "Collaboration", value: employee.collaboration },
          { title: "Creativity", value: employee.creativity },
          { title: "Punctuality", value: employee.punctuality },
        ].map((item, idx) => (
          <Card key={idx} className="border shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex items-center gap-3">
              <TrendingUp className="text-indigo-600 w-6 h-6" />
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2 font-semibold">{item.value}%</p>
              <Progress value={item.value} className="h-3" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ===== Strengths ===== */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex items-center gap-3">
          <Star className="text-yellow-500 w-6 h-6" />
          <CardTitle>Key Strengths</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          {employee.strengths.map((strength, idx) => (
            <div
              key={idx}
              className="p-3 border rounded-lg bg-white hover:bg-indigo-50 transition-all duration-200"
            >
              <p className="text-gray-700 font-medium">⭐ {strength}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ===== Appreciations ===== */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex items-center gap-3">
          <ThumbsUp className="text-green-600 w-6 h-6" />
          <CardTitle>Recent Appreciations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {employee.appreciations.map((app, idx) => (
            <div
              key={idx}
              className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200"
            >
              <p className="text-sm text-gray-500 mb-1">
                {app.date} • {app.from}
              </p>
              <p className="font-medium">{app.comment}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ===== Goals & Growth ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md border border-gray-200">
          <CardHeader className="flex items-center gap-3">
            <Target className="text-indigo-600 w-6 h-6" />
            <CardTitle>Upcoming Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {employee.goals.map((goal, idx) => (
              <li key={idx} className="ml-5 text-gray-700 list-disc">
                {goal}
              </li>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-md border border-gray-200">
          <CardHeader className="flex items-center gap-3">
            <Award className="text-indigo-600 w-6 h-6" />
            <CardTitle>Recommended Trainings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            {employee.recommendedTrainings.map((train, idx) => (
              <li key={idx} className="ml-5 list-disc">
                {train}
              </li>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ===== Achievements ===== */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex items-center gap-3">
          <Award className="text-yellow-500 w-6 h-6" />
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          {employee.achievements.map((ach, idx) => (
            <li key={idx} className="ml-5 list-disc">
              {ach}
            </li>
          ))}
        </CardContent>
      </Card>
    </motion.main>
  );
}
