import React, { useState, useMemo } from "react";
import calendarBrandImg from "@assets/AnantifyAI_1779178324303.jpeg";
import {
  Phone,
  Mail,
  MapPin,
  Brain,
  Notebook,
  Smartphone,
  Code,
  Cloud,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  Globe,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE;

/* ─── Calendar helpers ───────────────────────────── */
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function buildGrid(year: number, month: number): (number | null)[] {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0
  const total = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstWeekday).fill(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/* ─── Time slots ─────────────────────────────────── */
const TIME_SLOTS = [
  "9:00 am",
  "9:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "2:00 pm",
  "2:30 pm",
  "3:00 pm",
  "3:30 pm",
  "4:00 pm",
  "4:30 pm",
  "5:00 pm",
];

type Status = "idle" | "loading" | "success" | "error";

/* ─── Component ──────────────────────────────────── */
export default function Contact() {
  const today = useMemo(() => new Date(), []);

  const [viewMonth, setViewMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [selectedService, setSelectedService] = useState<string>("AI");

  // Appointment slot confirmation state (UI-only, no email)
  const [apptConfirmed, setApptConfirmed] = useState(false);

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formIdea, setFormIdea] = useState("");
  const [formStatus, setFormStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Confirm the slot visually — no email sent here
  const handleAppointment = () => {
    if (!selectedDate || !selectedTime) return;
    setApptConfirmed(true);
  };

  // Reset the scheduler section
  const resetScheduler = () => {
    const now = new Date();
    setSelectedDate(now);
    setViewMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedTime(null);
    setApptConfirmed(false);
  };

  // Submit button: send ONE email with form data + appointment if confirmed
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setFormStatus("loading");
    setFormError("");
    try {
      const hasAppointment = apptConfirmed && selectedDate && selectedTime;
      const endpoint = hasAppointment ? "/appointment" : "/contact";
      const body: Record<string, string> = {
        name: formName.trim(),
        phone: formPhone.trim(),
        email: formEmail.trim(),
        service: selectedService,
        idea: formIdea.trim(),
      };
      if (hasAppointment) {
        body.date = selectedDate!.toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        body.time = selectedTime!;
      }
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log("data", data);
      if (!res.ok) throw new Error(data.error ?? "Failed");
      // Show toast then reset to idle so button is usable again
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      setFormStatus("idle");
      // Reset form
      setFormName("");
      setFormPhone("");
      setFormEmail("");
      setFormIdea("");
      setSelectedService("AI");
      // Reset scheduler
      resetScheduler();
    } catch (e: any) {
      setFormStatus("error");
      setFormError(e.message ?? "Something went wrong. Please try again.");
    }
  };

  const grid = useMemo(
    () => buildGrid(viewMonth.getFullYear(), viewMonth.getMonth()),
    [viewMonth],
  );

  const navigate = (dir: 1 | -1) => {
    setDirection(dir);
    setViewMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1),
    );
  };

  const isPast = (day: number) => {
    const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(today);
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isToday = (day: number) =>
    sameDay(
      today,
      new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day),
    );

  const isSelected = (day: number) =>
    selectedDate
      ? sameDay(
          selectedDate,
          new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day),
        )
      : false;

  const handleDay = (day: number) => {
    if (!day || isPast(day)) return;
    setSelectedDate(
      new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day),
    );
    setSelectedTime(null);
    setApptConfirmed(false);
  };

  return (
    <div className="w-full">
      {/* ── Success Toast ─────────────────────────────────── */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white border border-emerald-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-2xl px-5 py-4 min-w-[280px] max-w-sm"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-slate-900 font-semibold text-sm">
                Message sent!
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                We'll get back to you soon.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 pt-24 pb-52 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(37,99,235,0.18),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-blue-500/15 text-blue-300 text-xs font-bold px-5 py-2 rounded-full mb-8 inline-flex items-center gap-2 border border-blue-500/30 backdrop-blur"
          >
            <Phone className="h-3.5 w-3.5" /> Don't hesitate to call
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight"
          >
            We Are Always Available
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          >
            To Talk To You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-slate-400 mt-6 max-w-lg mx-auto text-lg"
          >
            Schedule a consultation or get in touch directly to discuss how our
            AI solutions can transform your business.
          </motion.p>
        </div>
      </section>

      {/* ── Scheduling Card ───────────────────────────────── */}
      <section className="bg-slate-50 py-12 px-4 -mt-40">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="lg:col-span-12 rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] overflow-hidden z-10 relative border border-white/10"
            style={{
              background:
                "linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)",
            }}
          >
            {/* subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* glow blob */}
            <div className="absolute top-[-80px] left-1/3 w-[500px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* ── Left Info Column ── */}
              <div className="border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-10 flex flex-col">
                <img
                  src={calendarBrandImg}
                  alt="Anantify AI"
                  className="w-full max-w-[220px] h-auto object-contain rounded-xl drop-shadow-[0_8px_32px_rgba(0,100,255,0.35)] shadow-[0_4px_24px_rgba(0,0,0,0.7)] mb-5"
                />
                <p className="text-slate-400 text-sm font-medium mb-1">
                  Anantify AI
                </p>
                <h3 className="text-2xl font-black text-white mb-7">
                  ai-consultation
                </h3>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: Clock, text: "30 min" },
                    { icon: Video, text: "Video Call" },
                    { icon: Globe, text: "Asia / Kolkata" },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-3 text-slate-300 text-sm"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-blue-400" />
                      </div>
                      {text}
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-6 mt-auto">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Schedule a quick consultation to discuss your AI needs and
                    how we can help accelerate your growth.
                  </p>
                  {selectedDate && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-5 rounded-2xl px-4 py-3 border transition-all duration-300 ${
                        apptConfirmed
                          ? "bg-emerald-600/15 border-emerald-500/30"
                          : "bg-blue-600/20 border-blue-500/30"
                      }`}
                    >
                      <p
                        className={`text-xs font-bold uppercase tracking-wider mb-1 ${apptConfirmed ? "text-emerald-300" : "text-blue-300"}`}
                      >
                        {apptConfirmed ? "Confirmed Slot" : "Selected Slot"}
                      </p>
                      <p className="text-white font-semibold text-sm">
                        {selectedDate.toLocaleDateString("en-IN", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p
                        className={`text-sm font-medium mt-0.5 ${apptConfirmed ? "text-emerald-300" : "text-blue-300"}`}
                      >
                        {selectedTime}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* ── Calendar Column ── */}
              <div className="border-b md:border-b-0 md:border-r border-white/10 p-7 md:p-9 flex flex-col gap-5">
                <h4 className="font-bold text-white text-base">
                  Select a Date
                </h4>

                {/* Month navigator */}
                <div className="flex items-center justify-between mb-1">
                  <button
                    onClick={() => navigate(-1)}
                    className="w-8 h-8 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/15 hover:text-white transition-all hover:scale-110 active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${viewMonth.getFullYear()}-${viewMonth.getMonth()}`}
                      initial={{ opacity: 0, x: direction * 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -24 }}
                      transition={{ duration: 0.25 }}
                      className="text-white font-bold text-sm tracking-wide select-none"
                    >
                      {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                    </motion.span>
                  </AnimatePresence>
                  <button
                    onClick={() => navigate(1)}
                    className="w-8 h-8 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/15 hover:text-white transition-all hover:scale-110 active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {DAYS.map((d) => (
                    <div
                      key={d}
                      className="text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider py-1"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Date grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`grid-${viewMonth.getFullYear()}-${viewMonth.getMonth()}`}
                    initial={{ opacity: 0, x: direction * 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -30 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-7 gap-1"
                  >
                    {grid.map((day, idx) => {
                      if (!day) return <div key={idx} />;
                      const past = isPast(day);
                      const todayDay = isToday(day);
                      const selected = isSelected(day);
                      return (
                        <button
                          key={idx}
                          onClick={() => handleDay(day)}
                          disabled={past}
                          className={[
                            "relative flex items-center justify-center rounded-xl text-sm font-semibold h-9 w-full transition-all duration-150",
                            past
                              ? "text-slate-700 cursor-not-allowed"
                              : selected
                                ? "bg-blue-600 text-white shadow-[0_4px_14px_rgba(37,99,235,0.5)] scale-110 z-10"
                                : todayDay
                                  ? "text-blue-400 border border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 hover:scale-110"
                                  : "text-slate-200 hover:bg-white/12 hover:scale-110 hover:text-white",
                          ].join(" ")}
                        >
                          {day}
                          {todayDay && !selected && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Time Slots Column ── */}
              <div className="p-7 md:p-9 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-base">
                    Select Time
                  </h4>
                  {selectedDate && (
                    <span className="text-xs text-slate-400">
                      {selectedDate.toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>

                <div
                  className="space-y-2 flex-1 overflow-y-auto max-h-[320px] pr-1
                  scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                >
                  {TIME_SLOTS.map((time) => {
                    const active = selectedTime === time;
                    return (
                      <motion.button
                        key={time}
                        onClick={() => {
                          setSelectedTime(time);
                          setApptConfirmed(false);
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={[
                          "w-full flex items-center justify-between px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-200",
                          active
                            ? "bg-blue-600 border-blue-500 text-white shadow-[0_4px_14px_rgba(37,99,235,0.45)]"
                            : "bg-white/6 border-white/10 text-slate-300 hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-white",
                        ].join(" ")}
                      >
                        <span className="flex items-center gap-2.5">
                          <Clock
                            className={`w-3.5 h-3.5 ${active ? "text-blue-200" : "text-slate-500"}`}
                          />
                          {time}
                        </span>
                        {active && (
                          <CheckCircle2 className="w-4 h-4 text-blue-200" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Slot confirmation feedback */}
                <AnimatePresence>
                  {apptConfirmed && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-300 text-sm font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      Slot confirmed. Fill in the form below and click Submit to
                      send.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Confirm button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAppointment}
                  disabled={!selectedDate || !selectedTime || apptConfirmed}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_28px_rgba(37,99,235,0.55)] flex items-center justify-center gap-2"
                >
                  {apptConfirmed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Slot Confirmed
                    </>
                  ) : selectedDate && selectedTime ? (
                    "Confirm Appointment"
                  ) : (
                    "Choose Date & Time"
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* ── Contact Form ──────────────────────────────── */}
          <div className="lg:col-span-8 bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-bl-full -z-0 opacity-70" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50 rounded-tr-full -z-0 opacity-50" />

            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-2 text-slate-900 tracking-tight">
                Get In Touch With Us Today
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-lg">
                Have a project in mind or looking for AI-driven solutions? Our
                team is here to help you transform your ideas into cutting-edge
                technology. Let's start the conversation.
              </p>

              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Your Name
                    </label>
                    <Input
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Type your name here"
                      className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 py-5 text-sm rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone No.
                    </label>
                    <Input
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="Enter your phone no. here"
                      className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 py-5 text-sm rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email Address
                  </label>
                  <Input
                    required
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Enter your e-mail here"
                    className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 py-5 text-sm rounded-xl"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    How can we help you?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: "AI", icon: Brain },
                      { name: "Design", icon: Notebook },
                      { name: "Mobile", icon: Smartphone },
                      { name: "Web", icon: Code },
                      { name: "Cloud", icon: Cloud },
                    ].map(({ name, icon: Icon }) => {
                      const active = selectedService === name;
                      return (
                        <motion.button
                          key={name}
                          type="button"
                          onClick={() => setSelectedService(name)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.96 }}
                          className={[
                            "flex items-center gap-2 px-5 py-2.5 border-2 rounded-xl transition-all text-sm font-semibold",
                            active
                              ? "border-blue-500 bg-blue-50 text-blue-600 shadow-[0_2px_12px_rgba(37,99,235,0.15)]"
                              : "border-slate-200 text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600",
                          ].join(" ")}
                        >
                          <Icon className="w-4 h-4" /> {name}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Your Idea
                  </label>
                  <Textarea
                    value={formIdea}
                    onChange={(e) => setFormIdea(e.target.value)}
                    placeholder="Spill your idea here, we are happy to discuss"
                    className="bg-slate-50 border-slate-200 text-black focus-visible:ring-blue-500 min-h-[140px] resize-none text-sm rounded-xl"
                  />
                </div>

                <AnimatePresence>
                  {formStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm font-medium"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      {formError || "Failed to send. Please try again."}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus === "loading"}
                  className="w-full py-4 text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_28px_rgba(37,99,235,0.5)] transition-shadow duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formStatus === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          {/* ── Right Sidebar ─────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Agent card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-[0_20px_50px_-10px_rgba(37,99,235,0.45)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-12 -translate-x-8" />

              <div className="bg-white/20 backdrop-blur w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative z-10">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2 relative z-10">
                Talk With Our AI Agent
              </h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed relative z-10">
                Get instant answers about our services, team, and how Anantify
                AI can help your business grow.
              </p>
              <div className="relative z-10">
                <a href="/ai-agent">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-white text-blue-600 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2.5 hover:bg-blue-50 transition-colors shadow-lg text-sm"
                  >
                    <Bot className="w-4 h-4" /> Start Chatting
                  </motion.button>
                </a>
              </div>
            </motion.div>

            {/* Office card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl border border-slate-800"
            >
              <h3 className="text-xl font-black mb-7 flex items-center gap-3">
                <MapPin className="text-blue-400 w-5 h-5" /> Visit Our Office
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    label: "Location",
                    value:
                      "138/3, Govind Colony, Kila Road, Indore, M.P. — 452015",
                    href: null,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "rahul.sahu1995@gmail.com",
                    href: "mailto:rahul.sahu1995@gmail.com",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+91 81208 71155",
                    href: "tel:+918120871155",
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className="shrink-0 bg-slate-800 p-3 rounded-xl group-hover:bg-blue-600 transition-colors duration-200">
                      <Icon className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-slate-300 text-sm hover:text-white transition-colors leading-relaxed"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
