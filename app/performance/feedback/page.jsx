"use client"

import { useState } from "react"
import { ArrowLeft, Star, Send, MessageSquare, TrendingUp, Award } from "lucide-react"
import Link from "next/link"

export default function FeedbackPage() {
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [feedbackType, setFeedbackType] = useState("peer")
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const employees = [
    { id: 1, name: "Sarah Johnson", department: "Engineering", avatar: "/diverse-woman-portrait.png" },
    { id: 2, name: "Michael Chen", department: "Design", avatar: "/thoughtful-man.png" },
    { id: 3, name: "Emily Rodriguez", department: "Marketing", avatar: "/diverse-woman-portrait.png" },
    { id: 4, name: "David Kim", department: "Sales", avatar: "/thoughtful-man.png" },
  ]

  const recentFeedback = [
    { id: 1, from: "Sarah Johnson", to: "Michael Chen", type: "Peer Review", rating: 4.5, date: "2024-01-15" },
    { id: 2, from: "Emily Rodriguez", to: "David Kim", type: "360 Feedback", rating: 4.8, date: "2024-01-14" },
    { id: 3, from: "Michael Chen", to: "Sarah Johnson", type: "Project Feedback", rating: 4.2, date: "2024-01-13" },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Reset form
    setSelectedEmployee("")
    setRating(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Link href="/performance" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">360° Feedback</h1>
            <p className="text-gray-600 mt-1">Provide and manage employee feedback</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Submit Feedback</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feedback Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["manager"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFeedbackType(type)}
                        className={`p-3 rounded-lg border-2 transition-all capitalize ${
                          feedbackType === type
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {type} Review
                      </button>
                    ))}
                  </div>
                </div>

                {/* Employee Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Employee</label>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose an employee...</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} - {employee.department}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-2 transition-colors ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        <Star className="w-8 h-8 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Communication", "Teamwork", "Leadership", "Technical Skills"].map((category) => (
                    <div key={category} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">{category}</label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                        placeholder={`Feedback on ${category.toLowerCase()}...`}
                      />
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedEmployee || rating === 0}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Feedback */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Recent Feedback</h3>
              </div>
              <div className="space-y-3">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{feedback.type}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{feedback.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      {feedback.from} → {feedback.to}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{feedback.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">This Month</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Feedback Given</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Feedback Received</span>
                  <span className="font-semibold text-green-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Rating Given</span>
                  <span className="font-semibold text-yellow-600">4.2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
