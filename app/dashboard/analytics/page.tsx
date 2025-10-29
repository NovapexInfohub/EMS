"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// React Icons
import { FaSmile, FaBolt, FaArrowDown, FaBullseye, FaChartLine, FaRegSmile } from "react-icons/fa";

export default function PerformanceAnalytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeRange, setActiveRange] = useState("Month");

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const metrics = [
    { label: "Employee Satisfaction", value: 87, change: "+5%", trend: "up" },
    { label: "Productivity Index", value: 92, change: "+12%", trend: "up" },
    { label: "Turnover Rate", value: 8, change: "-3%", trend: "down" },
    { label: "Training Completion", value: 94, change: "+8%", trend: "up" },
  ];

  const departments = [
    { name: "Engineering", productivity: 95, satisfaction: 89, employees: 45 },
    { name: "Sales", productivity: 88, satisfaction: 85, employees: 32 },
    { name: "Marketing", productivity: 88, satisfaction: 85, employees: 32 },
    { name: "HR", productivity: 88, satisfaction: 85, employees: 32 },
  ];

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-blue-100 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-blue-50 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Performance Analytics</h1>
          <p className="text-gray-500 text-sm">Comprehensive insights into your organization’s performance</p>
        </div>

        <div className="flex gap-2 bg-blue-50 p-1 rounded-lg">
          {["Week", "Month", "Quarter", "Year"].map((range) => (
            <Button
              key={range}
              onClick={() => setActiveRange(range)}
              size="sm"
              className={`text-sm font-medium rounded-md px-3 py-1 ${
                activeRange === range
                  ? "bg-white text-blue-600 shadow-sm"
                  : "bg-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Card className="bg-blue-50 border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-sm font-medium text-gray-700">{metric.label}</div>
                  <Badge
                    className={`text-xs font-semibold px-2 py-0.5 ${
                      metric.trend === "up"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {metric.change}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-blue-600">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="mt-3 h-2 bg-blue-100" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Department Performance */}
      <Card className="bg-blue-50 border border-blue-100 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-blue-700 text-lg">Department Performance</CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            Detailed breakdown by department
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.name}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white/80 border border-blue-100 rounded-xl p-4 hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{dept.name}</h4>
                  <p className="text-xs text-gray-500">Detailed breakdown by department</p>
                </div>
                <Badge className="text-xs text-gray-700 bg-blue-100 px-2 py-1 rounded-md">
                  {dept.employees} Employees
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Productivity */}
                <div>
                  <div className="flex justify-between mb-1 text-sm text-gray-700">
                    <span>Productivity</span>
                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                      <FaChartLine /> {dept.productivity}%
                    </span>
                  </div>
                  <Progress value={dept.productivity} className="h-2 bg-blue-100" />
                </div>

                {/* Satisfaction */}
                <div>
                  <div className="flex justify-between mb-1 text-sm text-gray-700">
                    <span>Satisfaction</span>
                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                      <FaRegSmile /> {dept.satisfaction}%
                    </span>
                  </div>
                  <Progress value={dept.satisfaction} className="h-2 bg-blue-100" />
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
