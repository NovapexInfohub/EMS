"use client"

import { useState } from "react"
import { ArrowLeft, Palette, Monitor, Sun, Moon, Smartphone } from "lucide-react"
import Link from "next/link"

export default function AppearanceSettingsPage() {
  const [selectedTheme, setSelectedTheme] = useState("light")
  const [selectedColor, setSelectedColor] = useState("blue")
  const [compactMode, setCompactMode] = useState(false)

  const themes = [
    { id: "light", name: "Light", icon: Sun, description: "Clean and bright interface" },
    { id: "dark", name: "Dark", icon: Moon, description: "Easy on the eyes" },
    { id: "auto", name: "Auto", icon: Monitor, description: "Matches system preference" },
  ]

  const colorSchemes = [
    { id: "blue", name: "Blue", color: "bg-blue-500" },
    { id: "green", name: "Green", color: "bg-green-500" },
    { id: "purple", name: "Purple", color: "bg-purple-500" },
    { id: "orange", name: "Orange", color: "bg-orange-500" },
    { id: "red", name: "Red", color: "bg-red-500" },
    { id: "teal", name: "Teal", color: "bg-teal-500" },
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
            <h1 className="text-3xl font-bold text-gray-900">Appearance</h1>
            <p className="text-gray-600 mt-1">Customize the look and feel of the application</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Theme Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Theme</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {themes.map((theme) => {
                  const Icon = theme.icon
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-4 border-2 rounded-lg transition-all hover:scale-105 ${
                        selectedTheme === theme.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                      <h3 className="font-medium mb-1">{theme.name}</h3>
                      <p className="text-sm text-gray-600">{theme.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Color Scheme */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-xl font-semibold mb-6">Color Scheme</h2>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {colorSchemes.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`p-4 border-2 rounded-lg transition-all hover:scale-105 ${
                      selectedColor === color.id ? "border-gray-800" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-8 h-8 ${color.color} rounded-full mx-auto mb-2`}></div>
                    <span className="text-sm font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Options */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl font-semibold mb-6">Layout Options</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Compact Mode</h3>
                    <p className="text-sm text-gray-600">Reduce spacing and padding for more content</p>
                  </div>
                  <button
                    onClick={() => setCompactMode(!compactMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      compactMode ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        compactMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sidebar Position</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="top">Top (Current)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="small">Small</option>
                    <option value="medium">Medium (Default)</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Custom CSS */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-xl font-semibold mb-6">Custom Styling</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  rows="6"
                  placeholder="/* Add your custom CSS here */
.custom-header {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
}"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Advanced users can add custom CSS to further customize the appearance.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-3 h-3 ${colorSchemes.find((c) => c.id === selectedColor)?.color} rounded-full`}
                  ></div>
                  <span className="text-sm font-medium">Sample Header</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Device Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <h3 className="font-semibold text-gray-900 mb-4">Device Preview</h3>
              <div className="space-y-3">
                <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Monitor className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Desktop</span>
                </button>
                <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Mobile</span>
                </button>
              </div>
            </div>

            {/* Reset Options */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <h3 className="font-semibold text-gray-900 mb-4">Reset Options</h3>
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-gray-700">Reset to Default</span>
                </button>
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-blue-700">Export Settings</span>
                </button>
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-green-700">Import Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
