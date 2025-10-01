"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const coursesData = [
  {
    department: "Engineering",
    image: "https://images.unsplash.com/photo-1650530415027-dc9199f473ec?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    courses: [
      {
        title: "Full Stack Web Development",
        description: "Learn modern web development using React, Node.js, and databases.",
        duration: "12 Weeks",
        level: "Intermediate",
      },
      {
        title: "DevOps Fundamentals",
        description: "Introduction to CI/CD, Docker, Kubernetes, and cloud deployment.",
        duration: "8 Weeks",
        level: "Beginner",
      },
    ],
  },
  {
    department: "Human Resources",
    image: "https://images.unsplash.com/photo-1531535807748-218331acbcb4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    courses: [
      {
        title: "HR Analytics",
        description: "Use data-driven approaches to improve HR decision-making.",
        duration: "6 Weeks",
        level: "Intermediate",
      },
      {
        title: "Talent Acquisition Strategies",
        description: "Master recruitment, onboarding, and retention best practices.",
        duration: "4 Weeks",
        level: "Beginner",
      },
    ],
  },
  {
    department: "Finance",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    courses: [
      {
        title: "Corporate Finance Essentials",
        description: "Understand financial statements, budgeting, and forecasting.",
        duration: "10 Weeks",
        level: "Intermediate",
      },
      {
        title: "Payroll Management",
        description: "Learn payroll processing, compliance, and reporting.",
        duration: "5 Weeks",
        level: "Beginner",
      },
    ],
  },
  {
    department: "Management",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    courses: [
      {
        title: "Project Management Professional (PMP)",
        description: "Comprehensive training for PMP certification.",
        duration: "14 Weeks",
        level: "Advanced",
      },
      {
        title: "Leadership & Team Building",
        description: "Develop leadership skills and manage high-performing teams.",
        duration: "6 Weeks",
        level: "Intermediate",
      },
    ],
  },
]

export default function CoursesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-blue-500">
        Department-wise Courses
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {coursesData.map((dept, deptIdx) => (
          <motion.div
            key={dept.department}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: deptIdx * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow"
          >
            {/* Department Image */}
            <div className="relative w-full h-48">
              <Image
                src={dept.image}
                alt={dept.department}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-700 border-b pb-2">
                {dept.department}
              </h2>
              <div className="space-y-6">
                {dept.courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{course.description}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                        {course.level}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        {course.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
