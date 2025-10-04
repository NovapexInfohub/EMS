"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Edit, Trash2, Gift, Search } from "lucide-react";

const departments = ["HR", "Engineering", "Sales", "Marketing", "Finance", "Operations"];

export default function RewardPage() {
  const [rewards, setRewards] = useState([
    {
      id: 1,
      employeeName: "Rohan Sharma",
      rewardTitle: "Employee of the Month",
      rewardPoints: 500,
      date: "2025-10-01",
      department: "Sales",
      description: "Outstanding performance and leadership in the sales team.",
    },
    {
      id: 2,
      employeeName: "Sneha Patel",
      rewardTitle: "Best Innovator",
      rewardPoints: 400,
      date: "2025-09-20",
      department: "Engineering",
      description: "Introduced new workflow automation ideas.",
    },
  ]);

  const [form, setForm] = useState({
    employeeName: "",
    rewardTitle: "",
    rewardPoints: "",
    department: "",
    description: "",
  });

  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");

  const handleAddReward = () => {
    if (!form.employeeName || !form.rewardTitle || !form.rewardPoints || !form.department) return;
    setRewards([
      ...rewards,
      {
        id: rewards.length + 1,
        ...form,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setForm({ employeeName: "", rewardTitle: "", rewardPoints: "", department: "", description: "" });
    setIsAdding(false);
  };

  const handleDelete = (id) => setRewards(rewards.filter((reward) => reward.id !== id));

  const filteredRewards = rewards.filter(
    (reward) =>
      reward.employeeName.toLowerCase().includes(search.toLowerCase()) &&
      (filterDept ? reward.department === filterDept : true)
  );

  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-10 text-blue-700"
      >
        <div className="flex justify-center items-center gap-2">
          <Gift className="text-blue-600 w-8 h-8" /> Employee Rewards 
        </div>
      </motion.h1>

      {/* Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md w-full md:w-1/3">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full text-gray-700"
          />
        </div>

        <div className="flex gap-3 items-center">
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg shadow-sm text-gray-700"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdding(!isAdding)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 hover:shadow-blue-400 hover:shadow-lg transition"
          >
            <PlusCircle size={20} /> {isAdding ? "Cancel" : "Add Reward"}
          </motion.button>
        </div>
      </div>

      {/* Add Reward Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white shadow-xl rounded-xl p-6 mb-10 border border-blue-100 hover:shadow-blue-200 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Reward</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Employee Name"
                value={form.employeeName}
                onChange={(e) => setForm({ ...form, employeeName: e.target.value })}
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Reward Title"
                value={form.rewardTitle}
                onChange={(e) => setForm({ ...form, rewardTitle: e.target.value })}
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Reward Points"
                value={form.rewardPoints}
                onChange={(e) => setForm({ ...form, rewardPoints: e.target.value })}
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border p-3 rounded-lg w-full col-span-2 focus:ring-2 focus:ring-blue-400"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddReward}
                className="bg-green-600 text-white px-4 py-2 rounded-lg col-span-2 hover:bg-green-700 hover:shadow-blue-300 hover:shadow-lg transition"
              >
                Save Reward
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredRewards.length === 0 && (
            <p className="text-gray-500 text-center col-span-3">No rewards found.</p>
          )}
          {filteredRewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-2xl hover:shadow-blue-300 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{reward.rewardTitle}</h3>
                  <p className="text-sm text-gray-500">{reward.employeeName}</p>
                </div>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                  {reward.department}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{reward.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 font-bold">{reward.rewardPoints} pts</span>
                <span className="text-gray-400 text-xs">{reward.date}</span>
              </div>
              <div className="flex justify-end gap-3 mt-3">
                <motion.button whileHover={{ scale: 1.1 }} className="text-blue-600 hover:text-blue-800">
                  <Edit size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDelete(reward.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
