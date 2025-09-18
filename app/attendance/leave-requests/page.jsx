"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Plus, Search, Check, X, ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function LeaveRequestsPage() {
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [showLeaveBalance, setShowLeaveBalance] = useState(null) // employee ID

  const leaveRequests = [
    {
      id: 1,
      employee: "Sarah Johnson",
      avatar: "/diverse-woman-portrait.png",
      department: "Engineering",
      leaveType: "Annual Leave",
      startDate: "2024-02-15",
      endDate: "2024-02-19",
      days: 5,
      reason: "Family vacation",
      status: "Pending",
      appliedDate: "2024-01-20",
      approver: "John Smith",
      balance: { annual: { used: 8, total: 20 }, sick: { used: 3, total: 10 }, personal: { used: 2, total: 5 } },
    },
    {
      id: 2,
      employee: "Michael Chen",
      avatar: "/thoughtful-man.png",
      department: "Product",
      leaveType: "Sick Leave",
      startDate: "2024-01-25",
      endDate: "2024-01-26",
      days: 2,
      reason: "Medical appointment",
      status: "Approved",
      appliedDate: "2024-01-22",
      approver: "Lisa Rodriguez",
      balance: { annual: { used: 12, total: 20 }, sick: { used: 4, total: 10 }, personal: { used: 1, total: 5 } },
    },
  ]

  const leaveStats = [
    { title: "Pending Requests", value: "8", color: "text-orange-600" },
    { title: "Approved This Month", value: "15", color: "text-green-600" },
    { title: "Total Days Taken", value: "142", color: "text-blue-600" },
    { title: "Available Days", value: "1,205", color: "text-purple-600" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500"
      case "Pending":
        return "bg-orange-500"
      case "Rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleApprove = (id) => {
    console.log("Approving request:", id)
  }

  const handleReject = (id) => {
    console.log("Rejecting request:", id)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Attendance
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
            <p className="text-muted-foreground">Manage employee leave applications and approvals</p>
          </div>
          <Button onClick={() => setShowNewRequest(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {leaveStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leave Requests List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {leaveRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={request.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {request.employee.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{request.employee}</CardTitle>
                      <p className="text-sm text-muted-foreground">{request.department}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(request.status)} text-white`}>
                    {request.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Leave Type</p>
                    <p className="font-medium">{request.leaveType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{request.days} days</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Period</p>
                  <p className="font-medium">
                    {new Date(request.startDate).toLocaleDateString()} -{" "}
                    {new Date(request.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Reason</p>
                  <p className="font-medium">{request.reason}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Applied: {new Date(request.appliedDate).toLocaleDateString()}</span>
                  <span>Approver: {request.approver}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  {/* 🔵 Changed button color */}
                  <Button
                    size="sm"
                    onClick={() => setShowLeaveBalance(request.id)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    View Leave Balance
                  </Button>
                  {request.status === "Pending" && (
                    <>
                      <Button size="sm" onClick={() => handleApprove(request.id)} className="flex-1 bg-green-500 hover:bg-green-600">
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(request.id)}
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leave Balance Modal */}
        {showLeaveBalance && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-3xl p-6 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Leave Balance</CardTitle>
                <CardDescription>
                  {leaveRequests.find((r) => r.id === showLeaveBalance)?.employee}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(
                  leaveRequests.find((r) => r.id === showLeaveBalance)?.balance || {}
                ).map(([type, data]) => {
                  const percentage = Math.round((data.used / data.total) * 100)
                  return (
                    <div key={type} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="capitalize font-medium">{type} Leave</span>
                        <span className="text-sm text-muted-foreground">
                          {data.used} / {data.total} days used
                        </span>
                      </div>
                      <Progress value={percentage} className="h-3" />
                    </div>
                  )
                })}

                {/* Extra summary */}
                <div className="p-4 border rounded-lg bg-muted">
                  <p className="text-sm">
                    ✅ Keep track of your leave usage and plan ahead. Contact HR for adjustments.
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => setShowLeaveBalance(null)}
                    variant="outline"
                    className="w-full"
                  >
                    Close
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
