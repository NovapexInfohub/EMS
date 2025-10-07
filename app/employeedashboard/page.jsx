"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmployeeDashboardMain() {
  const router = useRouter();

  // Mock employee list (replace with API later)
  const employees = [
    { id: 1, name: "Alice Johnson", department: "Engineering", position: "Frontend Developer" },
    { id: 2, name: "Bob Smith", department: "HR", position: "HR Manager" },
    { id: 3, name: "Charlie Lee", department: "Finance", position: "Accountant" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-10 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Employee Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <Card key={emp.id} className="shadow-md hover:shadow-lg transition-all border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{emp.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Department:</strong> {emp.department}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Position:</strong> {emp.position}
              </p>

              <Button
                onClick={() => router.push(`/employeedashboard/${emp.id}`)}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700"
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
