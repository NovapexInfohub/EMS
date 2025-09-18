"use client"

import { useState } from "react"
import { ArrowLeft, Shield, Key, Lock } from "lucide-react"
import Link from "next/link"

export default function SecuritySettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)

  const securityLogs = [
    { action: "Password changed", user: "Admin", time: "2 hours ago", status: "success" },
    { action: "Failed login attempt", user: "Unknown", time: "1 day ago", status: "warning" },
    { action: "2FA enabled", user: "Sarah Johnson", time: "2 days ago", status: "success" },
    { action: "Permission updated", user: "Admin", time: "3 days ago", status: "info" },
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
            <h1 className="text-3xl font-bold text-gray-900">Security & Privacy</h1>
            <p className="text-gray-600 mt-1">Configure security settings and access policies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Password Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <Key className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Password Policy</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
                    <input
                      type="number"
                      defaultValue="8"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                    <input
                      type="number"
                      defaultValue="90"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Require uppercase letters",
                    "Require lowercase letters",
                    "Require numbers",
                    "Require special characters",
                  ].map((requirement, index) => (
                    <label key={index} className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">{requirement}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Enable 2FA for all users</h3>
                  <p className="text-sm text-gray-600">Require two-factor authentication for enhanced security</p>
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    twoFactorEnabled ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Access Control */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Access Control</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Login Alerts</h3>
                    <p className="text-sm text-gray-600">Send email alerts for new login attempts</p>
                  </div>
                  <button
                    onClick={() => setLoginAlerts(!loginAlerts)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      loginAlerts ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        loginAlerts ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Status */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="font-semibold text-gray-900 mb-4">Security Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Password Policy</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Strong</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">2FA Coverage</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">95%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Failed Logins</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-600">3 today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Security Events */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="font-semibold text-gray-900 mb-4">Recent Events</h3>
              <div className="space-y-3">
                {securityLogs.map((log, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{log.action}</span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          log.status === "success"
                            ? "bg-green-500"
                            : log.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">by {log.user}</p>
                    <p className="text-xs text-gray-500 mt-1">{log.time}</p>
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
