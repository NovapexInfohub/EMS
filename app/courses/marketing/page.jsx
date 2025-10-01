"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const marketingCourses = [
  {
    id: 1,
    name: "Digital Marketing Essentials",
    code: "MKT101",
    duration: "7 Weeks",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1562577308-9e66f0c65ce5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFya2V0aW5nfGVufDB8fDB8fHww",
    details:
      "Covers SEO, SEM, content marketing, and social media advertising fundamentals.",
  },
  {
    id: 2,
    name: "Brand Management",
    code: "MKT201",
    duration: "9 Weeks",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1645658043538-fc2bb1702cfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJhbmQlMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww",
    details:
      "Understand brand positioning, identity creation, and storytelling strategies.",
  },
  {
    id: 3,
    name: "Marketing Analytics",
    code: "MKT301",
    duration: "8 Weeks",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFya2V0JTIwYW5hbHlzaXN8ZW58MHx8MHx8fDA%3D",
    details:
      "Leverage data to evaluate campaign performance and make strategic decisions.",
  },
]

export default function MarketingCoursesPage() {
  return (
    <main className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-600">
        Marketing Courses
      </h1>

      <div className="space-y-8">
        {marketingCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Link
              href={`/courses/marketing/${course.id}`}
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
