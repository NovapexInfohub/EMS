"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Target, TrendingUp, Award, Users, Calendar, Star, Filter, Plus } from "lucide-react"

export default function PerformancePage() {
  const [animateCards, setAnimateCards] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const performanceStats = [
    { title: "Average Rating", value: "4.2/5", change: "+0.3", icon: Star, color: "text-yellow-600" },
    { title: "Goals Completed", value: "87%", change: "+12%", icon: Target, color: "text-green-600" },
    { title: "Reviews Due", value: "15", change: "-5", icon: Calendar, color: "text-orange-600" },
    { title: "Top Performers", value: "23", change: "+8", icon: Award, color: "text-purple-600" },
  ]

  const recentReviews = [
    {
      employee: "Sarah Johnson",
      avatar: "/diverse-woman-portrait.png",
      department: "Engineering",
      reviewer: "John Smith",
      rating: 4.5,
      status: "Completed",
      reviewDate: "2024-01-15",
      nextReview: "2024-07-15",
      goals: 8,
      goalsCompleted: 7,
    },
    {
      employee: "Michael Chen",
      avatar: "/thoughtful-man.png",
      department: "Product",
      reviewer: "Lisa Rodriguez",
      rating: 4.8,
      status: "Completed",
      reviewDate: "2024-01-10",
      nextReview: "2024-07-10",
      goals: 6,
      goalsCompleted: 6,
    },
    {
      employee: "Emily Davis",
      avatar: "/diverse-woman-portrait.png",
      department: "Design",
      reviewer: "John Smith",
      rating: null,
      status: "In Progress",
      reviewDate: null,
      nextReview: "2024-02-01",
      goals: 5,
      goalsCompleted: 3,
    },
    {
      employee: "David Wilson",
      avatar: "/thoughtful-man.png",
      department: "Analytics",
      reviewer: "John Smith",
      rating: null,
      status: "Pending",
      reviewDate: null,
      nextReview: "2024-02-05",
      goals: 7,
      goalsCompleted: 4,
    },
  ]

  const topPerformers = [
    { name: "Michael Chen", department: "Product", rating: 4.8, improvement: "+0.5" },
    { name: "Sarah Johnson", department: "Engineering", rating: 4.5, improvement: "+0.3" },
    { name: "Lisa Rodriguez", department: "Marketing", rating: 4.4, improvement: "+0.2" },
    { name: "James Thompson", department: "Sales", rating: 4.3, improvement: "+0.4" },
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

    return stars
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-in slide-in-from-left-5 duration-700">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Performance Management</h1>
            <p className="text-muted-foreground">Track employee performance, goals, and development</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="hover:scale-105 transition-transform duration-200 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              New Review
            </Button>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceStats.map((stat, index) => (
            <Card
              key={index}
              className={`hover:shadow-xl hover:scale-105 transition-all duration-500 hover:-translate-y-1 ${
                animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} from last quarter
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg bg-muted ${stat.color} hover:rotate-12 transition-transform duration-300`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Reviews */}
          <Card
            className={`lg:col-span-2 hover:shadow-lg transition-all duration-500 ${
              animateCards ? "animate-in slide-in-from-left-4" : "opacity-0"
            }`}
            style={{ animationDelay: "600ms" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 animate-pulse" />
                Recent Performance Reviews
              </CardTitle>
              <CardDescription>Latest employee performance evaluations and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReviews.map((review, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 hover:scale-102 hover:shadow-md transition-all duration-300 ${
                      animateCards ? "animate-in slide-in-from-left-3" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
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
                        <p className="font-medium">{review.employee}</p>
                        <p className="text-sm text-muted-foreground">{review.department}</p>
                        <p className="text-xs text-muted-foreground">Reviewer: {review.reviewer}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Rating</p>
                        {review.rating ? (
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                            <span className="ml-1 text-sm font-medium">{review.rating}</span>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Pending</p>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Goals</p>
                        <p className="font-medium">
                          {review.goalsCompleted}/{review.goals}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Next Review</p>
                        <p className="font-medium">{new Date(review.nextReview).toLocaleDateString()}</p>
                      </div>
                      <Badge
                        className={`${getStatusColor(review.status)} text-white hover:scale-110 transition-transform duration-200`}
                      >
                        {review.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card
            className={`hover:shadow-lg transition-all duration-500 ${
              animateCards ? "animate-in slide-in-from-right-4" : "opacity-0"
            }`}
            style={{ animationDelay: "600ms" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 animate-bounce" />
                Top Performers
              </CardTitle>
              <CardDescription>Highest rated employees this quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 ${
                      animateCards ? "animate-in slide-in-from-right-3" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                              ? "bg-gray-400"
                              : index === 2
                                ? "bg-orange-600"
                                : "bg-blue-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{performer.name}</p>
                        <p className="text-xs text-muted-foreground">{performer.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{performer.rating}</span>
                      </div>
                      <p className="text-xs text-green-600">{performer.improvement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className={`hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer ${
              animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
            }`}
            style={{ animationDelay: "1200ms" }}
          >
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-lg font-semibold mb-2">Performance Reviews</h3>
              <p className="text-sm text-muted-foreground mb-4">Conduct and manage employee performance evaluations</p>
              <Button className="w-full hover:scale-105 transition-transform duration-200">Manage Reviews</Button>
            </CardContent>
          </Card>

          <Card
            className={`hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer ${
              animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
            }`}
            style={{ animationDelay: "1300ms" }}
          >
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-primary hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-lg font-semibold mb-2">Goal Tracking</h3>
              <p className="text-sm text-muted-foreground mb-4">Set and monitor employee goals and objectives</p>
              <Button className="w-full hover:scale-105 transition-transform duration-200">Track Goals</Button>
            </CardContent>
          </Card>

          <Card
            className={`hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer ${
              animateCards ? "animate-in slide-in-from-bottom-4" : "opacity-0"
            }`}
            style={{ animationDelay: "1400ms" }}
          >
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-lg font-semibold mb-2">360° Feedback</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Collect comprehensive feedback from peers and managers
              </p>
              <Button className="w-full hover:scale-105 transition-transform duration-200">Manage Feedback</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
