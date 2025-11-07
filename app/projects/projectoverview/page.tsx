"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const projectStats = [
  { title: "Total Projects", value: "20", color: "text-blue-600" },
  { title: "Completed", value: "05/20", color: "text-green-600" },
  { title: "Active", value: "12/20", color: "text-yellow-500" },
  { title: "Pending", value: "03/20", color: "text-red-500" },
];

const projects = [
  {
    name: "Book Easy",
    lead: "John Dalton",
    members: 8,
    status: "Completed",
    start: "15/08/2025",
    due: "20/10/2025",
    priority: "High",
    statusColor: "text-green-600",
  },
  {
    name: "Citi Offers",
    lead: "Mike George",
    members: 5,
    status: "Active",
    start: "25/09/2025",
    due: "29/10/2025",
    priority: "Mid",
    statusColor: "text-yellow-500",
  },
  {
    name: "ERP System",
    lead: "Lily Johnson",
    members: 4,
    status: "Active",
    start: "22/09/2025",
    due: "08/11/2025",
    priority: "Mid",
    statusColor: "text-yellow-500",
  },
  {
    name: "Novapex Website",
    lead: "Michel Watson",
    members: 2,
    status: "Pending",
    start: "12/09/2025",
    due: "10/11/2025",
    priority: "Low",
    statusColor: "text-red-500",
  },
  {
    name: "HealthTrack App",
    lead: "Emily Rodriguez",
    members: 7,
    status: "Completed",
    start: "01/06/2025",
    due: "15/09/2025",
    priority: "High",
    statusColor: "text-green-600",
  },
  {
    name: "EduConnect Platform",
    lead: "Sarah Johnson",
    members: 6,
    status: "Active",
    start: "20/09/2025",
    due: "30/11/2025",
    priority: "Mid",
    statusColor: "text-yellow-500",
  },
  {
    name: "FinEdge Dashboard",
    lead: "John Dalton",
    members: 9,
    status: "Pending",
    start: "10/10/2025",
    due: "10/12/2025",
    priority: "High",
    statusColor: "text-red-500",
  },
  {
    name: "ShopSmart E-commerce",
    lead: "Mike Chen",
    members: 5,
    status: "Active",
    start: "05/09/2025",
    due: "25/11/2025",
    priority: "Mid",
    statusColor: "text-yellow-500",
  },
  {
    name: "TravelSync Portal",
    lead: "Lily Johnson",
    members: 3,
    status: "Completed",
    start: "12/05/2025",
    due: "20/08/2025",
    priority: "Low",
    statusColor: "text-green-600",
  },
  {
    name: "CityRide Mobility",
    lead: "Michel Watson",
    members: 10,
    status: "Active",
    start: "01/10/2025",
    due: "20/12/2025",
    priority: "High",
    statusColor: "text-yellow-500",
  },
  {
    name: "AgriConnect System",
    lead: "Emily Rodriguez",
    members: 4,
    status: "Pending",
    start: "18/09/2025",
    due: "15/11/2025",
    priority: "Mid",
    statusColor: "text-red-500",
  },
  {
    name: "EventEase Manager",
    lead: "Sarah Johnson",
    members: 6,
    status: "Completed",
    start: "10/07/2025",
    due: "22/09/2025",
    priority: "High",
    statusColor: "text-green-600",
  },
];


export default function ProjectOverview() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects Overview</h1>
          <p className="text-gray-500 text-sm">
            Ongoing and pending projects progress
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg shadow-sm">
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {projectStats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between border border-gray-100"
          >
            <h3 className="text-sm text-gray-500 mb-2 font-medium">{stat.title}</h3>
            <p className={`text-3xl font-semibold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-4 px-6 text-left font-semibold">Project Name</th>
                <th className="py-4 px-6 text-left font-semibold">Lead & Members</th>
                <th className="py-4 px-6 text-left font-semibold">Status</th>
                <th className="py-4 px-6 text-left font-semibold">Start Date</th>
                <th className="py-4 px-6 text-left font-semibold">Due Date</th>
                <th className="py-4 px-6 text-left font-semibold">Priority</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-100 hover:bg-blue-50 transition-all"
                >
                  <td className="py-4 px-6 font-semibold text-gray-800">{p.name}</td>

                  {/* Lead and Members side by side */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-between gap-6 w-full">
                      {/* Lead */}
                      <div className="flex items-center gap-2">
                        <Image
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.lead}`}
                          alt={p.lead}
                          width={28}
                          height={28}
                          className="rounded-full"
                        />
                        <span className="text-gray-800 font-medium">{p.lead}</span>
                      </div>

                      {/* Members */}
                      <div className="flex items-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <Image
                            key={i}
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}-${i}`}
                            alt="member"
                            width={24}
                            height={24}
                            className="rounded-full -ml-1 border border-white"
                          />
                        ))}
                        <span className="ml-2 text-gray-500 text-sm font-medium">
                          +{p.members}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className={`py-4 px-6 font-semibold ${p.statusColor}`}>
                    {p.status}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{p.start}</td>
                  <td className="py-4 px-6 text-gray-600">{p.due}</td>
                  <td className="py-4 px-6 font-semibold text-gray-800">{p.priority}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
