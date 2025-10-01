"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const engineeringCourses = [
  {
    id: 1,
    name: "Introduction to Mechanical Engineering",
    code: "ENGR101",
    duration: "10 Weeks",
    level: "Beginner",
    image: "https://plus.unsplash.com/premium_photo-1664910842853-0d643f6db30c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWVjaGFuaWNhbCUyMEVuZ2luZWVyaW5nfGVufDB8fDB8fHww",
    details:
      "An introductory course covering the fundamentals of mechanical engineering, including mechanics, design principles, and practical applications.",
  },
  {
    id: 2,
    name: "Electrical Circuits and Systems",
    code: "ENGR201",
    duration: "12 Weeks",
    level: "Intermediate",
    image: "https://plus.unsplash.com/premium_photo-1661960643553-ccfbf7d921f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxlY3RyaWNhbHxlbnwwfHwwfHx8MA%3D%3D",
    details:
      "Understand the concepts of current, voltage, resistance, and system design with practical circuit analysis and simulations.",
  },
  {
    id: 3,
    name: "Thermodynamics",
    code: "ENGR202",
    duration: "8 Weeks",
    level: "Intermediate",
    image: "https://plus.unsplash.com/premium_photo-1750941684025-570cb67b21d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGhlcm1vZHluYW1pY3MlMjB3b3JraW5nfGVufDB8fDB8fHww'",
    details:
      "Learn the laws of thermodynamics, heat transfer, and energy systems with real-world engineering applications.",
  },
  {
    id: 4,
    name: "Structural Analysis",
    code: "ENGR301",
    duration: "14 Weeks",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEFuYWx5c2lzfGVufDB8fDB8fHww",
    details:
      "Analyze the behavior of structures under various forces, focusing on stability, stress distribution, and failure mechanisms.",
  },
  {
    id: 5,
    name: "Fluid Mechanics",
    code: "ENGR302",
    duration: "9 Weeks",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1562411403-f583472c8e87?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zmx1aWQlMjBtZWNoYW5pY3MlMjBleHBlcmltZW50fGVufDB8fDB8fHww",
    details:
      "Explore fluid properties, fluid statics, dynamics, and their applications in engineering design and systems.",
  },
  {
    id: 6,
    name: "Engineering Mathematics",
    code: "ENGR103",
    duration: "6 Weeks",
    level: "Beginner",
    image: "https://media.istockphoto.com/id/1204743637/photo/science-technology-concept-abstract-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=i7gk_xGeKQS1DOxz5VIQywW13jAWMwdJtNBjyIGGsE4=",
    details:
      "Develop strong mathematical foundations for engineering with calculus, linear algebra, and differential equations.",
  },
  {
    id: 7,
    name: "Computer-Aided Design (CAD)",
    code: "ENGR210",
    duration: "7 Weeks",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1581166418878-11f0dde922c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FkJTIwdG9vbHxlbnwwfHwwfHx8MA%3D%3D]",
    details:
      "Learn CAD tools for 2D/3D modeling, simulation, and engineering design visualization.",
  },
]

export default function EngineeringCoursesPage() {
  return (
    <main className="container mx-auto py-12 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-10 text-blue-600"
      >
        Engineering Courses
      </motion.h1>

      <div className="space-y-8">
        {engineeringCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Link
              href={`/courses/engineering/${course.id}`}
              className="block group"
            >
              <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all">
                {/* Left: Image */}
                <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Right: Content */}
                <div className="p-6 flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">
                    {course.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    Course Code:{" "}
                    <span className="font-semibold">{course.code}</span>
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
