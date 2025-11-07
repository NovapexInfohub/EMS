"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function AttendanceCalendar() {
  const data = [
    { day: "MON", value: 90 },
    { day: "TUE", value: 85 },
    { day: "WED", value: 83 },
    { day: "THU", value: 88 },
    { day: "FRI", value: 84 },
    { day: "SAT", value: 80 },
  ];

  const departments = [
    { name: "Engineering", percent: 91 },
    { name: "Marketing", percent: 95 },
    { name: "Sales", percent: 89 },
    { name: "HR", percent: 90 },
  ];

  const [events, setEvents] = useState([
    { id: "1", title: "AI Conference", start: "2025-10-03", department: "Engineering", description: "Team research and innovation" },
    { id: "2", title: "Weekend Festival", start: "2025-10-16", department: "HR", description: "Team bonding activities" },
    { id: "3", title: "Marketing 2025", start: "2025-10-25", department: "Marketing", description: "Strategy discussion for campaigns" },
    { id: "4", title: "Design Expo", start: "2025-10-20", department: "Design", description: "Presentation of UI/UX progress" },
  ]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    department: "General",
    description: "",
  });

  const colorMap = {
    Engineering: "#2563eb",
    Marketing: "#9333ea",
    HR: "#16a34a",
    Design: "#f97316",
    General: "#6b7280",
  };

  // When user clicks on a date
  const handleDateClick = (info) => {
    setNewEvent({ ...newEvent, date: info.dateStr });
    setOpen(true);
  };

  // When user clicks an event
  const handleEventClick = (info) => {
    const clickedEvent = events.find(
      (event) =>
        event.title === info.event.title && event.start === info.event.startStr
    );
    setSelectedEvent(clickedEvent);
    setNewEvent({
      title: clickedEvent.title,
      date: clickedEvent.start,
      department: clickedEvent.department,
      description: clickedEvent.description || "",
    });
    setEditOpen(true);
  };

  // Add event
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([
        ...events,
        {
          title: newEvent.title,
          start: newEvent.date,
          department: newEvent.department,
          description: newEvent.description,
          color: colorMap[newEvent.department],
        },
      ]);
      setNewEvent({ title: "", date: "", department: "General", description: "" });
      setOpen(false);
    }
  };

  // Edit event
  const handleEditEvent = () => {
    setEvents(
      events.map((event) =>
        event === selectedEvent
          ? {
              ...event,
              title: newEvent.title,
              start: newEvent.date,
              department: newEvent.department,
              description: newEvent.description,
              color: colorMap[newEvent.department],
            }
          : event
      )
    );
    setEditOpen(false);
  };

  // Delete event
  const handleDeleteEvent = () => {
    setEvents(events.filter((e) => e !== selectedEvent));
    setEditOpen(false);
  };

  return (
    <motion.div
      className="p-10 bg-white min-h-screen space-y-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <Card className="shadow-md bg-gradient-to-r from-indigo-50 to-blue-50 border-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-600">
            Attendance & Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Monitor weekly department performance and manage scheduled events.
          </p>
        </CardContent>
      </Card>

      {/* Main Layout */}
      <div className="flex flex-col xl:flex-row gap-10">
        {/* Left Section - Chart + Departments */}
        <div className="w-full xl:w-2/3 space-y-8">
          {/* Tabs */}
          <div className="flex gap-3">
            {["Week", "Month", "Quarter", "Year"].map((label, i) => (
              <Button
                key={i}
                variant={label === "Week" ? "default" : "outline"}
                className={`${
                  label === "Week"
                    ? "bg-blue-600 text-white"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Bar Chart */}
          <Card className="p-6 border-none shadow-sm">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data} barSize={50}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tick={{ fill: "#2563eb", fontWeight: 600 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(37,99,235,0.1)" }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="value" fill="#bfdbfe" radius={[6, 6, 0, 0]}>
                  <LabelList
                    dataKey="value"
                    position="top"
                    formatter={(value) => `${value}%`}
                    fill="#2563eb"
                    fontWeight={600}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Department Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {departments.map((dept, i) => (
              <Card
                key={i}
                className="flex items-center justify-between p-5 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
              >
                <h2 className="text-gray-700 font-semibold text-lg">
                  {dept.name}
                </h2>
                <span className="text-blue-600 font-bold text-xl">
                  {dept.percent}%
                </span>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Section - Calendar */}
        <div className="w-full xl:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            height="75vh"
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,listWeek",
            }}
            dayMaxEvents={3}
            eventColor="#2563eb"
          />
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-blue-600">
              Add New Event
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <Input
              placeholder="Enter event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <Textarea
              placeholder="Short description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <Select
              value={newEvent.department}
              onValueChange={(val) => setNewEvent({ ...newEvent, department: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleAddEvent}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Add Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-blue-600">
              Edit / Delete Event
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <Input
              placeholder="Edit event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <Textarea
              placeholder="Edit description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <Select
              value={newEvent.department}
              onValueChange={(val) => setNewEvent({ ...newEvent, department: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleEditEvent}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Save
              </Button>
              <Button
                onClick={handleDeleteEvent}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
