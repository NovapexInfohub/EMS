"use client";

import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectProgress() {
  const [messages, setMessages] = useState([
    { sender: "You", text: "Hey Emily, I have a question about my task." },
    { sender: "Emily Rodriguez", text: "Yes sure, any problem with your task?" },
    { sender: "You", image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2plY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600" },
    { sender: "You", text: "Is there a plugin to do this task?" },
    { sender: "Emily Rodriguez", text: "Yes, you have to install it under workspace files and link the directory." },
    { sender: "You", text: "Thank you so much! Glad you asked before assignment." },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
  };

  return (
    <div className="w-full min-h-screen bg-white p-12 space-y-16">
      {/* ---- Project Overview ---- */}
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
          alt="Project"
          className="rounded-2xl w-full md:w-1/3 object-cover"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">Citi Offers - App</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="text-base text-gray-600">
            <strong>Start Date:</strong> 25/03/2025 &nbsp; | &nbsp;
            <strong>Due Date:</strong> 29/10/2025
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-blue-600 text-white text-base px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            <Paperclip className="w-5 h-5" />
            Attachment
          </motion.button>
        </div>
      </div>

      {/* ---- Team Section ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="font-semibold text-2xl text-gray-800 mb-4">Team Lead</h3>
          <div className="bg-gray-100 p-4 rounded-lg text-gray-700 font-medium text-lg">
            Mike George
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-2xl text-gray-800 mb-4">Team Members</h3>
          <div className="space-y-3">
            {[
              "Michel Watson",
              "Lily Johnson",
              "John Dalton",
              "Sarah Johnson",
              "Mike Chen",
              "John Dalton",
              "Emily Rodriguez",
            ].map((name, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded-lg text-gray-700 font-medium text-lg">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Key Milestones ---- */}
      <div className="text-center">
        <h3 className="font-semibold text-2xl text-gray-800 mb-8">Key Milestones</h3>
        <div className="flex justify-center items-center gap-20">
          {["Research", "Ideate", "Design", "Develop"].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`rounded-full w-14 h-14 flex items-center justify-center text-white font-semibold shadow-md ${
                  i === 1 ? "bg-blue-600" : "bg-gray-400"
                }`}
              >
                {i + 1}
              </motion.div>
              <p className="mt-3 text-base font-medium text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Comments Section ---- */}
      <div>
        <h3 className="font-semibold text-2xl text-gray-800 mb-4">Comments</h3>
        <div className="bg-gray-50 rounded-2xl p-6 h-[520px] overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-sm p-4 rounded-2xl text-base ${
                  msg.sender === "You"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="chat-img"
                    className="rounded-lg max-w-[200px]"
                  />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex items-center gap-4 mt-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type Message"
            className="flex-1 border rounded-full px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleSend}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
