"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, UserPlus, Pencil, Trash2 } from "lucide-react"

const shifts = [
  { id: 1, name: "Morning Shift", start: "09:00 AM", end: "05:00 PM" },
  { id: 2, name: "Evening Shift", start: "01:00 PM", end: "09:00 PM" },
  { id: 3, name: "Night Shift", start: "09:00 PM", end: "05:00 AM" },
]

const schedules = [
  { id: 1, employee: "Alice Johnson", department: "HR", shift: "Morning Shift", date: "2025-09-30", status: "Assigned" },
  { id: 2, employee: "Bob Smith", department: "IT", shift: "Evening Shift", date: "2025-09-30", status: "Pending" },
  { id: 3, employee: "Charlie Lee", department: "Finance", shift: "Night Shift", date: "2025-09-30", status: "Assigned" },
  { id: 4, employee: "David Kim", department: "IT", shift: "Morning Shift", date: "2025-09-30", status: "Assigned" },
  { id: 5, employee: "Ella Brown", department: "HR", shift: "Evening Shift", date: "2025-09-30", status: "Pending" },
]

// group schedules by department
const groupedSchedules = schedules.reduce((acc, sched) => {
  if (!acc[sched.department]) acc[sched.department] = []
  acc[sched.department].push(sched)
  return acc
}, {})


export default function ShiftSchedulePage() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shift & Scheduling</h1>
          <p className="text-muted-foreground">Manage employee work shifts and assignments</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add Shift
        </Button>
      </div>

      {/* Shift Definitions */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Defined Shifts
          </CardTitle>
          <CardDescription>Overview of available shifts</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="min-w-full border border-border rounded-lg overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="py-2 px-4 text-left">Shift Name</th>
                <th className="py-2 px-4 text-left">Start Time</th>
                <th className="py-2 px-4 text-left">End Time</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-muted/50 transition-colors">
                  <td className="py-2 px-4 border-t">{shift.name}</td>
                  <td className="py-2 px-4 border-t">{shift.start}</td>
                  <td className="py-2 px-4 border-t">{shift.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Employee Schedules grouped by department */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Employee Schedules
          </CardTitle>
          <CardDescription>Assignments of employees grouped by department</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.entries(groupedSchedules).map(([department, deptSchedules]) => (
            <div key={department} className="mb-8">
              <h2 className="text-lg font-semibold text-primary mb-3">{department} Department</h2>
              <table className="min-w-full border border-border rounded-lg overflow-hidden mb-4">
                <thead className="bg-muted">
                  <tr>
                    <th className="py-2 px-4 text-left">Employee</th>
                    <th className="py-2 px-4 text-left">Shift</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deptSchedules.map((schedule) => (
                    <tr key={schedule.id} className="hover:bg-muted/50 transition-colors">
                      <td className="py-2 px-4 border-t font-medium">{schedule.employee}</td>
                      <td className="py-2 px-4 border-t">{schedule.shift}</td>
                      <td className="py-2 px-4 border-t">{schedule.date}</td>
                      <td className="py-2 px-4 border-t">
                        <Badge
                          className={
                            schedule.status === "Assigned"
                              ? "bg-green-500/20 text-green-600"
                              : "bg-yellow-500/20 text-yellow-600"
                          }
                        >
                          {schedule.status}
                        </Badge>
                      </td>
                      <td className="py-2 px-4 border-t flex gap-2">
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <Pencil className="w-4 h-4" /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" className="flex items-center gap-1">
                          <Trash2 className="w-4 h-4" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
