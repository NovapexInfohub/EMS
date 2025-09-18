"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Mail, MessageSquare, Smartphone, Volume2 } from "lucide-react"
import Link from "next/link"

export default function NotificationSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  const notificationTypes = [
    {
      id: "employee_updates",
      label: "Employee Updates",
      description: "New hires, departures, and profile changes",
      enabled: true,
    },
    {
      id: "attendance_alerts",
      label: "Attendance Alerts",
      description: "Late arrivals, absences, and overtime",
      enabled: true,
    },
    {
      id: "payroll_reminders",
      label: "Payroll Reminders",
      description: "Payroll processing and payment notifications",
      enabled: true,
    },
    {
      id: "performance_reviews",
      label: "Performance Reviews",
      description: "Review deadlines and completion alerts",
      enabled: false,
    },
    {
      id: "leave_requests",
      label: "Leave Requests",
      description: "New requests and approval notifications",
      enabled: true,
    },
    {
      id: "system_updates",
      label: "System Updates",
      description: "Maintenance and feature announcements",
      enabled: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Link href="/settings" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notification Settings</h1>
            <p className="text-gray-600 mt-1">Manage system notifications and alerts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notification Channels */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Notification Channels</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailNotifications ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-gray-600">Browser and mobile push notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      pushNotifications ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        pushNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Critical alerts via text message</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSmsNotifications(!smsNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      smsNotifications ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        smsNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-6">
                <Volume2 className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Notification Types</h2>
              </div>

              <div className="space-y-4">
                {notificationTypes.map((type, index) => (
                  <div
                    key={type.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{type.label}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        type.enabled ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          type.enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiet Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl font-semibold mb-6">Quiet Hours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    defaultValue="18:00"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    defaultValue="08:00"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                No notifications will be sent during quiet hours except for critical alerts.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notification Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="font-semibold text-gray-900 mb-4">Today's Notifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sent</span>
                  <span className="font-semibold text-blue-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Delivered</span>
                  <span className="font-semibold text-green-600">22</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Failed</span>
                  <span className="font-semibold text-red-600">2</span>
                </div>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="font-semibold text-gray-900 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {[
                  { message: "New employee onboarded", time: "2 hours ago", type: "info" },
                  { message: "Payroll processing complete", time: "4 hours ago", type: "success" },
                  { message: "Leave request pending", time: "6 hours ago", type: "warning" },
                ].map((notification, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
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
