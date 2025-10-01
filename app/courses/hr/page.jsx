"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const hrCourses = [
  {
    id: 1,
    name: "Human Resource Management Basics",
    code: "HR101",
    duration: "6 Weeks",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHJ8ZW58MHx8MHx8fDA%3D",
    details:
      "Introduction to HR roles, employee lifecycle, policies, and compliance with labor laws.",
  },
  {
    id: 2,
    name: "Talent Acquisition and Recruitment",
    code: "HR201",
    duration: "8 Weeks",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1573496130407-57329f01f769?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aHJ8ZW58MHx8MHx8fDA%3D",
    details:
      "Master recruitment strategies, onboarding processes, and modern hiring practices.",
  },
  {
    id: 3,
    name: "Performance Management",
    code: "HR202",
    duration: "5 Weeks",
    level: "Intermediate",
    image: "https://media.istockphoto.com/id/1385097502/photo/shot-of-businessmen-shaking-hands-during-a-team-meeting-in-a-modern-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=ecCBrCxYAjHP3NjzCgZoNk6o9Q5MgU6dRNu1N7izh7k=",
    details:
      "Learn to design appraisal systems, feedback mechanisms, and performance tracking.",
  },
]

export default function HRCoursesPage() {
  return (
    <main className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-600">
        Human Resource Courses
      </h1>

      <div className="space-y-8">
        {hrCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Link
              href={`/courses/hr/${course.id}`}
              className="block group"
            >
              <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-2xl transition-all">
                {/* Left Image */}
                <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Right Content */}
                <div className="p-6 flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">
                    {course.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    Course Code: <span className="font-semibold">{course.code}</span>
                  </p>
                  <p className="text-gray-600">{course.details}</p>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {course.duration}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
