"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaStar, FaUser, FaClock, FaSearch } from "react-icons/fa"

const coursesData = [
  {
    title: "Artificial Intelligence and Machine Learning",
    image:
      "https://images.unsplash.com/photo-1650530415027-dc9199f473ec?q=80&w=1333&auto=format&fit=crop",
    instructor: "John Dalton",
    rating: 4.8,
    enrolled: "1.2k",
    duration: "8 Weeks",
    department: "Engineering",
  },
  {
    title: "Digital Marketing with AI",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1470&auto=format&fit=crop",
    instructor: "Mike Tyson",
    rating: 4.7,
    enrolled: "980",
    duration: "6 Weeks",
    department: "Marketing",
  },
  {
    title: "Web Development",
    image:
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1470&auto=format&fit=crop",
    instructor: "Lily Adams",
    rating: 4.6,
    enrolled: "1.5k",
    duration: "9 Weeks",
    department: "Engineering",
  },
  {
    title: "Mastering B2B & B2C Sales",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop",
    instructor: "John Dalton",
    rating: 4.5,
    enrolled: "840",
    duration: "7 Weeks",
    department: "Sales",
  },
  {
    title: "Salesforce CRM Essentials",
    image:
      "https://images.unsplash.com/photo-1573495628363-8a1b08a54b5b?q=80&w=1470&auto=format&fit=crop",
    instructor: "Mike Tyson",
    rating: 4.4,
    enrolled: "930",
    duration: "5 Weeks",
    department: "Sales",
  },
  {
    title: "Advanced Python Programming",
    image:
      "https://images.unsplash.com/photo-1581090465463-1979ff03f8f6?q=80&w=1470&auto=format&fit=crop",
    instructor: "Lily Adams",
    rating: 4.9,
    enrolled: "2.1k",
    duration: "10 Weeks",
    department: "Engineering",
  },
]

export default function CoursesPage() {
  const [activeDept, setActiveDept] = useState("All Departments")
  const [searchTerm, setSearchTerm] = useState("")
  const departments = ["All Departments", "Engineering", "Sales", "Marketing", "HR", "Finance"]

  const filteredCourses = coursesData.filter((c) => {
    const matchesDept = activeDept === "All Departments" || c.department === activeDept
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesDept && matchesSearch
  })

  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Courses</h1>
      <p className="text-gray-500 mb-6">
        Find learning programs designed for your role.
      </p>

      {/* Search + Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Search Bar */}
        <div className="flex items-center w-full md:w-1/3 bg-gray-100 rounded-full px-3 py-2">
          <FaSearch className="text-gray-500 mr-2 rounded-full" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm"
          />
        </div>

        {/* Department Buttons */}
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <Button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-4 py-2 text-sm rounded-md transition-all ${
                activeDept === dept
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {dept}
            </Button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredCourses.map((course, idx) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <div className="relative h-40 w-full">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {course.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mb-2 gap-2">
                <FaStar className="text-yellow-500" /> {course.rating} | {course.enrolled} Enrolled | {course.duration}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <FaUser className="mr-2" /> {course.instructor}
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md">
                View Course
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Meetings Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Meetings</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
            Schedule Meeting
          </Button>
        </div>

        <div className="flex gap-3 border-b border-gray-200 mb-6">
          <Button className="text-sm border-b-2 border-blue-600 text-blue-600 rounded-none">
            Meetings
          </Button>
          <Button variant="ghost" className="text-sm text-gray-600">
            Recorded Sessions
          </Button>
        </div>

        {/* Meeting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[ 
            {
              title: "Introduce new project goals, roles, and timelines.",
              duration: "40 mins",
              joined: "45 Joined",
            },
            {
              title: "Evaluate project deliverables and client feedback.",
              duration: "35 mins",
              joined: "30 Joined",
            },
            {
              title: "Discuss new technologies, frameworks, or tools to adopt.",
              duration: "45 mins",
              joined: "50 Joined",
            },
          ].map((meeting, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md p-5"
            >
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                {meeting.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mb-3 gap-2">
                <FaClock /> {meeting.duration} | {meeting.joined}
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                Join Meeting
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
