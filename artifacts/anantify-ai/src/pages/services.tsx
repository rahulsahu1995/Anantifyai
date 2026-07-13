import React, { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { Shield, Zap, RefreshCw, Headphones, Wallet, Search, Box, Settings, CheckSquare, Activity, Upload, Rocket, Phone, Calendar, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const UXDesignAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 4), 2200);
    return () => clearInterval(t);
  }, []);

  const accentBorders = [
    "rgba(59,130,246,0.45)",
    "rgba(16,185,129,0.45)",
    "rgba(139,92,246,0.45)",
    "rgba(234,88,12,0.45)",
  ];
  const headerBgs = [
    "linear-gradient(to right, #1d4ed8, #0891b2)",
    "linear-gradient(to right, #059669, #0d9488)",
    "linear-gradient(to right, #7c3aed, #db2777)",
    "linear-gradient(to right, #ea580c, #dc2626)",
  ];
  const btnBgs = ["#2563eb", "#059669", "#7c3aed", "#ea580c"];
  const fillHex = ["2563EB", "059669", "7C3AED", "EA580C"];
  const barWidths = ["65%", "80%", "52%", "72%"];
  const paletteDots = ["bg-blue-500", "bg-emerald-500", "bg-purple-600", "bg-orange-500", "bg-rose-400"];
  const cursorPos = [
    { x: 22, y: 118 },
    { x: 138, y: 82 },
    { x: 148, y: 138 },
    { x: 208, y: 75 },
  ];

  return (
    <div className="relative w-[240px] h-[180px] md:w-[290px] md:h-[205px] select-none shrink-0">
      <div className="w-full h-full bg-[#0b0b18] rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(59,130,246,0.12)] overflow-hidden flex flex-col">
        <div className="h-7 bg-[#12121e] border-b border-white/5 flex items-center px-3 gap-2 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 mx-3 h-3 bg-white/5 rounded-full" />
          <div className="h-3.5 w-14 bg-blue-500/20 border border-blue-500/20 rounded-full" />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-10 border-r border-white/5 bg-black/30 flex flex-col items-center gap-2.5 pt-3">
            {paletteDots.map((c, i) => (
              <motion.div
                key={i}
                className={`w-5 h-5 rounded-md ${c} shrink-0`}
                animate={{
                  scale: i === step ? 1.28 : 1,
                  opacity: i === step ? 1 : 0.35,
                  boxShadow: i === step ? "0 0 10px 3px rgba(148,163,184,0.4)" : "none",
                }}
                transition={{ duration: 0.35 }}
              />
            ))}
          </div>

          <div className="flex-1 p-2.5 flex flex-col gap-2 relative">
            <motion.div
              className="rounded-xl border overflow-hidden"
              animate={{ borderColor: accentBorders[step] }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-9"
                animate={{ background: headerBgs[step] }}
                transition={{ duration: 0.55 }}
              />
              <div className="p-2 bg-slate-900/80 flex flex-col gap-1.5">
                <motion.div
                  className="h-2 rounded-full bg-white/30"
                  animate={{ width: barWidths[step] }}
                  transition={{ duration: 0.5 }}
                />
                <div className="h-1.5 rounded-full bg-white/10 w-4/5" />
                <div className="h-1.5 rounded-full bg-white/10 w-3/5" />
                <motion.div
                  className="mt-1 h-5 rounded-md flex items-center justify-center text-[8px] font-bold text-white tracking-wider"
                  animate={{ backgroundColor: btnBgs[step] }}
                  transition={{ duration: 0.5 }}
                >
                  Get Started
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="w-[68px] border-l border-white/5 bg-black/30 p-1.5 flex flex-col gap-1.5 shrink-0">
            <div className="text-[6.5px] font-bold text-slate-500 uppercase tracking-wider">Design</div>
            <div className="bg-white/5 rounded p-1 flex flex-col gap-0.5">
              <div className="text-[6.5px] text-slate-500">W / H</div>
              <div className="text-[7.5px] text-white font-mono">240 / 120</div>
            </div>
            <div className="text-[6.5px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Fill</div>
            <motion.div
              className="bg-white/5 rounded p-1 flex items-center gap-1"
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-3 h-3 rounded-sm shrink-0"
                animate={{ backgroundColor: btnBgs[step] }}
                transition={{ duration: 0.4 }}
              />
              <div className="text-[6.5px] text-white font-mono">{fillHex[step]}</div>
            </motion.div>
            <div className="text-[6.5px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Radius</div>
            <div className="bg-white/5 rounded p-1">
              <div className="text-[7.5px] text-white font-mono">12px</div>
            </div>
            <div className="text-[6.5px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Opacity</div>
            <div className="bg-white/5 rounded p-1">
              <div className="text-[7.5px] text-white font-mono">100%</div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute pointer-events-none z-50"
        animate={{ x: cursorPos[step].x, y: cursorPos[step].y }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
        style={{ top: 0, left: 0 }}
      >
        <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
          <path d="M1 1L1 13L4 9.5L6 15L8 14.2L6 9.5L10.5 9.5L1 1Z" fill="white" stroke="#000" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
        <motion.div
          className="absolute top-0 left-0 w-5 h-5 rounded-full border border-cyan-400/60 -translate-x-1 -translate-y-1"
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        key={`ripple-${step}`}
        className="absolute pointer-events-none z-40 rounded-full border border-cyan-400/50"
        style={{
          width: 32,
          height: 32,
          top: cursorPos[step].y - 14,
          left: cursorPos[step].x - 14,
        }}
        initial={{ scale: 0.4, opacity: 0.9 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      />
    </div>
  );
};

const MarqueeRow = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap group">
      <motion.div
        animate={{ x: reverse ? [-1000, 0] : [0, -1000] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-4"
      >
        {[...items, ...items, ...items].map((tech, i) => (
          <span
            key={i}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-slate-300 backdrop-blur-md hover:bg-white/10 hover:text-white transition-colors"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const STEPS = [
  { label: "UX/UI",      color: "from-blue-500 to-cyan-400",     dot: "border-cyan-400",   glow: "shadow-[0_0_12px_4px_rgba(34,211,238,0.7)]"   },
  { label: "Mobile Dev", color: "from-purple-500 to-pink-400",   dot: "border-pink-400",   glow: "shadow-[0_0_12px_4px_rgba(244,114,182,0.7)]"  },
  { label: "Front-End",  color: "from-emerald-500 to-teal-400",  dot: "border-teal-400",   glow: "shadow-[0_0_12px_4px_rgba(45,212,191,0.7)]"   },
  { label: "Back-End",   color: "from-orange-500 to-yellow-400", dot: "border-yellow-400", glow: "shadow-[0_0_12px_4px_rgba(250,204,21,0.7)]"   },
  { label: "Cloud",      color: "from-blue-500 to-indigo-400",   dot: "border-indigo-400", glow: "shadow-[0_0_12px_4px_rgba(129,140,248,0.7)]"  },
];

const SectionHeading = ({
  children,
  gradient,
}: {
  children: React.ReactNode;
  gradient: string;
}) => (
  <div className="overflow-hidden mb-5">
    <motion.h2
      initial={{ x: -60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="text-2xl md:text-3xl font-bold text-white relative inline-block pb-3"
    >
      {children}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.55 }}
        className={`absolute bottom-0 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r ${gradient}`}
      />
    </motion.h2>
  </div>
);

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stepperRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeightMV = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [activeSection, setActiveSection] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v <= 0.01) { setActiveSection(-1); return; }
    setActiveSection(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  return (
    <div className="w-full bg-black text-white selection:bg-blue-500/30 font-sans" ref={containerRef}>

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[150px]" />
      </div>

      {/* ── SECTION 1: Bento Grid ─────────────────────────────────── */}
      <section className="container mx-auto px-4 pt-20 pb-10 relative z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300 font-semibold text-xs tracking-widest uppercase">Discover What We Do</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            Tailored Services <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">for Your Needs</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">

          {/* Card 1: Qualities — full width, taller */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            whileHover={{ scale: 1.01 }}
            className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-4 bg-gradient-to-br from-slate-900/80 to-black border border-white/10 rounded-[2rem] p-8 md:p-10 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="text-xl md:text-2xl font-bold mb-8 text-white flex items-center gap-3">
              <Zap className="text-blue-400 w-6 h-6 shrink-0" /> Our Top Notch Qualities
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 md:gap-6">
              {[
                { icon: Shield,     label: "Reliability",   color: "from-blue-500 to-cyan-500",    glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]"  },
                { icon: Zap,        label: "Speed",         color: "from-yellow-400 to-orange-500", glow: "shadow-[0_0_20px_rgba(250,204,21,0.3)]"  },
                { icon: RefreshCw,  label: "Flexibility",   color: "from-purple-500 to-pink-500",   glow: "shadow-[0_0_20px_rgba(168,85,247,0.3)]"  },
                { icon: Headphones, label: "Support",       color: "from-emerald-400 to-teal-500",  glow: "shadow-[0_0_20px_rgba(52,211,153,0.3)]"  },
                { icon: Wallet,     label: "Affordability", color: "from-rose-400 to-red-500",      glow: "shadow-[0_0_20px_rgba(251,113,133,0.3)]" },
              ].map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center gap-3 group/item cursor-pointer"
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover/item:border-transparent group-hover/item:bg-gradient-to-br ${q.color} ${q.glow} transition-all duration-300 group-hover/item:scale-110`}>
                    <q.icon className="h-6 w-6 md:h-8 md:w-8 text-slate-300 group-hover/item:text-white transition-colors" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-slate-400 group-hover/item:text-white transition-colors text-center">{q.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: AI Experts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-[2rem] p-8 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between group min-h-[220px]"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl group-hover:bg-indigo-500/50 transition-colors duration-500" />
            <div>
              <span className="inline-block bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full mb-4">The AI Experts</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">Meet The AI<br />Enthusiast</h3>
            </div>
            <div className="self-end mt-4">
              <div className="w-20 h-20 bg-black/50 rounded-full border-4 border-indigo-500/30 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500 group-hover:border-indigo-400/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                <Box className="w-10 h-10 text-indigo-400" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Innovation Hub */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 flex items-center justify-center overflow-hidden relative group min-h-[220px]"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
                <Settings className="w-72 h-72 text-cyan-500" />
              </motion.div>
            </div>
            <div className="relative z-10 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-500">
                <Rocket className="w-10 h-10 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Innovation Hub</h3>
            </div>
          </motion.div>

          {/* Card 4: Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-4 bg-slate-900/50 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl overflow-hidden flex flex-col justify-center relative min-h-[220px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50" />
            <h3 className="text-xl md:text-2xl font-bold mb-8 text-white relative z-10">Playground for Big Boys out there.</h3>
            <div className="space-y-4 relative z-10 w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <MarqueeRow items={["Playwright", "Flutter", "Angular", "Next.js", "Golang", "Python", "MongoDB", "MySQL"]} />
              <MarqueeRow items={["Stripe", "Terraform", "Cloudflare", "React", "TypeScript", "Kubernetes", "Docker"]} reverse />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 2: Vertical Stepper ──────────────────────────── */}
      <section className="py-10 relative" ref={stepperRef}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 relative items-start">

            {/* Sticky Timeline Sidebar — desktop only */}
            <div className="lg:w-1/4 sticky top-24 hidden lg:block h-[60vh]">
              <div className="relative h-full pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 rounded-full" />
                <motion.div
                  className="absolute left-0 top-0 w-0.5 rounded-full bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_6px_rgba(99,179,237,0.9)]"
                  style={{ height: lineHeightMV }}
                />
                <div className="flex flex-col justify-between h-full py-4">
                  {STEPS.map((step, i) => {
                    const isActive = i === activeSection;
                    const isPast   = i < activeSection;
                    return (
                      <div key={i} className="relative flex items-center gap-3">
                        <div
                          className={[
                            "absolute -left-[27px] w-3.5 h-3.5 rounded-full z-10 border-2 transition-all duration-500",
                            isActive
                              ? `bg-black ${step.dot} ${step.glow} scale-125`
                              : isPast
                                ? `bg-black ${step.dot} opacity-60`
                                : "bg-black border-slate-700",
                          ].join(" ")}
                        />
                        <span
                          className={[
                            "text-sm font-bold uppercase tracking-widest transition-colors duration-500",
                            isActive ? "text-white" : isPast ? "text-slate-400" : "text-slate-600",
                          ].join(" ")}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stepper Content */}
            <div className="lg:w-3/4 space-y-8">

              {/* 1. UX/UI */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="relative"
              >
                <SectionHeading gradient="from-blue-500 to-cyan-400">UX/UI Design</SectionHeading>
                <div className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-6 md:p-7 relative overflow-hidden group transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex-1 relative z-20 min-w-0">
                      <p className="text-base text-slate-300 leading-relaxed font-light">Creating stunning, user-centric digital experiences that captivate and convert.</p>
                    </div>
                    <div className="shrink-0 self-center">
                      <UXDesignAnimation />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 2. Mobile Dev */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="relative"
              >
                <SectionHeading gradient="from-purple-500 to-pink-400">Mobile Development</SectionHeading>
                <div className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-6 md:p-7 relative overflow-hidden group transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex-1 relative z-20 min-w-0">
                      <p className="text-base text-slate-300 leading-relaxed font-light mb-4">Native and cross-platform mobile applications built for performance.</p>
                      <div className="flex flex-wrap gap-2">
                        {["Flutter", "React Native", "Ionic"].map((t, i) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 self-center">
                      <div className="w-36 h-60 md:w-44 md:h-72 bg-black rounded-[2rem] border-[5px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col group-hover:-translate-y-3 transition-transform duration-500">
                        <div className="absolute top-0 inset-x-0 h-5 bg-black flex justify-center z-10">
                          <div className="w-12 h-4 bg-slate-900 rounded-b-xl" />
                        </div>
                        <div className="flex-1 bg-slate-950 p-3 pt-7 flex flex-col gap-2">
                          <motion.div initial={{ x: 80 }} whileInView={{ x: 0 }} transition={{ delay: 0.3 }} className="w-full h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl" />
                          <motion.div initial={{ x: -80 }} whileInView={{ x: 0 }} transition={{ delay: 0.5 }} className="w-3/4 h-6 bg-slate-800 rounded-lg" />
                          <motion.div initial={{ x: 80 }} whileInView={{ x: 0 }} transition={{ delay: 0.7 }} className="w-full h-6 bg-slate-800 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3. Front-End */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="relative"
              >
                <SectionHeading gradient="from-emerald-500 to-teal-400">Front-End Development</SectionHeading>
                <div className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-6 md:p-7 relative overflow-hidden group transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex-1 relative z-20 min-w-0">
                      <p className="text-base text-slate-300 leading-relaxed font-light mb-4">Responsive, accessible, and fast web interfaces using modern frameworks.</p>
                      <div className="flex flex-wrap gap-2">
                        {["React.js", "Next.js", "Angular", "Vue.js", "Tailwind CSS", "Bootstrap", "TypeScript"].map((t, i) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.06 }}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 self-center w-full sm:w-56 md:w-64">
                      <div className="w-full bg-slate-950 rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden group-hover:scale-[1.03] transition-transform duration-700 origin-bottom-right">
                        <div className="h-7 bg-slate-900 border-b border-white/10 flex items-center px-3 gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                          <div className="ml-3 h-3 w-24 bg-slate-800 rounded-full" />
                        </div>
                        <div className="p-4 flex gap-4">
                          <div className="w-1/4 space-y-2">
                            <div className="h-3 w-full bg-slate-800/60 rounded animate-pulse" />
                            <div className="h-3 w-5/6 bg-slate-800/60 rounded animate-pulse delay-75" />
                            <div className="h-3 w-4/6 bg-slate-800/60 rounded animate-pulse delay-150" />
                          </div>
                          <div className="w-3/4 space-y-3">
                            <div className="h-20 w-full bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl" />
                            <div className="h-12 w-full bg-slate-800/30 rounded-xl" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 4. Back-End */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="relative"
              >
                <SectionHeading gradient="from-orange-500 to-yellow-400">Back-End Development</SectionHeading>
                <div className="bg-black border border-white/10 rounded-[2rem] p-6 md:p-7 relative overflow-hidden group transition-all duration-500 hover:border-orange-500/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.1)]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 to-transparent" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex-1 relative z-20 min-w-0">
                      <p className="text-base text-slate-300 leading-relaxed font-light mb-4">Robust architectures and secure APIs powering your digital ecosystem.</p>
                      <div className="flex flex-wrap gap-2">
                        {["Java", "Node.js", "NestJS", "Python", "FastAPI", "Django"].map((t, i) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.07 }}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 self-center">
                      <div className="relative flex items-center justify-center w-36 h-36 md:w-44 md:h-44">
                        <div className="absolute w-14 h-14 bg-slate-900 border border-slate-700 rounded-2xl z-20 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                          <Database className="w-7 h-7 text-orange-500" />
                        </div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="absolute w-full h-full border border-dashed border-slate-600 rounded-full"
                        >
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-400 rounded-full shadow-[0_0_15px_rgba(251,146,60,1)]" />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          className="absolute w-24 h-24 md:w-28 md:h-28 border border-slate-700 rounded-full"
                        >
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,1)]" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 5. Cloud Services */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="relative"
              >
                <SectionHeading gradient="from-blue-500 to-indigo-400">Cloud Services</SectionHeading>
                <div className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-6 md:p-7 relative overflow-hidden group transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex-1 relative z-20 min-w-0">
                      <p className="text-base text-slate-300 leading-relaxed font-light mb-4">Scalable cloud infrastructure and DevOps automation.</p>
                      <div className="flex flex-wrap gap-2">
                        {["AWS / Google Cloud", "CI/CD Pipelines", "Docker & Kubernetes", "MongoDB Atlas", "SQL", "NoSQL"].map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.07 }}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 self-center">
                      <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
                        <Shield className="absolute w-full h-full text-blue-900/30 group-hover:scale-110 transition-transform duration-700" />
                        <Shield className="absolute w-3/4 h-3/4 text-blue-600/50 group-hover:scale-105 transition-transform duration-500" />
                        <motion.div animate={{ rotate: 180 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="relative z-10">
                          <Settings className="w-10 h-10 text-cyan-400" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Cross-Functional Team ──────────────────────── */}
      <section className="py-10 relative z-10 bg-black">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-bold mb-4 text-white tracking-tight"
            >
              A Cross-Functional Team With Deep Digital Product Expertise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base text-slate-400 font-light"
            >
              Our collaborative approach ensures every angle is covered, from initial discovery to final deployment and beyond.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Search,    title: "Discovery and Built Analysis"  },
              { icon: Box,       title: "Data Collection & Preparation" },
              { icon: Settings,  title: "Model Selection & Development" },
              { icon: CheckSquare, title: "Training & Evaluation"       },
              { icon: RefreshCw, title: "Continuous Improvement"        },
              { icon: Activity,  title: "Monitoring & Maintenance"      },
              { icon: Upload,    title: "Deployment & Integration"      },
              { icon: Rocket,    title: "Launch & User Feedbacks"       },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-[#0f1219] border border-white/5 p-5 rounded-3xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-400 cursor-default"
              >
                <div className="absolute -right-4 -bottom-8 text-8xl font-black text-white/5 group-hover:text-blue-500/8 transition-colors duration-500 z-0 select-none pointer-events-none">
                  0{i + 1}
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                    <item.icon className="h-6 w-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="font-bold text-base text-slate-200 group-hover:text-white transition-colors mt-auto">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Final Booking CTA ──────────────────────────── */}
      <section className="py-14 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
          <div className="text-[20vw] font-black leading-none whitespace-nowrap text-white">LET'S TALK</div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 space-y-8 text-center lg:text-left"
            >
              <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full">
                <span className="text-yellow-400 font-bold text-sm tracking-widest uppercase">NOT IMPRESSED YET..?</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-xl">
                Book Your Meeting Now And Let's Talk In Person
              </h2>
              <div className="pt-4">
                <Link href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white border-0 text-lg px-10 py-7 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.4)]">
                    Hire Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="lg:w-1/2 relative w-full flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(59,130,246,0.3)] text-slate-900 w-full max-w-md relative z-10"
              >
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 -right-6 md:-right-12 w-28 h-28 bg-gradient-to-br from-slate-900 to-black rounded-full border-[6px] border-white shadow-2xl flex items-center justify-center z-20"
                >
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md" />
                  <span className="text-3xl text-white font-black drop-shadow-md">AI</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-8 top-16 bg-yellow-400 p-4 rounded-2xl shadow-xl z-20 border-4 border-white transform -rotate-6"
                >
                  <Calendar className="w-8 h-8 text-yellow-900" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-8 right-16 bg-blue-500 p-4 rounded-2xl shadow-xl z-20 border-4 border-white transform rotate-6"
                >
                  <Phone className="w-8 h-8 text-white" />
                </motion.div>

                <div className="mb-8">
                  <h4 className="font-black text-2xl mb-1 text-slate-900 tracking-tight">Select Date & Time</h4>
                  <p className="text-slate-500 text-sm font-medium">Available slots for consultation.</p>
                </div>

                <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-sm font-bold mb-8">
                  {['S','M','T','W','T','F','S'].map((d, i) => (
                    <div key={i} className="text-slate-400 text-xs uppercase">{d}</div>
                  ))}
                  <div className="text-slate-300 py-2">28</div>
                  <div className="text-slate-300 py-2">29</div>
                  <div className="text-slate-300 py-2">30</div>
                  {[1, 2].map(d => <div key={d} className="py-2 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors text-slate-700">{d}</div>)}
                  <div className="bg-blue-600 text-white rounded-xl w-10 h-10 flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30 transform scale-110">3</div>
                  {[4,5,6,7,8,9,10,11].map(d => <div key={d} className="py-2 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors text-slate-700">{d}</div>)}
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl text-lg font-bold shadow-lg transition-transform active:scale-95">
                    Confirm Booking
                  </Button>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
