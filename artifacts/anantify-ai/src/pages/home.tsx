import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "wouter";
import { Trophy, Rocket, CheckCircle2, Plus, X, MessageSquare, Edit3, Settings, Database, Activity, ArrowUpRight, Bot, Wifi, Pencil, Cloud, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
  { value: 10 }, { value: 15 }, { value: 25 }, { value: 40 }, { value: 60 }, { value: 85 }, { value: 100 }
];

const HERO_STARS = [
  { x:  3.1, y:  4.8, s: 1.2, op: 0.70, tw: true  },
  { x:  8.4, y: 14.2, s: 1.0, op: 0.45, tw: false },
  { x: 14.7, y:  2.5, s: 1.5, op: 0.80, tw: false },
  { x: 21.2, y:  9.6, s: 1.0, op: 0.40, tw: false },
  { x: 28.9, y:  5.1, s: 2.0, op: 0.85, tw: true  },
  { x: 35.4, y: 12.3, s: 1.0, op: 0.35, tw: false },
  { x: 42.8, y:  3.9, s: 1.5, op: 0.65, tw: false },
  { x: 50.1, y:  8.7, s: 1.0, op: 0.50, tw: false },
  { x: 57.6, y:  1.4, s: 2.5, op: 0.90, tw: true  },
  { x: 64.3, y: 11.8, s: 1.0, op: 0.40, tw: false },
  { x: 71.9, y:  6.2, s: 1.5, op: 0.70, tw: false },
  { x: 79.5, y: 15.4, s: 1.0, op: 0.55, tw: false },
  { x: 86.2, y:  4.0, s: 2.0, op: 0.80, tw: true  },
  { x: 93.7, y:  9.3, s: 1.0, op: 0.45, tw: false },
  { x:  5.8, y: 22.6, s: 1.0, op: 0.35, tw: false },
  { x: 12.4, y: 28.9, s: 1.5, op: 0.60, tw: false },
  { x: 19.6, y: 20.4, s: 1.0, op: 0.45, tw: false },
  { x: 26.1, y: 32.1, s: 2.0, op: 0.75, tw: true  },
  { x: 33.8, y: 24.7, s: 1.0, op: 0.30, tw: false },
  { x: 40.3, y: 38.5, s: 1.5, op: 0.65, tw: false },
  { x: 47.9, y: 26.3, s: 1.0, op: 0.40, tw: false },
  { x: 55.2, y: 33.8, s: 2.0, op: 0.80, tw: true  },
  { x: 61.7, y: 19.2, s: 1.0, op: 0.35, tw: false },
  { x: 68.4, y: 30.6, s: 1.5, op: 0.55, tw: false },
  { x: 75.9, y: 22.9, s: 1.0, op: 0.45, tw: false },
  { x: 82.5, y: 37.4, s: 2.5, op: 0.85, tw: true  },
  { x: 89.1, y: 25.8, s: 1.0, op: 0.40, tw: false },
  { x: 95.6, y: 31.2, s: 1.5, op: 0.60, tw: false },
  { x:  1.9, y: 45.3, s: 1.0, op: 0.35, tw: false },
  { x:  9.3, y: 52.7, s: 2.0, op: 0.70, tw: true  },
  { x: 16.8, y: 48.1, s: 1.0, op: 0.45, tw: false },
  { x: 23.5, y: 58.4, s: 1.5, op: 0.55, tw: false },
  { x: 30.2, y: 44.9, s: 1.0, op: 0.35, tw: false },
  { x: 37.6, y: 55.2, s: 1.0, op: 0.40, tw: false },
  { x: 44.1, y: 62.8, s: 2.0, op: 0.78, tw: true  },
  { x: 51.7, y: 47.5, s: 1.0, op: 0.30, tw: false },
  { x: 58.3, y: 60.1, s: 1.5, op: 0.65, tw: false },
  { x: 65.8, y: 50.6, s: 1.0, op: 0.45, tw: false },
  { x: 73.2, y: 57.9, s: 2.5, op: 0.88, tw: true  },
  { x: 80.7, y: 43.3, s: 1.0, op: 0.38, tw: false },
  { x: 87.4, y: 63.5, s: 1.5, op: 0.62, tw: false },
  { x: 94.0, y: 52.0, s: 1.0, op: 0.42, tw: false },
  { x:  4.5, y: 69.8, s: 1.5, op: 0.55, tw: false },
  { x: 11.0, y: 76.4, s: 1.0, op: 0.40, tw: false },
  { x: 17.6, y: 72.1, s: 2.0, op: 0.72, tw: true  },
  { x: 24.9, y: 82.6, s: 1.0, op: 0.35, tw: false },
  { x: 32.3, y: 68.3, s: 1.5, op: 0.58, tw: false },
  { x: 39.8, y: 79.7, s: 1.0, op: 0.45, tw: false },
  { x: 46.5, y: 85.2, s: 2.0, op: 0.80, tw: true  },
  { x: 53.9, y: 73.8, s: 1.0, op: 0.33, tw: false },
  { x: 60.4, y: 88.4, s: 1.5, op: 0.62, tw: false },
  { x: 67.1, y: 77.2, s: 1.0, op: 0.40, tw: false },
  { x: 74.6, y: 91.6, s: 2.5, op: 0.86, tw: true  },
  { x: 81.3, y: 80.9, s: 1.0, op: 0.35, tw: false },
  { x: 88.8, y: 70.3, s: 1.5, op: 0.55, tw: false },
  { x: 96.2, y: 86.7, s: 1.0, op: 0.42, tw: false },
  { x:  6.7, y: 93.5, s: 1.0, op: 0.38, tw: false },
  { x: 15.2, y: 96.8, s: 1.5, op: 0.65, tw: false },
  { x: 22.8, y: 89.1, s: 2.0, op: 0.75, tw: true  },
  { x: 29.4, y: 94.4, s: 1.0, op: 0.30, tw: false },
  { x: 36.9, y: 98.2, s: 1.5, op: 0.58, tw: false },
  { x: 43.5, y: 92.7, s: 1.0, op: 0.42, tw: false },
  { x: 49.8, y: 97.5, s: 1.0, op: 0.35, tw: false },
  { x: 56.7, y: 95.1, s: 2.0, op: 0.78, tw: true  },
  { x: 63.0, y: 90.5, s: 1.0, op: 0.40, tw: false },
  { x: 70.4, y: 98.8, s: 1.5, op: 0.60, tw: false },
  { x: 77.8, y: 94.2, s: 1.0, op: 0.33, tw: false },
  { x: 84.5, y: 97.0, s: 2.5, op: 0.85, tw: true  },
  { x: 91.9, y: 92.4, s: 1.0, op: 0.45, tw: false },
  { x: 18.3, y: 40.6, s: 1.5, op: 0.55, tw: false },
  { x: 52.4, y: 17.9, s: 1.0, op: 0.38, tw: false },
  { x: 77.1, y: 44.8, s: 1.5, op: 0.62, tw: true  },
  { x: 35.0, y: 66.5, s: 1.0, op: 0.40, tw: false },
  { x: 90.6, y: 48.2, s: 1.0, op: 0.35, tw: false },
];

const SF_STARS = [
  { top: "12%", left: "4%",  s: 1.5, op: 0.85, tw: true  },
  { top: "7%",  left: "17%", s: 1,   op: 0.55, tw: false },
  { top: "68%", left: "7%",  s: 2,   op: 0.80, tw: true  },
  { top: "82%", left: "22%", s: 1,   op: 0.40, tw: false },
  { top: "22%", left: "38%", s: 1.5, op: 0.50, tw: false },
  { top: "55%", left: "10%", s: 1,   op: 0.35, tw: false },
  { top: "88%", left: "48%", s: 1.5, op: 0.65, tw: true  },
  { top: "6%",  left: "62%", s: 1,   op: 0.50, tw: false },
  { top: "38%", left: "78%", s: 2,   op: 0.75, tw: true  },
  { top: "75%", left: "72%", s: 1,   op: 0.40, tw: false },
  { top: "18%", left: "88%", s: 1.5, op: 0.70, tw: false },
  { top: "50%", left: "93%", s: 1,   op: 0.45, tw: false },
  { top: "30%", left: "55%", s: 1,   op: 0.30, tw: false },
  { top: "62%", left: "43%", s: 2.5, op: 0.90, tw: true  },
  { top: "90%", left: "85%", s: 1,   op: 0.50, tw: false },
  { top: "44%", left: "29%", s: 1,   op: 0.35, tw: false },
  { top: "15%", left: "50%", s: 1,   op: 0.45, tw: false },
  { top: "78%", left: "60%", s: 1.5, op: 0.60, tw: true  },
  { top: "35%", left: "96%", s: 1,   op: 0.40, tw: false },
  { top: "5%",  left: "82%", s: 2,   op: 0.80, tw: true  },
  { top: "58%", left: "25%", s: 1,   op: 0.30, tw: false },
  { top: "25%", left: "70%", s: 1,   op: 0.50, tw: false },
  { top: "92%", left: "12%", s: 1.5, op: 0.55, tw: false },
  { top: "46%", left: "65%", s: 1,   op: 0.35, tw: false },
];

const NumberCounter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const step = value / (duration * 60);
      const timer = setInterval(() => {
        start += step;
        if (start >= value) {
          setCurrent(value);
          clearInterval(timer);
        } else {
          setCurrent(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{current}</span>;
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const rotateAsterisk = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const superfastLetters = useMemo(() => "Superfast".split(""), []);
  const [superfastHovered, setSuperfastHovered] = useState(false);

  const sfBoxRef = useRef<HTMLSpanElement>(null);
  const sfRawX = useMotionValue(0);
  const sfRawY = useMotionValue(0);
  const sfX = useSpring(sfRawX, { stiffness: 500, damping: 20 });
  const sfY = useSpring(sfRawY, { stiffness: 500, damping: 20 });

  const handleSfMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!sfBoxRef.current) return;
    const rect = sfBoxRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    sfRawX.set(relX * 55);
    sfRawY.set(relY * 30);
  };

  const handleSfMouseLeave = () => {
    sfRawX.set(0);
    sfRawY.set(0);
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const mouseXSpring = useSpring(mousePosition.x * 100, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(mousePosition.y * 100, { stiffness: 50, damping: 20 });

  const [chatMessages, setChatMessages] = useState<string[]>([]);
  
  useEffect(() => {
    const messages = ["Hello!", "How can I help?", "AI is amazing."];
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setChatMessages(prev => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [activeClient, setActiveClient] = useState(0);
  const clients = [
    { name: "DGKI", quote: "Anantify transformed our entire operation. Their AI solutions are unparalleled.", role: "Tobias Hintelmann, CTO Captain" },
    { name: "Scrapper", quote: "The speed at which they deliver complex models is mind-blowing.", role: "Sarah Jenkins, VP Engineering" },
    { name: "KidCash", quote: "A true partner in innovation. They don't just build, they invent.", role: "Michael Chang, Founder" },
    { name: "ShotShot", quote: "Our retention doubled after integrating their predictive algorithms.", role: "Elena Rodriguez, Head of Product" },
    { name: "CloudNex", quote: "The workflow automation saved us thousands of hours in the first quarter.", role: "David Foster, Operations Director" },
    { name: "DataFlow", quote: "Best-in-class LLM fine-tuning. Period.", role: "Amanda White, Lead Data Scientist" },
  ];

  return (
    <div className="w-full bg-black font-sans selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden">
        {/* Deep space animated background */}
        <div className="absolute inset-0" style={{ background: "#080c1c" }}>
          {/* Deep navy base gradient — matches cosmic starfield depth */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, #0d1535 0%, #07091e 50%, #050714 100%)" }} />

          {/* Nebula depth blobs — very subtle, kept behind stars */}
          <motion.div
            animate={{ x: [0, 40, -20, 0], y: [0, -25, 35, 0], scale: [1, 1.15, 0.92, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/5 w-[32rem] h-[32rem] rounded-full blur-[140px]"
            style={{ background: "rgba(30,50,130,0.18)" }}
          />
          <motion.div
            animate={{ x: [0, -35, 55, 0], y: [0, 45, -20, 0], scale: [1, 1.2, 0.85, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 3 }}
            className="absolute bottom-1/4 right-1/5 w-[28rem] h-[28rem] rounded-full blur-[160px]"
            style={{ background: "rgba(50,30,120,0.14)" }}
          />

          {/* Star field */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {HERO_STARS.map((star, i) =>
              star.tw ? (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.s,
                    height: star.s,
                    boxShadow: star.s >= 2 ? `0 0 ${star.s * 2}px ${star.s}px rgba(180,200,255,0.5)` : "none",
                  }}
                  animate={{ opacity: [star.op, star.op * 0.2, star.op] }}
                  transition={{
                    duration: 2.2 + (i % 6) * 0.65,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 9) * 0.45,
                  }}
                />
              ) : (
                <span
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.s,
                    height: star.s,
                    opacity: star.op,
                  }}
                />
              )
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center pt-20 pb-10">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-200 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.03)] mb-8 hover:bg-white/10 transition-colors"
          >
            <Trophy className="h-4 w-4 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Your imagination, our AI tool.</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.8rem] font-extrabold text-white tracking-tighter leading-[1.1] max-w-5xl mx-auto text-center"
          >
            <span className="block font-light tracking-tight opacity-90">
              We build <span className="font-extrabold opacity-100">AI tools</span> at
            </span>
            <span className="block">
              <motion.span
                ref={sfBoxRef}
                onHoverStart={() => setSuperfastHovered(true)}
                onHoverEnd={() => setSuperfastHovered(false)}
                onMouseMove={handleSfMouseMove}
                onMouseLeave={handleSfMouseLeave}
                className="relative inline-flex items-center cursor-default select-none border border-indigo-500/50 px-5 py-2 mx-1 overflow-hidden"
                style={{
                  background: "radial-gradient(ellipse at 40% 50%, #0e1640 0%, #080d24 45%, #040816 100%)",
                  boxShadow: "inset 0 0 40px rgba(10,15,50,0.9), 0 0 0 1px rgba(100,120,255,0.18), 0 0 18px rgba(60,80,200,0.15)",
                }}
              >
                {/* Cosmic starfield */}
                <span className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  {SF_STARS.map((star, i) =>
                    star.tw ? (
                      <motion.span
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                          top: star.top,
                          left: star.left,
                          width: star.s,
                          height: star.s,
                        }}
                        animate={{ opacity: [star.op, star.op * 0.25, star.op] }}
                        transition={{
                          duration: 2.4 + (i % 5) * 0.7,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: (i % 7) * 0.5,
                        }}
                      />
                    ) : (
                      <span
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                          top: star.top,
                          left: star.left,
                          width: star.s,
                          height: star.s,
                          opacity: star.op,
                        }}
                      />
                    )
                  )}
                </span>

                {/* Wind streaks — remount on hover to switch speeds */}
                <span
                  key={superfastHovered ? "wind-fast" : "wind-slow"}
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  aria-hidden="true"
                >
                  {[
                    { top: "12%",  h: "1px",   w: "52%", op: 0.35, durS: 2.0, durF: 0.55, delS: 0.0,  delF: 0.00 },
                    { top: "28%",  h: "1.5px", w: "78%", op: 0.50, durS: 1.5, durF: 0.45, delS: 0.35, delF: 0.12 },
                    { top: "47%",  h: "2px",   w: "88%", op: 0.60, durS: 1.1, durF: 0.38, delS: 0.15, delF: 0.05 },
                    { top: "64%",  h: "1.5px", w: "65%", op: 0.45, durS: 1.7, durF: 0.50, delS: 0.55, delF: 0.18 },
                    { top: "80%",  h: "1px",   w: "42%", op: 0.30, durS: 2.3, durF: 0.62, delS: 0.75, delF: 0.08 },
                    { top: "38%",  h: "1px",   w: "35%", op: 0.22, durS: 2.6, durF: 0.70, delS: 0.90, delF: 0.22 },
                  ].map((s, i) => (
                    <motion.span
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        top: s.top,
                        height: s.h,
                        width: s.w,
                        opacity: s.op,
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(200,220,255,0.9) 40%, rgba(220,235,255,0.6) 65%, transparent 100%)",
                      }}
                      initial={{ left: "-100%" }}
                      animate={{ left: "220%" }}
                      transition={{
                        duration: superfastHovered ? s.durF : s.durS,
                        delay: superfastHovered ? s.delF : s.delS,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}
                </span>

                {/* Shooting stars — right-to-left, hover only */}
                <span
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  aria-hidden="true"
                >
                  <AnimatePresence>
                    {superfastHovered && [
                      { top: "18%", h: "2px",   w: 120, del: 0.00, rep: 0.5  },
                      { top: "44%", h: "2.5px", w: 160, del: 0.22, rep: 0.55 },
                      { top: "70%", h: "1.5px", w: 95,  del: 0.10, rep: 0.6  },
                      { top: "32%", h: "1px",   w: 75,  del: 0.35, rep: 0.5  },
                    ].map((star, i) => (
                      <motion.span
                        key={i}
                        className="absolute"
                        style={{
                          top: star.top,
                          height: star.h,
                          width: star.w,
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(147,210,255,0.65) 38%, transparent 100%)",
                          borderRadius: "9999px",
                        }}
                        initial={{ left: "110%", opacity: 0 }}
                        animate={{
                          left: "-150%",
                          opacity: [0, 1, 1, 0],
                        }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        transition={{
                          duration: 0.55,
                          delay: star.del,
                          repeat: Infinity,
                          repeatDelay: star.rep,
                          ease: "easeIn",
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </span>

                {/* Drifting colored star-dots — hover only, slow left-to-right drift */}
                <span
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  aria-hidden="true"
                >
                  <AnimatePresence>
                    {superfastHovered && [
                      { top: "10%", color: "#ff3333", s: 4.0, del: 0.0,  dur: 4.2, rdel: 0.9 },
                      { top: "24%", color: "#4488ff", s: 4.5, del: 0.7,  dur: 5.0, rdel: 0.6 },
                      { top: "40%", color: "#ffffff", s: 3.5, del: 1.4,  dur: 3.6, rdel: 1.1 },
                      { top: "57%", color: "#ffcc00", s: 4.5, del: 0.3,  dur: 4.8, rdel: 0.5 },
                      { top: "72%", color: "#ff3333", s: 3.5, del: 1.0,  dur: 3.9, rdel: 0.8 },
                      { top: "85%", color: "#4488ff", s: 3.5, del: 1.8,  dur: 5.3, rdel: 0.4 },
                      { top: "17%", color: "#ffcc00", s: 4.0, del: 2.2,  dur: 3.7, rdel: 1.2 },
                      { top: "63%", color: "#ffffff", s: 3.5, del: 0.5,  dur: 4.5, rdel: 0.7 },
                      { top: "33%", color: "#ff3333", s: 4.0, del: 2.8,  dur: 4.0, rdel: 1.0 },
                      { top: "48%", color: "#ffcc00", s: 4.5, del: 1.6,  dur: 5.5, rdel: 0.3 },
                    ].map((dot, i) => (
                      <motion.span
                        key={i}
                        className="absolute rounded-full"
                        style={{
                          top: dot.top,
                          width: dot.s,
                          height: dot.s,
                          background: dot.color,
                          boxShadow: `0 0 ${dot.s * 2.5}px ${dot.s * 2}px ${dot.color}90`,
                        }}
                        initial={{ left: "-4%", opacity: 0 }}
                        animate={{ left: "106%", opacity: [0, 1, 1, 0] }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        transition={{
                          duration: dot.dur,
                          delay: dot.del,
                          repeat: Infinity,
                          repeatDelay: dot.rdel,
                          ease: "linear",
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </span>

                {/* Text — follows cursor within box, shrinks slightly on hover */}
                <motion.span
                  className="relative z-10 font-extrabold italic text-white tracking-tight"
                  style={{ x: sfX, y: sfY }}
                  animate={{ scale: superfastHovered ? 0.72 : 1 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Superfast
                </motion.span>
              </motion.span>
              <span className="font-light tracking-tight opacity-90"> speed.</span>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="max-w-2xl mx-auto text-sm md:text-base text-slate-400 leading-relaxed mt-4 font-light"
          >
            We specialize in crafting custom AI tools designed to address your unique business challenges, driving innovation and growth.
            <span className="block mt-4 text-white/80 font-normal">Let us empower your business with intelligent solutions that make a real impact.</span>
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-8 relative group"
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
            <Link href="/contact">
              <Button size="lg" className="relative bg-white hover:bg-slate-100 text-black border-0 text-base px-10 py-6 rounded-full font-bold uppercase tracking-wide transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Transformation & Stats (Cream/Warm White) */}
      <section className="py-6 bg-[#faf9f6] text-slate-900 relative overflow-hidden">
        {/* Subtle dot texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Col - Visuals */}
            <div className="relative h-full min-h-[500px] flex items-center justify-center">
              <motion.div 
                animate={{ y: [-20, 20, -20] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white rounded-[3rem] p-16 border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.05)] relative z-10 w-4/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-[3rem]"></div>
                <Rocket className="w-40 h-40 text-blue-600 mx-auto relative drop-shadow-xl" strokeWidth={1.5} />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl absolute bottom-0 left-0 w-4/5 z-20 border border-slate-800 backdrop-blur-xl bg-slate-900/95"
              >
                <div className="flex items-start gap-5">
                  <div className="bg-green-500/20 p-3 rounded-2xl shrink-0">
                    <CheckCircle2 className="text-green-400 w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Ready to launch?</h4>
                    <p className="text-slate-400 text-base">Our team is ready to work with you.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Col - Accordion */}
            <div className="relative">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-extrabold mb-8 leading-[1.1] tracking-tight text-slate-900"
              >
                Transform your business with <span className="text-blue-600">AI-driven</span> solutions.
              </motion.h2>
              
              <div className="space-y-6 relative z-10">
                {[
                  { id: 0, title: "Research And Strategy", content: "Transform the way you approach innovation with deep market research and AI-powered insights tailored to your industry." },
                  { id: 1, title: "Design And Development", content: "Create stunning, user-centric digital experiences seamlessly integrated with powerful backend artificial intelligence." },
                  { id: 2, title: "Maintenance And Support", content: "Keep your AI tools running smoothly with our comprehensive maintenance and support services ensuring 99.9% uptime." }
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={item.id} 
                    className={`border-b-2 transition-colors duration-300 ${activeAccordion === item.id ? 'border-blue-600' : 'border-slate-200'} bg-white rounded-3xl overflow-hidden shadow-sm`}
                  >
                    <button 
                      className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                      onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                    >
                      <div className="flex items-center gap-6">
                        <span className={`text-sm font-bold tracking-widest ${activeAccordion === item.id ? 'text-blue-600' : 'text-slate-400'}`}>
                          0{item.id + 1}
                        </span>
                        <span className={`font-bold text-lg tracking-tight transition-colors ${activeAccordion === item.id ? 'text-slate-900' : 'text-slate-600'}`}>
                          {item.title}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: activeAccordion === item.id ? 45 : 0 }}
                        className={`p-2 rounded-full ${activeAccordion === item.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}
                      >
                        <Plus className="w-5 h-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {activeAccordion === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden bg-white"
                        >
                          <div className="p-5 pt-0 pl-16 text-slate-500 text-sm leading-relaxed">
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-16 relative">
            <motion.div style={{ rotate: rotateAsterisk }} className="absolute -top-32 right-10 opacity-5 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor" className="text-blue-900">
                <path d="M45,0 h10 v40 h35 v10 h-35 v40 h-10 v-40 h-35 v-10 h35 z" transform="rotate(45 50 50)" />
                <path d="M45,0 h10 v40 h35 v10 h-35 v40 h-10 v-40 h-35 v-10 h35 z" />
              </svg>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-200/60">
              <div className="flex flex-col">
                <div className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-black text-slate-900 tracking-tighter leading-none mb-3 flex items-baseline">
                  <NumberCounter value={200} /><span className="text-blue-600 text-[2.5rem] ml-1">+</span>
                </div>
                <div className="text-lg font-bold text-slate-800 mb-2 tracking-tight">Projects Completed</div>
                <p className="text-slate-500 text-sm leading-relaxed">Delivering excellence across various industries globally.</p>
              </div>
              <div className="flex flex-col">
                <div className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-black text-slate-900 tracking-tighter leading-none mb-3 flex items-baseline">
                  <NumberCounter value={50} /><span className="text-blue-600 text-[2.5rem] ml-1">+</span>
                </div>
                <div className="text-lg font-bold text-slate-800 mb-2 tracking-tight">Satisfied Clients</div>
                <p className="text-slate-500 text-sm leading-relaxed">Building long-term partnerships through trust and quality.</p>
              </div>
              <div className="flex flex-col">
                <div className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-black text-slate-900 tracking-tighter leading-none mb-3 flex items-baseline">
                  <NumberCounter value={15} /><span className="text-blue-600 text-[2.5rem] ml-1">+</span>
                </div>
                <div className="text-lg font-bold text-slate-800 mb-2 tracking-tight">Years of Expertise</div>
                <p className="text-slate-500 text-sm leading-relaxed">Combined team experience in software and AI architecture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Services Showcase */}
      <section className="py-20 bg-[#020617] relative overflow-hidden">
        {/* Abstract glowing background */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent blur-[100px] pointer-events-none"></div>
        <div className="absolute -left-[20%] top-[20%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -right-[20%] bottom-[20%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-12 max-w-5xl tracking-tighter leading-[1.05]"
          >
            Breathing New Life Into Ideas and Systems With Technology That Works <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Faster, Smarter, and Better.</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            
            {/* 1. Chatbot */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-md hover:bg-slate-800/60 transition-all duration-500 group flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
              
              <div className="h-48 bg-[#0a0f1c] rounded-3xl mb-10 p-5 flex flex-col justify-end gap-3 overflow-hidden border border-white/5 shadow-inner">
                {chatMessages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={`text-sm px-4 py-2.5 rounded-2xl w-max max-w-[85%] shadow-sm ${i % 2 === 0 ? 'bg-slate-800 text-white self-start rounded-bl-sm' : 'bg-blue-600 text-white self-end rounded-br-sm'}`}
                  >
                    {msg}
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500 group-hover:bg-blue-500/20">
                  <MessageSquare className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Chatbot Development</h3>
                <p className="text-slate-400 text-base leading-relaxed">Custom conversational interfaces powered by advanced LLMs for customer support and internal ops.</p>
              </div>
            </motion.div>
            
            {/* 2. AI Content */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-md hover:bg-slate-800/60 transition-all duration-500 group flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>

              <div className="h-48 bg-[#0a0f1c] rounded-3xl mb-10 p-8 flex flex-col gap-4 justify-center border border-white/5 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] animate-[shimmer_2s_infinite]"></div>
                <div className="h-3 bg-slate-800 rounded-full w-3/4"></div>
                <div className="h-3 bg-slate-800 rounded-full w-full"></div>
                <div className="h-3 bg-slate-800 rounded-full w-5/6"></div>
                <div className="h-3 bg-slate-800 rounded-full w-4/6 mt-2"></div>
              </div>
              <div className="mt-auto">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500 group-hover:bg-purple-500/20">
                  <Edit3 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">AI Content Writing</h3>
                <p className="text-slate-400 text-base leading-relaxed">Automated content generation systems fine-tuned to your brand voice and SEO requirements.</p>
              </div>
            </motion.div>

            {/* 3. Workflow */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-md hover:bg-slate-800/60 transition-all duration-500 group flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>

              <div className="h-48 bg-[#0a0f1c] rounded-3xl mb-10 p-6 relative border border-white/5 shadow-inner">
                <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-8 left-8 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"><Settings className="w-6 h-6 text-emerald-400"/></motion.div>
                <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-8 right-8 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20"><Database className="w-6 h-6 text-blue-400"/></motion.div>
                <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><Activity className="w-10 h-10 text-white/40"/></motion.div>
              </div>
              <div className="mt-auto">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500 group-hover:bg-emerald-500/20">
                  <Settings className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Workflow Automation</h3>
                <p className="text-slate-400 text-base leading-relaxed">Streamline operations with intelligent AI-driven processes that eliminate manual tasks.</p>
              </div>
            </motion.div>

            {/* 4. LLM */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-md hover:bg-slate-800/60 transition-all duration-500 lg:col-span-2 group flex flex-col md:flex-row gap-12 items-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-transparent pointer-events-none"></div>

              <div className="w-full md:w-[55%] h-64 bg-black rounded-3xl p-8 font-mono text-green-400 text-sm border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group-hover:border-slate-700 transition-colors">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-500/50 to-transparent"></div>
                <div className="space-y-2 opacity-90">
                  <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 border-b border-slate-800 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2">terminal — bash</span>
                  </div>
                  <div><span className="text-blue-400 font-bold">root@anantify:~$</span> train_model --dataset=enterprise.csv</div>
                  <div className="text-slate-400">Loading weights... [██████████] 100%</div>
                  <div className="text-yellow-400">Optimizing parameters...</div>
                  <div className="text-green-500">Model accuracy: 99.8%</div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-blue-400 font-bold">root@anantify:~$</span>
                  <motion.div animate={{ opacity: [1,0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2.5 h-5 bg-green-400 ml-2"></motion.div>
                </div>
              </div>
              <div className="w-full md:w-[45%]">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500">
                  <Database className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">LLM Development</h3>
                <p className="text-slate-400 text-lg leading-relaxed">Custom model training and fine-tuning for specific enterprise use cases. Building secure, private infrastructure that keeps your data safe.</p>
              </div>
            </motion.div>

            {/* 5. Consulting */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-md hover:bg-slate-800/60 transition-all duration-500 group flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>

              <div className="h-64 w-full bg-[#0a0f1c] rounded-3xl mb-8 p-6 border border-white/5 shadow-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={4} dot={false} animationDuration={2000} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-auto">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500 group-hover:bg-cyan-500/20">
                  <Activity className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">AI Consulting</h3>
                <p className="text-slate-400 text-base leading-relaxed">Strategic guidance to integrate AI effectively into your business roadmap.</p>
              </div>
            </motion.div>
          </div>

          {/* CTA Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-[3rem] border border-blue-500/30 p-10 md:p-14 text-center relative group overflow-hidden backdrop-blur-xl"
          >
            {/* Glowing mesh background for CTA */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
              <div className="w-24 h-24 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(250,204,21,0.2)]">
                <Lightbulb className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
              </div>
            </motion.div>
            
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight relative z-10">If You Have Any Idea We'll Help You</h3>
            <p className="text-yellow-400 font-bold tracking-[0.3em] text-sm mb-8 relative z-10">LET'S CONNECT..!</p>
            
            <Link href="/contact">
              <Button size="lg" className="relative z-10 bg-white hover:bg-slate-100 text-black text-lg px-12 py-8 rounded-full font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                Hire AI Expert
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Engineering Services Grid */}
      <section className="py-10 bg-[#060a16] border-t border-white/5 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 border-b border-white/10 pb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white max-w-3xl leading-[1.05] tracking-tighter">
              Exploring New Horizons with <span className="text-slate-500">Cutting-Edge Engineering</span>
            </h2>
            <p className="text-slate-400 max-w-md text-base font-light leading-relaxed">
              Whether you are starting fresh or revamping an existing system, we build robust software solutions that scale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {["Mobile App Development", "Software Development", "MVP Development", "Superfast POC", "Web Development", "Ideation and Design Strategy", "IT Consulting"].map((service, i) => (
              <motion.div 
                key={service}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0b1121] p-10 rounded-3xl border border-white/5 hover:border-blue-500/50 hover:bg-[#0f172a] transition-all duration-500 group shadow-lg flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex justify-between items-start mb-12">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-500 shadow-[0_0_15px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                    <CheckCircle2 className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-3xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                    0{i + 1}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors tracking-tight mt-auto">{service}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">High-performance engineering for modern businesses looking to scale rapidly.</p>
              </motion.div>
            ))}
            
            <Link href="/services">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
                className="bg-blue-600 p-10 rounded-3xl border border-blue-500 hover:bg-blue-500 transition-all duration-500 cursor-pointer h-full flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(37,99,235,0.3)] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                  <ArrowUpRight className="h-10 w-10 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight">All Services</h3>
              </motion.div>
            </Link>
          </div>

          {/* Let's Build Together Section */}
          <div className="bg-white rounded-[4rem] p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 relative overflow-hidden shadow-2xl">
            {/* Parallax shapes */}
            <motion.div style={{ x: mouseXSpring, y: mouseYSpring }} className="absolute right-10 top-10 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 pointer-events-none"></motion.div>
            <motion.div style={{ x: useTransform(mouseXSpring, v => -v), y: useTransform(mouseYSpring, v => -v) }} className="absolute right-40 top-40 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 pointer-events-none"></motion.div>

            <div className="relative z-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-5 leading-[1.05] tracking-tighter">Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Together</span></h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6 font-light">
                Our cross-functional teams bring deep expertise across multiple domains to turn your vision into reality. We handle the complexity so you can focus on growth.
              </p>

              {/* Floating Animation Area */}
              <div className="relative flex-1 min-h-[200px] my-4 overflow-hidden rounded-2xl">
                {/* Subtle grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f010_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f010_1px,transparent_1px)] bg-[size:28px_28px]" />

                {/* SVG network lines */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <motion.line x1="18%" y1="20%" x2="50%" y2="50%" stroke="url(#netGrad)" strokeWidth="1" strokeDasharray="4 4"
                    animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                  <motion.line x1="82%" y1="18%" x2="50%" y2="50%" stroke="url(#netGrad)" strokeWidth="1" strokeDasharray="4 4"
                    animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
                  <motion.line x1="50%" y1="50%" x2="25%" y2="80%" stroke="url(#netGrad)" strokeWidth="1" strokeDasharray="4 4"
                    animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
                  <motion.line x1="50%" y1="50%" x2="78%" y2="78%" stroke="url(#netGrad)" strokeWidth="1" strokeDasharray="4 4"
                    animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} />
                  <defs>
                    <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#9333ea" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Central pulsing node */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[42%] left-[44%] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white opacity-80" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-blue-400/30"
                  />
                </motion.div>

                {/* Floating nodes */}
                {[
                  { label: "AI", x: "14%", y: "16%", color: "from-blue-500 to-blue-600", delay: 0 },
                  { label: "ML", x: "76%", y: "12%", color: "from-purple-500 to-purple-600", delay: 0.6 },
                  { label: "Cloud", x: "20%", y: "74%", color: "from-cyan-500 to-blue-500", delay: 1.2 },
                  { label: "LLM", x: "72%", y: "72%", color: "from-indigo-500 to-purple-500", delay: 0.9 },
                ].map((node) => (
                  <motion.div
                    key={node.label}
                    style={{ left: node.x, top: node.y }}
                    animate={{ y: [0, -8, 0], opacity: [0.75, 1, 0.75] }}
                    transition={{ duration: 3 + parseFloat(node.delay.toString()), repeat: Infinity, ease: "easeInOut", delay: node.delay }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${node.color} shadow-lg flex items-center gap-1.5`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      <span className="text-white text-xs font-bold tracking-wide">{node.label}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Small floating orbs */}
                {[
                  { x: "60%", y: "28%", size: "w-2 h-2", color: "bg-blue-400", delay: 0.3 },
                  { x: "35%", y: "58%", size: "w-1.5 h-1.5", color: "bg-purple-400", delay: 1.1 },
                  { x: "88%", y: "46%", size: "w-2 h-2", color: "bg-cyan-400", delay: 0.7 },
                  { x: "10%", y: "46%", size: "w-1.5 h-1.5", color: "bg-indigo-400", delay: 1.5 },
                ].map((orb, i) => (
                  <motion.div
                    key={i}
                    style={{ left: orb.x, top: orb.y }}
                    animate={{ y: [0, -10, 0], scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
                    className={`absolute ${orb.size} rounded-full ${orb.color} shadow-[0_0_8px_currentColor]`}
                  />
                ))}
              </div>

              {/* Geometric decorative elements */}
              <div className="flex gap-6 mt-auto">
                <div className="w-16 h-16 rounded-full border-2 border-blue-600/20 flex items-center justify-center"><div className="w-2 h-2 bg-blue-600 rounded-full"></div></div>
                <div className="w-16 h-16 rounded-2xl border-2 border-purple-600/20 rotate-12 flex items-center justify-center"><div className="w-2 h-2 bg-purple-600 rounded-full"></div></div>
                <div className="w-16 h-16 rounded-tl-3xl rounded-br-3xl bg-slate-100 flex items-center justify-center"><Plus className="text-slate-400 w-6 h-6"/></div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex flex-col gap-0 border-t border-slate-200">
                {[
                  { icon: Bot, title: "Artificial Intelligence", subtitle: "Machine learning, NLP, predictive modeling", color: "blue" },
                  { icon: Wifi, title: "Internet of Things", subtitle: "Connected devices and smart systems", color: "emerald" },
                  { icon: Pencil, title: "Product Design", subtitle: "User research, UX/UI, prototyping", color: "purple" },
                  { icon: Cloud, title: "Cloud & DevOps", subtitle: "AWS, Azure, CI/CD, scalable infra", color: "cyan" },
                  { icon: Lightbulb, title: "Product Discovery", subtitle: "Strategy, market analysis, ideation", color: "amber" }
                ].map((item, i) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 py-4 border-b border-slate-200 group cursor-pointer"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-${item.color}-50 transition-colors duration-300`}>
                      <item.icon className={`w-8 h-8 text-slate-400 group-hover:text-${item.color}-500 transition-colors duration-300`} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                      <p className="text-slate-500 font-light">{item.subtitle}</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowUpRight className="w-6 h-6 text-blue-600" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Real Experiences (Pitch Black) */}
      <section className="py-10 bg-black relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-12 tracking-tighter"
          >
            Real Experiences. <span className="text-slate-600">Real Results</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Featured Testimonial (40%) */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-40">
                <div className="text-blue-600 opacity-20 absolute -top-16 -left-10 text-[15rem] leading-none font-serif select-none pointer-events-none">"</div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeClient}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight tracking-tight">
                      {clients[activeClient].quote}
                    </h3>
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-sm opacity-50"></div>
                        <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 relative z-10 flex items-center justify-center text-xl font-bold text-slate-300">
                          {clients[activeClient].name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white mb-1">{clients[activeClient].name}</div>
                        <div className="text-blue-400 font-medium">{clients[activeClient].role}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Client Grid (60%) */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {clients.map((client, idx) => (
                  <motion.div
                    key={client.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveClient(idx)}
                    className={`cursor-pointer p-3 md:p-4 rounded-2xl border transition-all duration-300 flex items-center justify-center text-center ${
                      activeClient === idx 
                        ? 'bg-blue-600 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.3)] scale-105 z-10' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span className={`text-sm md:text-base font-black tracking-widest ${activeClient === idx ? 'text-white' : 'text-slate-500'}`}>
                      {client.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
