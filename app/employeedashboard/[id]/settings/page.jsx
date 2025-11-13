"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(false)

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground mb-6">
        Manage your personal information, preferences, and security.
      </p>

      <Card className="p-6 shadow-md hover:shadow-lg transition rounded-xl">
        <Accordion type="single" collapsible className="space-y-4">

          {/* ---------------- PROFILE INFO ---------------- */}
          <AccordionItem value="profile">
            <AccordionTrigger className="text-lg font-semibold">
              Profile Information
            </AccordionTrigger>
            <AccordionContent className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <Label>First Name</Label>
                  <Input placeholder="John" />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input placeholder="Doe" />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input placeholder="+91 98765 43210" />
                </div>
              </div>

              <Button className="mt-2">Save Changes</Button>
            </AccordionContent>
          </AccordionItem>

          {/* ---------------- PERSONAL ---------------- */}
          <AccordionItem value="personal">
            <AccordionTrigger className="text-lg font-semibold">
              Personal Details
            </AccordionTrigger>
            <AccordionContent className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <Label>Date of Birth</Label>
                  <Input type="date" />
                </div>

                <div>
                  <Label>Gender</Label>
                  <Input placeholder="Male / Female / Other" />
                </div>

                <div>
                  <Label>Address</Label>
                  <Input placeholder="House no, Street, City" />
                </div>

                <div>
                  <Label>Emergency Contact</Label>
                  <Input placeholder="Name & Phone Number" />
                </div>
              </div>

              <Button className="mt-2">Update Personal Info</Button>
            </AccordionContent>
          </AccordionItem>

          {/* ---------------- WORK INFO ---------------- */}
          <AccordionItem value="work">
            <AccordionTrigger className="text-lg font-semibold">
              Work Information
            </AccordionTrigger>
            <AccordionContent className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <Label>Employee ID</Label>
                  <Input value="101" disabled className="bg-muted" />
                </div>

                <div>
                  <Label>Department</Label>
                  <Input value="Engineering" disabled className="bg-muted" />
                </div>

                <div>
                  <Label>Designation</Label>
                  <Input value="Frontend Developer" disabled className="bg-muted" />
                </div>

                <div>
                  <Label>Joining Date</Label>
                  <Input type="date" disabled className="bg-muted" />
                </div>

              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ---------------- NOTIFICATIONS ---------------- */}
          <AccordionItem value="notifications">
            <AccordionTrigger className="text-lg font-semibold">
              Notification Settings
            </AccordionTrigger>
            <AccordionContent className="space-y-4 mt-4">

              <div className="flex items-center justify-between">
                <Label>Email Notifications</Label>
                <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
              </div>

              <div className="flex items-center justify-between">
                <Label>SMS Alerts</Label>
                <Switch checked={smsNotif} onCheckedChange={setSmsNotif} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Browser Notifications</Label>
                <Switch />
              </div>

            </AccordionContent>
          </AccordionItem>

          {/* ---------------- APPEARANCE ---------------- */}
          <AccordionItem value="appearance">
            <AccordionTrigger className="text-lg font-semibold">
              Appearance
            </AccordionTrigger>
            <AccordionContent className="mt-3 flex items-center justify-between">
              <Label>Dark Mode</Label>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </AccordionContent>
          </AccordionItem>

          {/* ---------------- SECURITY ---------------- */}
          <AccordionItem value="security">
            <AccordionTrigger className="text-lg font-semibold text-red-600">
              Security
            </AccordionTrigger>
            <AccordionContent className="space-y-4 mt-4">

              <div>
                <Label>Current Password</Label>
                <Input type="password" />
              </div>

              <div>
                <Label>New Password</Label>
                <Input type="password" />
              </div>

              <div>
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </div>

              <Button className="mt-2">Update Password</Button>

            </AccordionContent>
          </AccordionItem>

          {/* ---------------- ACCOUNT ACTIONS ---------------- */}
          <AccordionItem value="account">
            <AccordionTrigger className="text-lg font-semibold text-red-600">
              Account Actions
            </AccordionTrigger>
            <AccordionContent className="mt-4">
              <Button variant="destructive">Deactivate Account</Button>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </Card>
    </div>
  )
}
