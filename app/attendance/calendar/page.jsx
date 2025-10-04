"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export default function AttendanceCalendar() {
  const [events, setEvents] = useState([
    {
      title: "Team Meeting",
      start: new Date().toISOString().split("T")[0],
      department: "Engineering",
      description: "Weekly sync-up on project updates.",
      color: "#2563eb",
    },
    {
      title: "Performance Reviews",
      start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      department: "HR",
      description: "Quarterly review sessions with HR team.",
      color: "#16a34a",
    },
    {
      title: "Quarterly Planning",
      start: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
      department: "Management",
      description: "Strategy meeting for Q4 goals.",
      color: "#f59e0b",
    },
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
    HR: "#16a34a",
    Management: "#f59e0b",
    General: "#6b7280",
  };

  const handleDateClick = (info) => {
    setNewEvent({ ...newEvent, date: info.dateStr });
    setOpen(true);
  };

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

  const handleDeleteEvent = () => {
    setEvents(events.filter((e) => e !== selectedEvent));
    setEditOpen(false);
  };

  return (
    <motion.div
      className="p-6 space-y-6 relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <Card className="shadow-lg bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-600 flex items-center gap-2">
            Attendance & Event Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Manage employee events, meetings, and reminders in one place.
          </p>
        </CardContent>
      </Card>

      {/* Calendar */}
      <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-100">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,listWeek",
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true}
          selectable={true}
          height="80vh"
          eventDisplay="block"
          eventTextColor="#fff"
        />
      </div>

      {/* Floating Add Button */}
      <motion.div
        className="fixed bottom-8 right-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          className="rounded-full w-14 h-14 bg-indigo-600 hover:bg-indigo-700 shadow-lg"
          onClick={() => setOpen(true)}
        >
          <Plus className="w-6 h-6 text-white" />
        </Button>
      </motion.div>

      {/* Add Event Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-indigo-700">
              Add New Event / Reminder
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
              placeholder="Short description of event"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
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
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleAddEvent}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Add Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit/Delete Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-indigo-700">
              Edit / Delete Event
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <Input
              placeholder="Edit title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <Textarea
              placeholder="Edit event description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
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
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button
                onClick={handleEditEvent}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                 Save Changes
              </Button>
              <Button
                onClick={handleDeleteEvent}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                 Delete Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
