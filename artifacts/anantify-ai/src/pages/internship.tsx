import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Plus, X, Upload, ChevronDown, Search, CheckCircle2,
  Loader2, AlertCircle, Trash2, FileText, User, Mail,
  Briefcase, Clock, Paperclip, ArrowRight, Sparkles, Code2, Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── constants ─── */
const SKILL_SUGGESTIONS = [
  "Node.js","React.js","Next.js","FastAPI","NestJS","Java Backend",
  "Tailwind","TypeScript","Angular","Python","Data Science",
  "Data Analyst","JavaScript","HTML5","CSS3","Figma","MERN",
];
const DURATION_OPTIONS = ["1 Month","3 Months","6 Months","1 Year","2 Years"];

interface PrevInternship {
  id: number; company: string; duration: string; certFile: File | null;
}

/* ─── animated bg ─── */
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute inset-0 bg-[#020d1f]" />
      <motion.div className="absolute rounded-full"
        style={{ width:800, height:800, background:"radial-gradient(circle,rgba(29,78,216,0.16) 0%,transparent 70%)", top:"-20%", left:"-15%" }}
        animate={{ x:[0,70,-40,0], y:[0,50,90,0] }}
        transition={{ duration:24, repeat:Infinity, ease:"easeInOut" }} />
      <motion.div className="absolute rounded-full"
        style={{ width:600, height:600, background:"radial-gradient(circle,rgba(6,182,212,0.12) 0%,transparent 70%)", bottom:"0%", right:"-8%" }}
        animate={{ x:[0,-60,25,0], y:[0,-70,-20,0] }}
        transition={{ duration:20, repeat:Infinity, ease:"easeInOut", delay:3 }} />
      <motion.div className="absolute rounded-full"
        style={{ width:450, height:450, background:"radial-gradient(circle,rgba(99,102,241,0.10) 0%,transparent 70%)", top:"38%", left:"42%" }}
        animate={{ x:[0,80,-45,0], y:[0,-55,35,0] }}
        transition={{ duration:28, repeat:Infinity, ease:"easeInOut", delay:6 }} />
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.022]" style={{
        backgroundImage:"linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)",
        backgroundSize:"56px 56px",
      }} />
      {/* floating dots */}
      {Array.from({length:20}).map((_,i) => (
        <motion.div key={i} className="absolute rounded-full bg-blue-400"
          style={{ width:i%4===0?3:2, height:i%4===0?3:2,
            opacity:0.18+(i%5)*0.07,
            left:`${4+(i*311)%92}%`, top:`${6+(i*237)%86}%` }}
          animate={{ y:[0,-20,0], opacity:[0.12,0.55,0.12] }}
          transition={{ duration:3.5+(i%5)*0.8, repeat:Infinity, ease:"easeInOut", delay:(i*0.35)%4 }} />
      ))}
    </div>
  );
}

/* ─── animated section block ─── */
function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

/* ─── skill selector ─── */
function SkillSelector({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = query.trim()
    ? SKILL_SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()) && !selected.includes(s))
    : [];
  const showAdd = query.trim() &&
    !SKILL_SUGGESTIONS.map(s => s.toLowerCase()).includes(query.trim().toLowerCase()) &&
    !selected.includes(query.trim());

  const add = (skill: string) => {
    const t = skill.trim();
    if (t && !selected.includes(t)) onChange([...selected, t]);
    setQuery(""); setOpen(false);
  };
  const remove = (skill: string) => onChange(selected.filter(s => s !== skill));
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && query.trim()) {
      e.preventDefault();
      const m = SKILL_SUGGESTIONS.find(s => s.toLowerCase() === query.trim().toLowerCase());
      add(m ?? query.trim());
    } else if (e.key === "Backspace" && !query && selected.length) remove(selected[selected.length - 1]);
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <div onClick={() => { setOpen(true); inputRef.current?.focus(); }}
        className={`min-h-[52px] flex flex-wrap gap-2 items-center p-3 rounded-xl border bg-white/[0.04] cursor-text transition-all duration-200 ${open ? "border-blue-500/70 ring-2 ring-blue-500/15 shadow-[0_0_22px_rgba(37,99,235,0.18)]" : "border-white/10 hover:border-white/25 hover:bg-white/[0.06]"}`}>
        {selected.map(skill => (
          <motion.span key={skill} initial={{ opacity:0, scale:0.75 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.75 }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600/30 to-cyan-600/20 text-blue-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-400/25 hover:border-blue-400/50 transition-colors">
            {skill}
            <button type="button" onClick={e => { e.stopPropagation(); remove(skill); }}
              className="text-blue-300/50 hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button>
          </motion.span>
        ))}
        <div className="flex items-center gap-2 flex-1 min-w-[120px]">
          <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <input ref={inputRef} type="text" value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onKeyDown={onKey}
            placeholder={selected.length === 0 ? "Type to search skills..." : "Add more..."}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none" />
        </div>
      </div>
      <AnimatePresence>
        {open && (filtered.length > 0 || showAdd) && (
          <motion.div initial={{ opacity:0, y:-8, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-8, scale:0.97 }} transition={{ duration:0.13 }}
            className="absolute z-50 mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] overflow-hidden">
            <div className="max-h-48 overflow-y-auto py-2">
              {filtered.map((s,i) => (
                <motion.button key={s} type="button" initial={{ opacity:0, x:-6 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.03 }}
                  onMouseDown={e => { e.preventDefault(); add(s); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-blue-600/20 hover:text-white hover:pl-5 transition-all duration-150">{s}</motion.button>
              ))}
              {showAdd && (
                <button type="button" onMouseDown={e => { e.preventDefault(); add(query); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-cyan-400 hover:bg-cyan-600/15 transition-all flex items-center gap-2 border-t border-white/5">
                  <Plus className="w-3.5 h-3.5" />Add &ldquo;{query.trim()}&rdquo;
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-xs text-slate-600 mt-1.5 pl-1">Press Enter to confirm a custom skill</p>
    </div>
  );
}

/* ─── duration selector ─── */
function DurationSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between h-10 px-4 rounded-xl border bg-white/[0.04] text-sm transition-all duration-200 ${open ? "border-blue-500/70 ring-2 ring-blue-500/15 shadow-[0_0_22px_rgba(37,99,235,0.18)] text-white" : "border-white/10 hover:border-white/25 hover:bg-white/[0.06]"} ${value ? "text-white" : "text-slate-500"}`}>
        <span>{value || "Select duration..."}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-8, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-8, scale:0.97 }} transition={{ duration:0.13 }}
            className="absolute z-50 mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] overflow-hidden">
            <div className="py-2">
              {DURATION_OPTIONS.map((opt,i) => (
                <motion.button key={opt} type="button" initial={{ opacity:0, x:-6 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.04 }}
                  onMouseDown={e => { e.preventDefault(); onChange(opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center justify-between ${value===opt ? "bg-blue-600/20 text-blue-300" : "text-slate-200 hover:bg-white/5 hover:text-white hover:pl-5"}`}>
                  {opt}{value===opt && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                </motion.button>
              ))}
              <div className="border-t border-white/8 mx-3 my-1" />
              <div className="px-3 pb-2">
                <p className="text-xs text-slate-500 px-1 mb-2">Custom duration</p>
                <div className="flex gap-2">
                  <input type="text" value={custom} onChange={e => setCustom(e.target.value)}
                    onKeyDown={e => { if (e.key==="Enter" && custom.trim()) { onChange(custom.trim()); setOpen(false); setCustom(""); } }}
                    placeholder="e.g. 1 Year 5 Months"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-all" />
                  <button type="button" onMouseDown={e => { e.preventDefault(); if (custom.trim()) { onChange(custom.trim()); setOpen(false); setCustom(""); } }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm rounded-xl transition-all font-semibold">Set</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── file upload ─── */
function FileUploadField({ label, file, onChange, accept }: {
  label: string; file: File | null; onChange: (f: File | null) => void; accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={e => onChange(e.target.files?.[0] ?? null)} />
      <AnimatePresence mode="wait">
        {file ? (
          <motion.div key="filled" initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.96 }}
            className="flex items-center gap-3 h-10 px-4 rounded-xl border border-blue-500/40 bg-gradient-to-r from-blue-600/10 to-cyan-600/5">
            <FileText className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-sm text-blue-200 truncate flex-1">{file.name}</span>
            <button type="button" onClick={() => { onChange(null); if (inputRef.current) inputRef.current.value=""; }}
              className="text-slate-500 hover:text-red-400 transition-colors shrink-0 p-1 hover:bg-red-400/10 rounded-lg"><X className="w-3.5 h-3.5" /></button>
          </motion.div>
        ) : (
          <motion.button key="empty" type="button" onClick={() => inputRef.current?.click()}
            whileHover={{ scale:1.008, borderColor:"rgba(59,130,246,0.5)" }}
            whileTap={{ scale:0.995 }}
            className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] hover:bg-blue-600/5 transition-all duration-200 text-sm text-slate-400 hover:text-blue-300 group">
            <Upload className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />{label}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── field wrapper ─── */
const inputClass = "w-full h-10 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/15 focus:shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:border-white/22 hover:bg-white/[0.06] transition-all duration-200";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="group/f">
      <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-widest group-focus-within/f:text-blue-400 transition-colors duration-200">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── section header ─── */
function SectionHeader({ icon: Icon, label, index }: { icon: React.ElementType; label: React.ReactNode; index: number }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <motion.div
        initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
        transition={{ type:"spring", damping:14, stiffness:200, delay: index * 0.08 }}
        className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-600/15 border border-blue-500/25 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.2)]">
        <Icon className="w-[17px] h-[17px] text-blue-400" />
      </motion.div>
      <span className="text-sm font-bold text-white tracking-wide">{label}</span>
      <motion.div className="flex-1 h-px bg-gradient-to-r from-white/12 to-transparent"
        initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: index * 0.08 + 0.15 }} />
    </div>
  );
}

/* ─── main page ─── */
export default function Internship() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [prevInternships, setPrevInternships] = useState<PrevInternship[]>([]);
  const [nextId, setNextId] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const addPrev = () => { setPrevInternships(p => [...p, {id:nextId,company:"",duration:"",certFile:null}]); setNextId(n => n+1); };
  const removePrev = (id: number) => setPrevInternships(p => p.filter(x => x.id !== id));
  const updatePrev = (id: number, field: keyof Omit<PrevInternship,"id">, val: string | File | null) =>
    setPrevInternships(p => p.map(x => x.id===id ? {...x,[field]:val} : x));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!firstName.trim() || !lastName.trim()) { setError("First name and last name are required."); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    if (!resumeFile) { setError("Please upload your resume before submitting."); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("firstName",firstName.trim()); fd.append("middleName",middleName.trim());
      fd.append("lastName",lastName.trim()); fd.append("email",email.trim());
      fd.append("duration",duration);
      skills.forEach(s => fd.append("skills",s));
      if (resumeFile) fd.append("resume",resumeFile);
      if (description.trim()) fd.append("description",description.trim());
      fd.append("prevInternships",JSON.stringify(prevInternships.map(({company,duration:d}) => ({company,duration:d}))));
      prevInternships.forEach((p,i) => { if (p.certFile) fd.append(`expCert_${i}`,p.certFile); });
      const base = import.meta.env.VITE_API_BASE;
      const res = await fetch(`${base}/internship`,{method:"POST",body:fd});
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.");
    } finally { setSubmitting(false); }
  };

  /* ── success ── */
  if (submitted) {
    return (
      <div className="h-[calc(100vh-64px)] bg-[#020d1f] flex items-center justify-center px-4 relative overflow-hidden">
        <AnimatedBackground />
        <motion.div initial={{ opacity:0, scale:0.88, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
          transition={{ duration:0.5, type:"spring", damping:20 }}
          className="relative z-10 text-center max-w-sm bg-white/[0.04] border border-white/10 rounded-3xl p-12 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.25, type:"spring", damping:12 }}
            className="w-20 h-20 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </motion.div>
          <motion.h2 initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
            className="text-3xl font-black text-white mb-3">Application Sent</motion.h2>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.45 }}
            className="text-slate-400 mb-8 leading-relaxed text-sm">Your internship application has been submitted. We will review it and get back to you shortly.</motion.p>
          <Button onClick={() => { setSubmitted(false); setFirstName(""); setMiddleName(""); setLastName(""); setEmail(""); setSkills([]); setDuration(""); setResumeFile(null); setDescription(""); setPrevInternships([]); }}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0">Submit Another</Button>
        </motion.div>
      </div>
    );
  }

  /* ── main ── */
  return (
    <div className="relative bg-[#020d1f] min-h-screen pt-16">
      <AnimatedBackground />

      {/* Full-height two-column */}
      <div className="relative z-10 flex flex-col lg:flex-row">

        {/* ── LEFT PANEL (30%) ── */}
        <div className="hidden lg:flex lg:w-[30%] xl:w-[28%] shrink-0 flex-col justify-start px-10 xl:px-14 pt-12 pb-12 overflow-hidden relative lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]">
          {/* left panel bg accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-transparent to-transparent pointer-events-none" />
          <div className="absolute right-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-blue-500/25 to-transparent" />

          {/* Top: hero */}
          <div className="relative z-10">
            <motion.span
              initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55 }}
              className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-600/10 rounded-full px-4 py-1.5 text-[11px] font-bold text-blue-300 uppercase tracking-widest mb-7">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-blue-400"
                animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.8, repeat:Infinity }} />
              Join Our Team
            </motion.span>

            <motion.h1
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
              className="text-3xl xl:text-4xl font-black text-white leading-[1.1] mb-5 tracking-tight">
              Build the Future<br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">with AI.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}
              className="text-slate-400 text-sm leading-relaxed mb-4 max-w-xs">
              Anantify AI offers hands-on internships across:
            </motion.p>

            {/* Animated tech stack badges */}
            <div className="flex flex-wrap gap-2 mb-6 max-w-xs">
              {[
                { label:"Java", color:"from-orange-500/20 to-red-500/10", border:"border-orange-500/30", text:"text-orange-300" },
                { label:"MERN", color:"from-green-500/20 to-emerald-500/10", border:"border-green-500/30", text:"text-green-300" },
                { label:"MEAN", color:"from-lime-500/20 to-green-500/10", border:"border-lime-500/30", text:"text-lime-300" },
                { label:"Python", color:"from-yellow-500/20 to-amber-500/10", border:"border-yellow-500/30", text:"text-yellow-300" },
                { label:"Next.js", color:"from-slate-400/20 to-slate-500/10", border:"border-slate-400/30", text:"text-slate-200" },
                { label:"NestJS", color:"from-red-500/20 to-pink-500/10", border:"border-red-500/30", text:"text-red-300" },
                { label:"Spring Boot", color:"from-emerald-500/20 to-teal-500/10", border:"border-emerald-500/30", text:"text-emerald-300" },
                { label:"JPA", color:"from-amber-500/20 to-orange-500/10", border:"border-amber-500/30", text:"text-amber-300" },
                { label:"Microservices", color:"from-sky-500/20 to-blue-500/10", border:"border-sky-500/30", text:"text-sky-300" },
                { label:"SQL", color:"from-blue-500/20 to-indigo-500/10", border:"border-blue-500/30", text:"text-blue-300" },
                { label:"NoSQL", color:"from-violet-500/20 to-purple-500/10", border:"border-violet-500/30", text:"text-violet-300" },
                { label:"AI/ML", color:"from-fuchsia-500/20 to-pink-500/10", border:"border-fuchsia-500/30", text:"text-fuchsia-300" },
                { label:"Prompt Engineering", color:"from-cyan-500/20 to-blue-500/10", border:"border-cyan-500/30", text:"text-cyan-300" },
              ].map(({ label, color, border, text }, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity:0, scale:0.7, y:8 }}
                  animate={{ opacity:1, scale:1, y:0 }}
                  transition={{ delay:0.3 + i * 0.07, type:"spring", damping:14, stiffness:200 }}
                  whileHover={{ scale:1.1, y:-2 }}
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-gradient-to-r ${color} border ${border} ${text} cursor-default shadow-sm`}
                  style={{ boxShadow: undefined }}
                >
                  {label}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }}
              className="text-slate-500 text-xs leading-relaxed mb-6 max-w-xs">
              Real-world experience to launch your tech career.
            </motion.p>

            {/* perks */}
            {[
              { icon:Brain, title:"Real AI Projects", desc:"Production-grade AI tools" },
              { icon:Code2, title:"Mentorship", desc:"Learn from senior engineers" },
              { icon:Sparkles, title:"Certificate", desc:"Certified upon completion" },
            ].map(({ icon:Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity:0, x:-18 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.35+i*0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3.5 mb-5 group cursor-default">
                <motion.div whileHover={{ scale:1.12, rotate:5 }} transition={{ type:"spring", stiffness:300 }}
                  className="w-9 h-9 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600/28 group-hover:border-blue-400/40 group-hover:shadow-[0_0_14px_rgba(37,99,235,0.25)] transition-all duration-200">
                  <Icon className="w-4 h-4 text-blue-400" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* ── RIGHT PANEL (70%) ── */}
        <div className="flex-1 px-6 lg:px-10 xl:px-14 pt-10 pb-16">
          <motion.div
            initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.55, delay:0.1 }}
            className="max-w-3xl mx-auto">

            {/* small heading above card */}
            <div className="mb-6">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Internship Application</p>
              <h2 className="text-2xl font-black text-white">Apply Now</h2>
            </div>

            {/* ── Card ── */}
            <div className="bg-white/[0.04] border border-white/8 rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500/55 to-transparent" />

              <form onSubmit={handleSubmit} noValidate className="p-4 xl:p-5 space-y-3">

                {/* 1. Personal Details */}
                <FadeSection delay={0.05}>
                  <SectionHeader icon={User} label="Personal Details" index={0} />
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <Field label="First Name" required>
                      <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First" className={inputClass} />
                    </Field>
                    <Field label="Middle Name">
                      <input type="text" value={middleName} onChange={e => setMiddleName(e.target.value)} placeholder="Middle" className={inputClass} />
                    </Field>
                    <Field label="Last Name" required>
                      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last" className={inputClass} />
                    </Field>
                  </div>
                  <Field label="Email Address" required>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={`${inputClass} pl-11`} />
                    </div>
                  </Field>
                </FadeSection>

                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                {/* 2. Skills */}
                <FadeSection delay={0.1}>
                  <SectionHeader icon={Code2} label="Skills" index={1} />
                  <SkillSelector selected={skills} onChange={setSkills} />
                </FadeSection>

                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                {/* 3. Duration + Resume side by side */}
                <FadeSection delay={0.15}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <SectionHeader icon={Clock} label="Duration" index={2} />
                      <DurationSelector value={duration} onChange={setDuration} />
                    </div>
                    <div>
                      <SectionHeader icon={Paperclip} label={<>Resume <span className="text-red-400">*</span></>} index={3} />
                      <FileUploadField
                        label="Upload your resume"
                        file={resumeFile} onChange={setResumeFile}
                        accept=".pdf,.doc,.docx,application/pdf,application/msword" />
                      <p className="text-[11px] text-slate-600 mt-1.5 pl-1">PDF, DOC or DOCX — max 10 MB</p>
                    </div>
                  </div>
                </FadeSection>

                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                {/* Description */}
                <FadeSection delay={0.18}>
                  <SectionHeader icon={User} label="About You" index={4} />
                  <Field label="Tell us about yourself">
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Share anything you'd like us to know — your goals, projects, interests, or why you want to join Anantify AI..."
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/15 focus:shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:border-white/22 hover:bg-white/[0.06] transition-all duration-200 resize-none leading-relaxed"
                    />
                  </Field>
                  <p className="text-[11px] text-slate-600 mt-1.5 pl-1">Optional — this helps us understand you better</p>
                </FadeSection>

                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                {/* 4. Previous Internships */}
                <FadeSection delay={0.2}>
                  <SectionHeader icon={Briefcase} label="Previous Internships" index={4} />
                  <AnimatePresence>
                    {prevInternships.map((p, idx) => (
                      <motion.div key={p.id}
                        initial={{ opacity:0, y:-12, scale:0.98 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-10, scale:0.97 }}
                        transition={{ duration:0.22 }}
                        className="mb-3 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.05] transition-all duration-200 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/6">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/25 flex items-center justify-center text-xs font-bold text-blue-400">{idx+1}</div>
                            <span className="text-sm font-semibold text-slate-300">Experience #{idx+1}</span>
                          </div>
                          <motion.button type="button" whileHover={{ scale:1.1, color:"#f87171" }} whileTap={{ scale:0.9 }}
                            onClick={() => removePrev(p.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-400/10">
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Company Name">
                              <input type="text" value={p.company} onChange={e => updatePrev(p.id,"company",e.target.value)} placeholder="Company" className={inputClass} />
                            </Field>
                            <Field label="Duration">
                              <input type="text" value={p.duration} onChange={e => updatePrev(p.id,"duration",e.target.value)} placeholder="e.g. 3 Months" className={inputClass} />
                            </Field>
                          </div>
                          <Field label="Experience Certificate">
                            <FileUploadField label="Upload certificate (PDF, JPG, PNG)" file={p.certFile}
                              onChange={f => updatePrev(p.id,"certFile",f)} accept=".pdf,.jpg,.jpeg,.png,image/*" />
                          </Field>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <motion.button type="button" onClick={addPrev}
                    whileHover={{ scale:1.01, boxShadow:"0 0 18px rgba(37,99,235,0.12)" }}
                    whileTap={{ scale:0.99 }}
                    className="w-full flex items-center justify-center gap-3 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-all duration-200 group px-4 py-2.5 rounded-xl border border-dashed border-blue-500/22 hover:border-blue-400/50 hover:bg-blue-600/5">
                    <span className="w-7 h-7 rounded-lg border border-blue-500/30 bg-blue-600/12 flex items-center justify-center group-hover:bg-blue-600/28 group-hover:border-blue-400/50 transition-all duration-200">
                      <Plus className="w-4 h-4" />
                    </span>
                    Add Previous Internship
                  </motion.button>
                </FadeSection>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                      className="flex items-center gap-3 bg-red-500/10 border border-red-500/22 text-red-300 rounded-xl px-4 py-3.5 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />{error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <FadeSection delay={0.25}>
                  <motion.button type="submit" disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.015, boxShadow: submitting ? undefined : "0 0 40px rgba(37,99,235,0.65)" }}
                    whileTap={{ scale: submitting ? 1 : 0.985 }}
                    className="relative w-full h-12 text-base font-bold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 shadow-[0_0_22px_rgba(37,99,235,0.35)] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden">
                    {/* shimmer */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none" />
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</>
                    ) : (
                      <><span>Submit Application</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" /></>
                    )}
                  </motion.button>
                  <p className="text-center text-xs text-slate-600 mt-3">Your application is sent directly to our team at Anantify AI</p>
                </FadeSection>

              </form>

              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent" />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
