"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, Star, Calendar, Search, Filter, ArrowLeft, Plus, Edit, Eye } from "lucide-react"

export default function PerformanceReviewsPage() {
  const [animateCards, setAnimateCards] = useState(false)
  const [showNewReview, setShowNewReview] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const reviews = [
    {
      id: 1,
      employee: "Sarah Johnson",
      avatar: "/diverse-woman-portrait.png",
      department: "Engineering",
      role: "Senior Software Engineer",
      reviewer: "John Smith",
      reviewPeriod: "Q4 2023",
      rating: 4.5,
      status: "Completed",
      reviewDate: "2024-01-15",
      nextReview: "2024-07-15",
      strengths: ["Technical expertise", "Leadership", "Problem solving"],
      improvements: ["Communication", "Time management"],
      goals: 8,
      goalsCompleted: 7,
    },
    {
      id: 2,
      employee: "Michael Chen",
      avatar: "/thoughtful-man.png",
      department: "Product",
      role: "Product Manager",
      reviewer: "Lisa Rodriguez",
      reviewPeriod: "Q4 2023",
      rating: 4.8,
      status: "Completed",
      reviewDate: "2024-01-10",
      nextReview: "2024-07-10",
      strengths: ["Strategic thinking", "Team collaboration", "Innovation"],
      improvements: ["Delegation"],
      goals: 6,
      goalsCompleted: 6,
    },
    {
      id: 3,
      employee: "Emily Davis",
      avatar: "/diverse-woman-portrait.png",
      department: "Design",
      role: "UX Designer",
      reviewer: "John Smith",
      reviewPeriod: "Q4 2023",
      rating: null,
      status: "In Progress",
      reviewDate: null,
      nextReview: "2024-02-01",
      strengths: [],
      improvements: [],
      goals: 5,
      goalsCompleted: 3,
    },
    {
      id: 4,
      employee: "David Wilson",
      avatar: "/thoughtful-man.png",
      department: "Analytics",
      role: "Data Analyst",
      reviewer: "John Smith",
      reviewPeriod: "Q4 2023",
      rating: null,
      status: "Pending",
      reviewDate: null,
      nextReview: "2024-02-05",
      strengths: [],
      improvements: [],
      goals: 7,
      goalsCompleted: 4,
    },
  ]

  const reviewStats = [
    { title: "Completed Reviews", value: "28", color: "text-green-600" },
    { title: "In Progress", value: "8", color: "text-blue-600" },
    { title: "Pending", value: "12", color: "text-orange-600" },
    { title: "Average Rating", value: "4.3", color: "text-purple-600" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "Pending":
        return "bg-orange-500"
      case "Overdue":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const renderStars = (rating) => {
    if (!rating) return <span className="text-sm text-muted-foreground">Not rated</span>

    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-4 animate-in slide-in-from-left-5 duration-700">
          <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Performance
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Performance Reviews</h1>
            <p className="text-muted-foreground">Manage employee performance evaluations and ratings</p>
          </div>
          <Button
            onClick={() => setShowNewReview(true)}
            className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Review
          </Button>
        </div>

        {/* Review Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {reviewStats.map((stat, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg hover:scale-105 transition-all duration-500 ${
                animateCards ? "animate-in slide-in-from-top-3" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card className="animate-in slide-in-from-top-5 duration-500">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reviews by employee name or department..."
                  className="pl-10 pr-4 py-2 w-full bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                />
              </div>
              <select className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300">
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
              <select className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300">
                <option value="">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="product">Product</option>
                <option value="design">Design</option>
                <option value="analytics">Analytics</option>
              </select>
              <Button variant="outline" className="hover:scale-105 transition-transform duration-200 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <Card
              key={review.id}
              className={`hover:shadow-xl hover:scale-105 transition-all duration-500 hover:-translate-y-1 ${
                animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
              }`}
              style={{ animationDelay: `${600 + index * 150}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 hover:scale-110 transition-transform duration-200">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {review.employee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{review.employee}</CardTitle>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                      <p className="text-xs text-muted-foreground">{review.department}</p>
                    </div>
                  </div>
                  <Badge
                    className={`${getStatusColor(review.status)} text-white hover:scale-110 transition-transform duration-200`}
                  >
                    {review.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Review Period</p>
                    <p className="font-medium">{review.reviewPeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reviewer</p>
                    <p className="font-medium">{review.reviewer}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Overall Rating</p>
                  {renderStars(review.rating)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Goals Progress</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {review.goalsCompleted}/{review.goals}
                      </p>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: animateCards ? `${(review.goalsCompleted / review.goals) * 100}%` : "0%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Review</p>
                    <p className="font-medium">{new Date(review.nextReview).toLocaleDateString()}</p>
                  </div>
                </div>

                {review.status === "Completed" && (
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Key Strengths</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {review.strengths.map((strength, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Areas for Improvement</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {review.improvements.map((improvement, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {improvement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {review.status === "Pending" || review.status === "In Progress" ? (
                    <Button size="sm" className="flex-1 hover:scale-105 transition-transform duration-200">
                      <Edit className="w-4 h-4 mr-2" />
                      Continue Review
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 hover:scale-105 transition-transform duration-200 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 hover:scale-105 transition-transform duration-200 bg-transparent"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Review Modal */}
        {showNewReview && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl animate-in slide-in-from-bottom-4 duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  New Performance Review
                </CardTitle>
                <CardDescription>Create a new performance review for an employee</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Employee</label>
                    <select className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Select Employee</option>
                      <option>Sarah Johnson</option>
                      <option>Michael Chen</option>
                      <option>Emily Davis</option>
                      <option>David Wilson</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Review Period</label>
                    <select className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Select Period</option>
                      <option>Q1 2024</option>
                      <option>Q2 2024</option>
                      <option>Q3 2024</option>
                      <option>Q4 2024</option>
                      <option>Annual 2024</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reviewer</label>
                    <select className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Select Reviewer</option>
                      <option>John Smith</option>
                      <option>Lisa Rodriguez</option>
                      <option>Mark Johnson</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Due Date</label>
                    <input
                      type="date"
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Review Notes</label>
                  <textarea
                    className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    rows="3"
                    placeholder="Add any initial notes or instructions for the review..."
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => setShowNewReview(false)}
                    variant="outline"
                    className="flex-1 hover:scale-105 transition-transform duration-200 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setShowNewReview(false)}
                    className="flex-1 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
                  >
                    Create Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
