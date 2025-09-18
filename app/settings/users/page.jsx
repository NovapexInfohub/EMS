"use client"

import { useState } from "react"
import { ArrowLeft, Users, Plus, Search, Filter, MoreVertical, Shield, Mail } from "lucide-react"
import Link from "next/link"

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [showAddUser, setShowAddUser] = useState(false)

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15",
      avatar: "/diverse-woman-portrait.png",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@techcorp.com",
      role: "Manager",
      status: "Active",
      lastLogin: "2024-01-14",
      avatar: "/thoughtful-man.png",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily@techcorp.com",
      role: "Employee",
      status: "Active",
      lastLogin: "2024-01-13",
      avatar: "/diverse-woman-portrait.png",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david@techcorp.com",
      role: "Employee",
      status: "Inactive",
      lastLogin: "2024-01-10",
      avatar: "/thoughtful-man.png",
    },
  ]

  const roles = ["Admin", "Manager", "Employee", "HR", "Finance"]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Link href="/settings" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-blue-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage user access and permissions</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div
          className="bg-white rounded-xl shadow-lg overflow-hidden animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === "Admin"
                            ? "bg-red-100 text-red-800"
                            : user.role === "Manager"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            { title: "Total Users", value: "24", icon: Users, color: "blue" },
            { title: "Active Users", value: "21", icon: Shield, color: "green" },
            { title: "Admins", value: "3", icon: Shield, color: "red" },
            { title: "Pending Invites", value: "2", icon: Mail, color: "yellow" },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.title}
                className="bg-white rounded-xl shadow-lg p-6 animate-slide-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
