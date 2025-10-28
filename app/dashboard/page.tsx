"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AuthGuard from "@/components/AuthGuard";
import Chatbot from "@/components/ui/chatbot";

export default function DashboardPage() {
  const [stats] = useState({
    totalEmployees: 247,
    presentToday: 198,
    onLeave: 12,
    pendingRequests: 8,
  });

  const recentActivities = [
    { id: 1, title: "New employee added", user: "Sarah Johnson", time: "2 hours ago" },
    { id: 2, title: "Leave request approved", user: "Mike Chen", time: "4 hours ago" },
    { id: 3, title: "Employee Settings updated", user: "System", time: "1 day ago" },
    { id: 4, title: "Performance review due", user: "Alex Rodriguez", time: "2 days ago" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Team meeting", time: "Today, 2:00 PM", tag: "Engineering" },
    { id: 2, title: "Performance review", time: "Tomorrow, 9:00 AM", tag: "HR" },
    { id: 3, title: "Quarterly Planning", time: "Friday, 10:00 AM", tag: "Management" },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f8f9fb] text-gray-800 font-sans">
        {/* --- Top Navigation --- */}
        
        {/* --- Main Content --- */}
        <main className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Dashboard Overview</h2>
              <p className="text-sm text-gray-500">
                Welcome back! Here's what's happening today
              </p>
            </div>
            <Button className="bg-[#0077ff] hover:bg-[#0063d1] text-white px-5 py-2 rounded-md">
              Generate Report
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Employees", value: stats.totalEmployees, color: "text-[#0077ff]", info: "+12 this month" },
              { label: "Present Today", value: `${stats.presentToday}/${stats.totalEmployees}`, color: "text-green-600", info: "80% attendance" },
              { label: "On Leave", value: `${stats.onLeave}/${stats.totalEmployees}`, color: "text-red-500", info: "Scheduled" },
              { label: "Pending Requests", value: `${stats.pendingRequests}/${stats.totalEmployees}`, color: "text-yellow-500", info: "Needs attention" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
              >
                <Card className="bg-[#eaf4ff] border border-[#d8e9ff] rounded-lg shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-700">{item.label}</p>
                    <h3 className={`text-3xl font-bold ${item.color} mt-2`}>{item.value}</h3>
                    <p className="text-xs text-gray-500 mt-2">{item.info}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>


          {/* Recent Activities + Upcoming Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Recent Activities */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="h-full"
            >
              <Card className="h-full bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col">
                <CardHeader className="border-b border-sky-100 p-4">
                  <CardTitle className="text-base font-semibold text-gray-700">
                    Recent Activities
                  </CardTitle>
                  <p className="text-xs text-gray-500">
                    Latest updates and actions in your organization
                  </p>
                </CardHeader>
                <CardContent className="p-4 space-y-3 flex-grow">
                  {recentActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start justify-between bg-white/40 rounded-md p-3 hover:bg-sky-50 transition"
                    >
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-gray-500">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-sky-500 mt-1"></div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="h-full"
            >
              <Card className="h-full bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col">
                <CardHeader className="border-b border-sky-100 p-4">
                  <CardTitle className="text-base font-semibold text-gray-700">
                    Upcoming Events
                  </CardTitle>
                  <p className="text-xs text-gray-500">
                    Your schedule for the next few weeks
                  </p>
                </CardHeader>
                <CardContent className="p-4 space-y-3 flex-grow">
                  {upcomingEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start justify-between bg-white/40 border border-sky-100 rounded-md p-3 hover:bg-sky-50 transition"
                    >
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs text-gray-700 border-sky-200"
                      >
                        {event.tag}
                      </Badge>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>


          {/* Management Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Attendance Management",
                description:
                  "Track attendance, monitor presence, and view daily reports with ease.",
                href: "/attendance",
                color: "from-[#b14b96] to-[#7a2b9b]",
              },
              {
                title: "Performance Management",
                description:
                  "Manage performance reviews, feedback cycles and track growth metrics.",
                href: "/performance",
                color: "from-[#5c4ab1] to-[#342b9b]",
              },
              {
                title: "Settings",
                description:
                  "Configure user roles, manage preferences and system-wide settings.",
                href: "/settings",
                color: "from-[#3a3b45] to-[#1e1f26]",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
              >
                <Link href={card.href}>
                  <div
                    className={`bg-gradient-to-r ${card.color} text-white p-5 rounded-lg shadow-md hover:shadow-lg transition`}
                  >
                    <h3 className="text-base font-semibold mb-1">{card.title}</h3>
                    <p className="text-sm text-white/90 mb-4">{card.description}</p>
                    <Button className="bg-white/20 hover:bg-white/30 text-white text-sm rounded-md px-4 py-1">
                      Go to {card.title.split(" ")[0]}
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Floating Chatbot */}
          <Chatbot />
        </main>
      </div>
    </AuthGuard>
  );
}
