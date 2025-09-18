"use client"

import { useState } from "react"
import { Settings, Building2, Users, Shield, Bell, Database, Palette } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company")

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
      green: { bg: "bg-green-100", text: "text-green-600" },
      red: { bg: "bg-red-100", text: "text-red-600" },
      yellow: { bg: "bg-yellow-100", text: "text-yellow-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
      pink: { bg: "bg-pink-100", text: "text-pink-600" },
    }
    return colorMap[color] || { bg: "bg-gray-100", text: "text-gray-600" }
  }

  const settingsCards = [
    {
      id: "company",
      title: "Company Settings",
      description: "Manage company information and branding",
      icon: Building2,
      href: "/settings/company",
      color: "blue",
    },
    {
      id: "users",
      title: "User Management",
      description: "Control user access and permissions",
      icon: Users,
      href: "/settings/users",
      color: "green",
    },
    {
      id: "security",
      title: "Security & Privacy",
      description: "Configure security settings and policies",
      icon: Shield,
      href: "/settings/security",
      color: "red",
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Manage system notifications and alerts",
      icon: Bell,
      href: "/settings/notifications",
      color: "yellow",
    },
    {
      id: "system",
      title: "System Configuration",
      description: "Advanced system settings and integrations",
      icon: Database,
      href: "/settings/system",
      color: "purple",
    },
    {
      id: "appearance",
      title: "Appearance",
      description: "Customize the look and feel of the application",
      icon: Palette,
      href: "/settings/appearance",
      color: "pink",
    },
  ]

  const recentActivity = [
    { action: "User permissions updated", user: "Admin", time: "2 hours ago" },
    { action: "Company logo changed", user: "Sarah Johnson", time: "1 day ago" },
    { action: "Security policy updated", user: "Admin", time: "2 days ago" },
    { action: "New user added", user: "Michael Chen", time: "3 days ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Settings className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings & Administration</h1>
            <p className="text-gray-600 mt-1">Manage your ERP system configuration</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {settingsCards.map((card, index) => {
                const Icon = card.icon
                const colors = getColorClasses(card.color)
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </Link>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
                  <Users className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Add New User</span>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center">
                  <Database className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Backup Data</span>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center">
                  <Shield className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Security Audit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Status */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.7s" }}>
              <h3 className="font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Services</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">Running</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Backup</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-yellow-600">Scheduled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.8s" }}>
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">by {activity.user}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
