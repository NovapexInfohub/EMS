"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const salesCourses = [
  {
    id: 1,
    name: "Sales Fundamentals",
    code: "SAL101",
    duration: "6 Weeks",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1678166010410-2c1c769712ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsZXMlMjBkZXBhcnRtZW50fGVufDB8fDB8fHww",
    details:
      "Learn the basics of sales techniques, prospecting, and relationship management.",
  },
  {
    id: 2,
    name: "Advanced Negotiation Skills",
    code: "SAL201",
    duration: "10 Weeks",
    level: "Intermediate",
    image: "https://plus.unsplash.com/premium_photo-1664201889896-6a42c19e953a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FsZXN8ZW58MHx8MHx8fDA%3D",
    details:
      "Master persuasion, objection handling, and closing deals with confidence.",
  },
  {
    id: 3,
    name: "CRM & Sales Analytics",
    code: "SAL301",
    duration: "8 Weeks",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1737690974141-c964afbdf986?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fENSTSUyMCUyNiUyMHNhbGVzJTIwYW5zbHl0aWNzfGVufDB8fDB8fHww",
    details:
      "Utilize CRM tools and data-driven analytics to boost sales performance.",
  },
]

export default function SalesCoursesPage() {
  return (
    <main className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-600">
        Sales Courses
      </h1>

      <div className="space-y-8">
        {salesCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Link
              href={`/courses/sales/${course.id}`}
              className="block group"
            >
              <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-2xl transition-all">
                <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
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
