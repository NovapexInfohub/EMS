"use client"

import { useState } from "react"
import { ArrowLeft, Database, Server, Zap, HardDrive, Wifi, Shield } from "lucide-react"
import Link from "next/link"

export default function SystemSettingsPage() {
  const [autoBackup, setAutoBackup] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  const systemMetrics = [
    { label: "CPU Usage", value: "45%", status: "good", icon: Zap },
    { label: "Memory Usage", value: "67%", status: "warning", icon: HardDrive },
    { label: "Storage Used", value: "23%", status: "good", icon: Database },
    { label: "Network Status", value: "Online", status: "good", icon: Wifi },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "error":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Link href="/settings" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Configuration</h1>
            <p className="text-gray-600 mt-1">Advanced system settings and integrations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Health */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <Server className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">System Health</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systemMetrics.map((metric, index) => {
                  const Icon = metric.icon
                  return (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="text-sm font-medium">{metric.label}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(metric.status)}`}>
                          {metric.value}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Database Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Database Configuration</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Automatic Backups</h3>
                    <p className="text-sm text-gray-600">Daily automated database backups</p>
                  </div>
                  <button
                    onClick={() => setAutoBackup(!autoBackup)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoBackup ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        autoBackup ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Retention Period</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* API Configuration */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">API Configuration</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limit (requests/minute)</label>
                  <input
                    type="number"
                    defaultValue="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Version</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="v1">Version 1.0</option>
                    <option value="v2">Version 2.0</option>
                    <option value="v3">Version 3.0 (Beta)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Maintenance Mode</h3>
                    <p className="text-sm text-gray-600">Temporarily disable API access</p>
                  </div>
                  <button
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      maintenanceMode ? "bg-red-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        maintenanceMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="font-semibold text-gray-900 mb-4">System Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Version</span>
                  <span className="text-sm font-medium">v2.1.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-medium">15 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Update</span>
                  <span className="text-sm font-medium">Jan 15, 2024</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-blue-700">Run System Check</span>
                </button>
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-green-700">Create Backup</span>
                </button>
                <button className="w-full p-3 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-yellow-700">Clear Cache</span>
                </button>
                <button className="w-full p-3 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-red-700">Restart Services</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
