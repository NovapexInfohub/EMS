"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { CheckCircle, AlertCircle } from "lucide-react"

type Status = "Paid" | "Pending"

interface Employee {
  id: number
  name: string
  department: string
  baseSalary: number
  bonus: number
  deductions: number
  status: Status
}

const initialPayrollData: Employee[] = [
  { id: 1, name: "Alice Johnson", department: "IT", baseSalary: 6500, bonus: 800, deductions: 300, status: "Paid" },
  { id: 2, name: "Bob Smith", department: "Design", baseSalary: 6000, bonus: 700, deductions: 200, status: "Pending" },
  { id: 3, name: "Charlie Lee", department: "Management", baseSalary: 8500, bonus: 1200, deductions: 700, status: "Paid" },
  { id: 4, name: "David Brown", department: "HR", baseSalary: 5500, bonus: 500, deductions: 200, status: "Paid" },
  { id: 5, name: "Eva Williams", department: "Finance", baseSalary: 7000, bonus: 600, deductions: 400, status: "Pending" },
]

// Badge for display
const getStatusBadge = (status: Status) => {
  if (status === "Paid") {
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center gap-2 px-3 py-1">
        <CheckCircle className="w-3 h-3" /> {status}
      </Badge>
    )
  }
  return (
    <Badge className="bg-red-100 text-red-700 border-red-200 flex items-center gap-2 px-3 py-1">
      <AlertCircle className="w-3 h-3" /> {status}
    </Badge>
  )
}

export default function PayrollPage() {
  const [payroll, setPayroll] = useState<Employee[]>(initialPayrollData)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"All" | Status>("All")
  const [period, setPeriod] = useState("September 2025")
  const [lockedStatus, setLockedStatus] = useState<Record<number, boolean>>({}) // tracks frozen status

  // Update status and freeze it
  const updateStatus = (id: number, newStatus: Status) => {
    setPayroll((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    )
    setLockedStatus((prev) => ({ ...prev, [id]: true }))
  }

  // Filter employees
  const filteredData = payroll.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "All" || employee.status === filter
    return matchesSearch && matchesFilter
  })

  // Group employees by department
  const groupedPayroll = filteredData.reduce<Record<string, Employee[]>>((acc, emp) => {
    if (!acc[emp.department]) acc[emp.department] = []
    acc[emp.department].push(emp)
    return acc
  }, {})

  // Calculate grand total
  const grandTotal = filteredData.reduce(
    (sum, emp) => sum + (emp.baseSalary + emp.bonus - emp.deductions),
    0
  )

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between flex-wrap gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Payroll</h1>
          <p className="text-muted-foreground mt-2">
            Salary breakdown with bonuses and deductions —{" "}
            <span className="font-medium">{period}</span>
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <Input
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56"
          />
          <Select value={filter} onValueChange={(val: "All" | Status) => setFilter(val)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={(val) => setPeriod(val)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="August 2025">August 2025</SelectItem>
              <SelectItem value="September 2025">September 2025</SelectItem>
              <SelectItem value="October 2025">October 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Payroll Table by Department */}
      {Object.keys(groupedPayroll).map((dept) => {
        const deptTotal = groupedPayroll[dept].reduce(
          (sum, emp) => sum + (emp.baseSalary + emp.bonus - emp.deductions),
          0
        )

        return (
          <motion.div
            key={dept}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden shadow-lg rounded-xl">
              <CardHeader className="bg-primary text-white flex items-center justify-between">
                <CardTitle>{dept} Department</CardTitle>
                <span className="font-semibold text-lg">Total: ${deptTotal.toLocaleString()}</span>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border-b font-semibold">Employee</th>
                        <th className="py-3 px-4 border-b font-semibold">Base Salary ($)</th>
                        <th className="py-3 px-4 border-b font-semibold">Bonus ($)</th>
                        <th className="py-3 px-4 border-b font-semibold">Deductions ($)</th>
                        <th className="py-3 px-4 border-b font-semibold">Net Salary ($)</th>
                        <th className="py-3 px-4 border-b font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedPayroll[dept].map((employee, index) => {
                        const netSalary = employee.baseSalary + employee.bonus - employee.deductions
                        return (
                          <motion.tr
                            key={employee.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <td className="py-3 px-4 border-b">{employee.name}</td>
                            <td className="py-3 px-4 border-b">{employee.baseSalary.toLocaleString()}</td>
                            <td className="py-3 px-4 border-b">{employee.bonus.toLocaleString()}</td>
                            <td className="py-3 px-4 border-b">{employee.deductions.toLocaleString()}</td>
                            <td className="py-3 px-4 border-b font-medium">{netSalary.toLocaleString()}</td>
                            <td className="py-3 px-4 border-b">
                              <Select
                                value={employee.status}
                                onValueChange={(val: Status) => updateStatus(employee.id, val)}
                                disabled={lockedStatus[employee.id]} // freeze after selecting
                              >
                                <SelectTrigger
                                  className={`w-32 ${
                                    employee.status === "Paid"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Paid">Paid</SelectItem>
                                  <SelectItem value="Pending">Pending</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}

      {/* Grand Total */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-right font-semibold text-lg text-primary mt-6"
      >
        Grand Total (All Departments): ${grandTotal.toLocaleString()}
      </motion.div>
    </div>
  )
}
