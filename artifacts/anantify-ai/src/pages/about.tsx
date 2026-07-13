import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  return (
    <div className="w-full bg-slate-950 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* SECTION 1 Hero */}
      <section className="relative flex items-center justify-center pt-20 pb-8 overflow-hidden">
        {/* Animated radial gradient bloom */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"
        />

        {/* Network/node SVG diagram (left side) */}
        <div className="absolute top-0 left-0 w-[60%] h-full pointer-events-none z-0">
          <svg width="100%" height="100%" viewBox="0 0 800 800" preserveAspectRatio="xMinYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="fadeRight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                <stop offset="80%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.g 
              animate={{ opacity: isHeroHovered ? 0.9 : 0.4 }}
              transition={{ duration: 0.5 }}
              stroke="url(#fadeRight)" 
              strokeWidth="1.5" 
              fill="none"
            >
              {/* Lines connecting nodes */}
              <motion.path 
                animate={{ pathLength: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                d="M 50 200 L 150 150 L 300 250 L 200 400 L 50 350 Z M 150 150 L 250 50 L 400 150 L 300 250 M 300 250 L 450 350 L 350 500 L 200 400 M 450 350 L 600 300 L 550 150 L 400 150 M 50 350 L 100 550 L 250 650 L 350 500 M 250 650 L 450 700 L 550 550 L 450 350" 
              />
              
              {/* Nodes */}
              <g fill="white" opacity="0.8">
                {[
                  [50, 200, 4], [150, 150, 5], [300, 250, 6], [200, 400, 4.5], [50, 350, 3],
                  [250, 50, 4], [400, 150, 5], [450, 350, 6], [350, 500, 5], [600, 300, 4],
                  [550, 150, 3], [100, 550, 4], [250, 650, 5], [450, 700, 4], [550, 550, 4.5]
                ].map(([cx, cy, r], i) => (
                  <motion.circle 
                    key={i} 
                    cx={cx} cy={cy} r={r}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  />
                ))}
              </g>
            </motion.g>
          </svg>
        </div>

        {/* Large glowing blue rotating geometric shape (bottom right) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-96 h-96 md:w-[32rem] md:h-[32rem] z-0 opacity-30 pointer-events-none"
        >
          <div className="w-full h-full relative" style={{ filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.9))' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#3b82f6" strokeWidth="1">
              <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="rgba(59, 130, 246, 0.05)" />
              <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="rgba(59, 130, 246, 0.15)" />
              <polygon points="50,30 65,38 65,62 50,70 35,62 35,38" fill="rgba(59, 130, 246, 0.25)" />
              <line x1="50" y1="0" x2="50" y2="100" strokeDasharray="1,3" />
              <line x1="6.7" y1="25" x2="93.3" y2="75" strokeDasharray="1,3" />
              <line x1="6.7" y1="75" x2="93.3" y2="25" strokeDasharray="1,3" />
            </svg>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center">
          <motion.div
            onMouseEnter={() => setIsHeroHovered(true)}
            onMouseLeave={() => setIsHeroHovered(false)}
            animate={{ y: isHeroHovered ? -8 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-block max-w-5xl mx-auto cursor-default"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-sm tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-xl"
            >
              Our Team
            </motion.div>

            {/* Heading */}
            <div className="relative mb-6">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-[4rem] font-black text-white tracking-tighter leading-[1.1] drop-shadow-2xl"
              >
                Meet Our <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white pr-2">
                  Creative
                  {/* Sparkle cross element */}
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 w-8 h-8 text-cyan-300 drop-shadow-[0_0_10px_rgba(103,232,249,0.8)]"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0 L13 10 L24 12 L13 14 L12 24 L11 14 L0 12 L11 10 Z" />
                    </svg>
                  </motion.div>
                </span> <br className="hidden md:block" /> AI Minds
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-light"
            >
              We are a group of passionate engineers, designers, and strategists obsessed with the infinite potential of artificial intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 About Us */}
      <section className="py-6 bg-white relative overflow-hidden">
        {/* Decorative large quotation mark */}
        <div className="absolute top-0 right-[10%] text-[30rem] leading-none text-slate-50 font-serif font-black select-none pointer-events-none z-0 -rotate-12 opacity-80">
          "
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Animated left border desktop */}
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-2 bg-blue-600 rounded-full shrink-0 origin-top hidden md:block shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            />
            
            <div className="flex-1 py-2">
              {/* Mobile border */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-2 w-20 bg-blue-600 rounded-full mb-8 md:hidden origin-left"
              />

              <motion.h2 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 leading-tight tracking-tight"
              >
                Every great story starts with a purpose.
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base lg:text-lg text-slate-600 leading-[1.8] font-light"
              >
                Ours began with the belief that businesses, no matter their size, deserve access to tools and strategies that can help them grow and thrive in today's fast-paced digital world. We have worked with startups finding their footing, enterprises scaling to new heights, and everything in between. Each step of the way, we have stayed true to our core: providing honest, innovative, and effective solutions.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 How We Work */}
      <section className="py-6 md:py-8 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div 
            className="rounded-[2rem] lg:rounded-[2.5rem] p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-8 items-center shadow-[0_30px_60px_-15px_rgba(30,58,138,0.35)] relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-950 border border-white/10"
          >
            {/* Inline SVG dot pattern overlay */}
            <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dotsGrid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.6" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotsGrid)" />
              </svg>
            </div>

            {/* Soft glow blob behind heading */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Left Column: Heading + Glassmorphism Cards */}
            <div className="relative z-10 w-full">
              <span className="inline-block text-cyan-300 font-bold text-xs tracking-[0.3em] uppercase mb-4">
                Our Process
              </span>

              <h2 className="text-xl md:text-2xl font-black text-white drop-shadow-xl tracking-tight leading-[1.05] mb-4">
                How <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">We&nbsp;Work</span>
              </h2>

              <div className="space-y-3">
                {/* Card 1 */}
                <div className="bg-white/[0.08] backdrop-blur-xl px-4 py-4 rounded-2xl border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:bg-white/[0.14] hover:border-white/25">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 bg-gradient-to-br from-cyan-300 to-blue-500 p-2.5 rounded-xl shadow-[0_4px_14px_rgba(34,211,238,0.4)]">
                      <CheckCircle2 className="h-5 w-5 text-white drop-shadow-md" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-white mb-1 tracking-tight">AI-Powered Innovation</h3>
                      <p className="text-blue-100/85 text-[0.95rem] leading-relaxed font-light">
                        By harnessing advanced AI and ML, we craft innovative solutions that tackle complex business challenges with unmatched precision and speed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white/[0.08] backdrop-blur-xl px-4 py-4 rounded-2xl border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:bg-white/[0.14] hover:border-white/25">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 bg-gradient-to-br from-indigo-300 to-indigo-600 p-2.5 rounded-xl shadow-[0_4px_14px_rgba(99,102,241,0.4)]">
                      <CheckCircle2 className="h-5 w-5 text-white drop-shadow-md" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-white mb-1 tracking-tight">Expert-Driven Results</h3>
                      <p className="text-blue-100/85 text-[0.95rem] leading-relaxed font-light">
                        With a blend of cutting-edge technology and seasoned industry experts, we deliver impactful results that save time, conserve resources, and drive lasting growth in a fast-evolving world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Isometric 3D Diamond Stack */}
            <div className="flex justify-center items-center relative z-10 w-full">
              {(() => {
                const W = 280;   // total visual width of each diamond
                const RH = 68;   // height of the rhombus top face
                const D = 20;    // visible 3D depth/thickness below top face
                const STEP = 62; // vertical spacing between layer tops (overlap creates stack illusion)
                const SVG_H = RH + D;

                const LAYERS = [
                  { label: "Revise",   top: "#eef0ff", left: "#c9ccf5", right: "#b8bbf0", text: "#3730a3" },
                  { label: "Present",  top: "#d8dbff", left: "#b4b8f5", right: "#a2a6ee", text: "#3730a3" },
                  { label: "Design",   top: "#c0c4f8", left: "#9ea2ed", right: "#8d91e6", text: "#3730a3" },
                  { label: "Sketch",   top: "#a8acf0", left: "#868ae6", right: "#767ade", text: "#3730a3" },
                  { label: "Research", top: "#9094e8", left: "#6e72d8", right: "#6064d0", text: "#3730a3" },
                  { label: "Brief",    top: "#7880e0", left: "#575cca", right: "#4a4fc4", text: "#3730a3" },
                ];

                const containerH = (LAYERS.length - 1) * STEP + SVG_H + 48;

                // SVG polygon helpers
                const half = W / 2;
                const topFace   = `${half},0 ${W},${RH/2} ${half},${RH} 0,${RH/2}`;
                const leftFace  = `0,${RH/2} 0,${RH/2+D} ${half},${RH+D} ${half},${RH}`;
                const rightFace = `${half},${RH} ${half},${RH+D} ${W},${RH/2+D} ${W},${RH/2}`;

                return (
                  <div className="relative" style={{ width: W, height: containerH }}>
                    {LAYERS.map((layer, i) => (
                      <div
                        key={layer.label}
                        className="transition-transform duration-200 ease-out hover:-translate-y-2.5"
                        style={{
                          position: "absolute",
                          top: i * STEP,
                          left: 0,
                          width: W,
                          height: SVG_H,
                          zIndex: LAYERS.length - i,
                          cursor: "default",
                          filter: "drop-shadow(0 6px 16px rgba(30,27,120,0.25))",
                        }}
                      >
                        <svg
                          width={W}
                          height={SVG_H}
                          viewBox={`0 0 ${W} ${SVG_H}`}
                          style={{ display: "block" }}
                        >
                          {/* Right side face (rendered first = behind top) */}
                          <polygon points={rightFace} fill={layer.right} />
                          {/* Left side face */}
                          <polygon points={leftFace}  fill={layer.left}  />
                          {/* Top face (rendered last = on top) */}
                          <polygon points={topFace}   fill={layer.top}   />
                          {/* Label centred on the top face */}
                          <text
                            x={half}
                            y={RH / 2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontFamily="Inter, system-ui, sans-serif"
                            fontSize="16"
                            fontWeight="700"
                            fill={layer.text}
                            letterSpacing="0.4"
                          >
                            {layer.label}
                          </text>
                        </svg>
                      </div>
                    ))}

                    {/* Static concentric ripple rings at the base */}
                    {[
                      { w: 130, h: 22, opacity: 0.55 },
                      { w: 180, h: 30, opacity: 0.38 },
                      { w: 230, h: 38, opacity: 0.22 },
                    ].map((ring, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: "absolute",
                          bottom: 4 - idx * 4,
                          left: "50%",
                          width: ring.w,
                          height: ring.h,
                          marginLeft: -ring.w / 2,
                          borderRadius: "50%",
                          border: `1.5px solid rgba(200,205,255,${ring.opacity})`,
                          pointerEvents: "none",
                        }}
                      />
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
