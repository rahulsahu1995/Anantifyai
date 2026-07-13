import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Instagram, Linkedin, MapPin, Mail, Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/logo_1777016445624.png";
import footerBrandImg from "@assets/AnantifyAI_1779178324303.jpeg";

function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = window.innerWidth;
      const H = 64;
      canvas.width = W;
      canvas.height = H;

      const rng = (min: number, max: number) => Math.random() * (max - min) + min;

      // ── Dark blue base ────────────────────────────────────
      ctx.fillStyle = "#020d1f";
      ctx.fillRect(0, 0, W, H);

      // Subtle blue gradient sweep left → right
      const sweep = ctx.createLinearGradient(0, 0, W, 0);
      sweep.addColorStop(0,   "rgba(2,18,50,0.0)");
      sweep.addColorStop(0.3, "rgba(5,30,80,0.5)");
      sweep.addColorStop(0.6, "rgba(8,40,110,0.55)");
      sweep.addColorStop(1,   "rgba(2,18,50,0.0)");
      ctx.fillStyle = sweep;
      ctx.fillRect(0, 0, W, H);

      // Nebula bloom — left-center
      const b1 = ctx.createRadialGradient(W * 0.32, H / 2, 0, W * 0.32, H / 2, W * 0.22);
      b1.addColorStop(0, "rgba(30,80,180,0.25)");
      b1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = b1;
      ctx.fillRect(0, 0, W, H);

      // Nebula bloom — right
      const b2 = ctx.createRadialGradient(W * 0.72, H / 2, 0, W * 0.72, H / 2, W * 0.18);
      b2.addColorStop(0, "rgba(20,60,160,0.20)");
      b2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = b2;
      ctx.fillRect(0, 0, W, H);

      // ── Sparse background dots ───────────────────────────
      for (let i = 0; i < 35; i++) {
        const x = rng(0, W);
        const y = rng(0, H);
        const r = rng(0.2, 0.55);
        const a = rng(0.3, 0.65);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,228,255,${a})`;
        ctx.fill();
      }

      // ── A handful of brighter stars with soft glow ───────
      for (let i = 0; i < 8; i++) {
        const x = rng(0, W);
        const y = rng(0, H);
        const size = rng(0.8, 1.6);
        const haloR = size * 3.5;
        const g = ctx.createRadialGradient(x, y, 0, x, y, haloR);
        g.addColorStop(0,   "rgba(220,230,255,0.75)");
        g.addColorStop(0.4, "rgba(160,185,255,0.18)");
        g.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, haloR, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fill();
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

const WA_NUMBER = "918120871155";
const WA_MESSAGE = "Hello! I would like to discuss a project with Anantify AI.";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "/",           label: "Home" },
  { href: "/ai-agent",   label: "AI Agent" },
  { href: "/services",   label: "Service" },
  { href: "/about",      label: "About" },
  { href: "/blog",       label: "Blog" },
  { href: "/internship", label: "Internship" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
    setScrolled(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "border-b border-white/15" : "border-b border-transparent"}`}>
        {/* Starfield — fades in on scroll, fully transparent at top */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="starfield-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 overflow-hidden"
            >
              <StarfieldCanvas />
              <div className="absolute inset-0 bg-black/25" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity group">
            <img
              src={logoImg}
              alt="Anantify AI Logo"
              className="h-8 w-8 object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(99,179,237,0.8)]"
            />
            <span className="font-bold text-xl tracking-tight">Anantify AI</span>
          </Link>

          {/* Desktop nav + CTA — right-aligned together */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => { if (location === href) window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] transition-all duration-300">
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-white hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ── Mobile Sidebar ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-72 bg-slate-950 border-l border-white/10 z-[70] flex flex-col md:hidden shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
                <div className="flex items-center gap-2 text-white">
                  <img src={logoImg} alt="Anantify AI Logo" className="h-7 w-7 object-contain" />
                  <span className="font-bold text-lg tracking-tight">Anantify AI</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                  >
                    <Link
                      href={href}
                      onClick={() => { if (location === href) window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                        location === href
                          ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                          : "text-slate-300 hover:bg-white/6 hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}

                {/* Social links in mobile nav */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + NAV_LINKS.length * 0.05 }}
                  className="flex items-center gap-2 px-4 pt-3 pb-1"
                >
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp Us"
                    className="flex items-center justify-center w-10 h-10 rounded-xl text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-150"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    title="LinkedIn"
                    className="flex items-center justify-center w-10 h-10 rounded-xl text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all duration-150"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    title="Instagram"
                    className="flex items-center justify-center w-10 h-10 rounded-xl text-[#E1306C] hover:bg-[#E1306C]/10 transition-all duration-150"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </motion.div>
              </nav>

              {/* CTA at bottom */}
              <div className="px-6 pb-8">
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 shadow-[0_0_15px_rgba(37,99,235,0.4)] py-3 font-bold">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Page content ───────────────────────────────────── */}
      <main className="flex-1">
        {children}
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="relative z-10 bg-slate-950 text-slate-300 py-16 border-t border-white/10">
        <div className="container mx-auto px-16 md:px-36 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <img
              src={footerBrandImg}
              alt="Anantify AI"
              className="h-32 w-auto object-contain rounded-xl drop-shadow-[0_8px_32px_rgba(0,100,255,0.35)] shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
            />
            <p className="text-sm text-slate-400">Let's make something great together.</p>
            <div className="flex gap-4 items-center">
              <a href="#" className="text-[#E1306C] hover:text-[#C13584] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-[#0A66C2] hover:text-[#004182] transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-[#1da851] transition-colors" title="Chat on WhatsApp">
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-white uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/internship" className="hover:text-primary transition-colors">Internship</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blogs</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-white uppercase tracking-wider text-sm">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>Generative AI</li>
              <li>LLM Development</li>
              <li>Chatbot Development</li>
              <li>Cloud Management</li>
            </ul>
          </div>

          <div className="space-y-6">
            <p className="text-sm font-medium text-white">Strategic Partnership to unlock greater business value.</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 p-3 rounded border border-white/10 text-xs font-medium text-center">Google Cloud</div>
              <div className="bg-white/5 p-3 rounded border border-white/10 text-xs font-medium text-center">AWS</div>
              <div className="bg-white/5 p-3 rounded border border-white/10 text-xs font-medium text-center col-span-2">Terraform</div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-16 md:px-36 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>138/3, Govind Colony, Kila Road, Madhya Pradesh - 452015</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:rahul.sahu1995@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="h-4 w-4 text-primary" />
              rahul.sahu1995@gmail.com
            </a>
            <a href="tel:+918120271155" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4 text-primary" />
              +91 8120271155
            </a>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp Button ─────────────────────────── */}
      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-[0_4px_24px_rgba(34,197,94,0.5)] hover:shadow-[0_4px_32px_rgba(34,197,94,0.7)] transition-colors duration-200"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </motion.a>
    </div>
  );
}
