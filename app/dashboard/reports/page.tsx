"use client"

import { Button } from "@/components/ui/button"

export default function ReportsPage() {
  const reports = [
    { id: 1, title: "Monthly Attendance Report", lastGenerated: "2 hours ago", size: "2.4 MB" },
    { id: 2, title: "Pending Approvals", lastGenerated: "8 hours ago", size: "5.0 MB" },
    { id: 3, title: "Payroll Summary Q4", lastGenerated: "5 days ago", size: "7.8 MB" },
    { id: 4, title: "Monthly Attendance Report", lastGenerated: "2 hours ago", size: "2.4 MB" },
    { id: 5, title: "Pending Approvals", lastGenerated: "8 hours ago", size: "5.0 MB" },
    { id: 6, title: "Payroll Summary Q4", lastGenerated: "5 days ago", size: "7.8 MB" },
  ]

  return (
    <div className="min-h-screen bg-[#f9fafc] px-10 py-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports Center</h1>
          <p className="text-gray-500 text-sm mt-1">
            Generate, view and manage all your organizational reports
          </p>
        </div>
        <Button className="bg-[#3b3ded] hover:bg-[#2e2fcc] text-white px-5 py-2 rounded-md shadow">
          Create New Report
        </Button>
      </div>

      {/* Reports Section */}
      <div className="bg-[#f3f6ff] p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Reports</h2>

        <div className="space-y-5">
          {reports.map((report, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow transition-all"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Last generated: {report.lastGenerated} | Size: {report.size}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 rounded-md px-4"
                >
                  Preview
                </Button>
                <Button
                  size="sm"
                  className="bg-[#1a56db] hover:bg-[#164bbf] text-white rounded-md px-4"
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
