"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddEmployeePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
    startDate: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    notes: "",
  })

  const departments = ["Engineering", "Sales", "Marketing", "HR", "Finance", "Operations", "Customer Support"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    router.push("/employees")
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="flex justify-between items-center px-10 py-8 bg-white border-b">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Add New Employee</h2>
          <p className="text-gray-500 text-sm">
            Create a new employee profile with all necessary information
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" form="employee-form" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>

      {/* ===== Form Section ===== */}
      <form
        id="employee-form"
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto px-10 py-10 space-y-10"
      >
        {/* Personal Information */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Basic employee details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="employee@company.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 9123456789"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter full address"
              />
            </div>
          </CardContent>
        </Card>

        {/* Employment Details */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
            <CardDescription>
              Job-related information and organizational structure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleInputChange("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  placeholder="Job title"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="salary">Annual Salary</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="₹7,50,000"
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
            <CardDescription>
              Emergency contact information for the employee
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Contact person name"
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any additional information or notes about the employee"
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  )
}
