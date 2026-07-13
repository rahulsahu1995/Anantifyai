import React, { useState, useEffect } from "react";
import { Terminal, ArrowRight, ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Blog = {
  id: number;
  topic: string;
  title: string;
  desc: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  content: string[];
};

const BLOGS: Blog[] = [
  {
    id: 1,
    topic: "RAG",
    title: "Implementing Retrieval-Augmented Generation for Enterprise",
    desc: "How RAG is changing the way companies interact with their proprietary data.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    author: "Anya Sharma",
    date: "March 12, 2026",
    readTime: "8 min read",
    content: [
      "Retrieval-Augmented Generation (RAG) bridges the gap between static large language models and the dynamic, proprietary knowledge that lives inside every enterprise. Instead of fine-tuning a model on every internal document, RAG retrieves the right snippets at query time and feeds them to the model as context.",
      "The architecture is deceptively simple: an embedding model converts your documents into vectors, a vector database stores them, and a retriever finds the closest matches to a user question. The language model then composes an answer grounded in those retrieved passages.",
      "What makes RAG powerful for the enterprise is that the source of truth never leaves your infrastructure. Updates to your knowledge base appear in answers instantly, citations are verifiable, and access controls flow naturally from your existing document permissions. Anantify has deployed RAG systems for legal, healthcare, and financial clients where accuracy and provenance are non-negotiable."
    ]
  },
  {
    id: 2,
    topic: "Prompt Engineering",
    title: "Advanced Prompting Techniques for GPT-4",
    desc: "Get better, more consistent outputs with these advanced techniques.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80",
    author: "Marcus Chen",
    date: "March 5, 2026",
    readTime: "6 min read",
    content: [
      "Prompt engineering has matured from a creative exercise into a structured engineering discipline. The most reliable prompts treat the model like a contractor: they specify the role, the context, the inputs, the constraints, and the exact format of the output.",
      "Techniques like chain-of-thought, few-shot exemplars, and self-consistency sampling can lift accuracy on complex reasoning tasks by double-digit percentages. The trick is knowing which technique to reach for — verbose reasoning helps math, but hurts classification, where a clean schema and a single-token answer wins.",
      "At Anantify we maintain a prompt library with versioning, evaluation harnesses, and regression tests. Treating prompts like code — reviewable, testable, and observable in production — is the difference between a demo and a system you can trust."
    ]
  },
  {
    id: 3,
    topic: "Building Chat Apps",
    title: "Architecting Scalable Chat Applications",
    desc: "The definitive guide to building chat interfaces that scale.",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1400&q=80",
    author: "Priya Patel",
    date: "February 28, 2026",
    readTime: "10 min read",
    content: [
      "A chat interface looks simple on the surface and reveals an iceberg of architectural decisions underneath: streaming responses, conversation state, tool invocation, retries, rate limiting, and graceful failure all sit one layer below the message bubble.",
      "The pattern we recommend separates three concerns: a thin transport layer that handles token streaming over Server-Sent Events, a stateless inference layer that can scale horizontally behind a load balancer, and a stateful conversation service backed by a database that can rehydrate any session on any node.",
      "Get those boundaries right and your application can move from a hundred users to a hundred thousand without rewriting the core. Get them wrong and you discover, at exactly the wrong moment, that your in-memory chat history does not survive a deploy."
    ]
  },
  {
    id: 4,
    topic: "LLM",
    title: "Open Source vs Closed Source LLMs",
    desc: "Which model should you choose for your next big project?",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    author: "Diego Alvarez",
    date: "February 20, 2026",
    readTime: "7 min read",
    content: [
      "The open versus closed model debate is no longer about which is smarter — frontier open weights now match closed APIs on most benchmarks. The real question is about control, cost, and compliance.",
      "Closed models give you a managed endpoint with predictable latency and a roadmap you do not own. Open weights give you the ability to run on your own hardware, fine-tune freely, and audit the entire stack. For regulated industries, that auditability often outweighs the convenience of a hosted API.",
      "Our recommendation: prototype on a hosted closed model to move fast, then port to an open weight model once the use case is proven and the cost or compliance math demands it."
    ]
  },
  {
    id: 5,
    topic: "Next.js",
    title: "Next.js 14 App Router Best Practices",
    desc: "Optimize your React applications for speed and SEO.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1400&q=80",
    author: "Lena Kowalski",
    date: "February 14, 2026",
    readTime: "9 min read",
    content: [
      "The App Router changed Next.js from a hybrid framework into a full-stack React platform. Server Components, streaming, and the new caching model unlock real performance wins, but only if you understand where the boundaries are.",
      "Push as much work into Server Components as you can — they ship zero JavaScript and have direct access to your data layer. Reach for Client Components only when you need interactivity, browser APIs, or React state. The mental model is closer to PHP with React than to a single-page application.",
      "Pair the App Router with partial prerendering and you get the SEO of static sites, the freshness of server rendering, and the interactivity of a SPA — all from a single codebase."
    ]
  },
  {
    id: 6,
    topic: "Cloud/DevOps",
    title: "Automating Kubernetes Deployments",
    desc: "Streamline your DevOps pipeline with these automated strategies.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    author: "Samuel Okafor",
    date: "February 7, 2026",
    readTime: "8 min read",
    content: [
      "Kubernetes is a powerful runtime and a punishing user experience. The teams that succeed with it treat the cluster as a deployment target, not a daily workspace, and automate every interaction with it.",
      "GitOps tools like Argo CD and Flux turn your repository into the single source of truth: a merged pull request becomes a desired state, and a controller reconciles the cluster to match. Rollbacks become git reverts, audits become git logs, and onboarding becomes a clone.",
      "Layer in progressive delivery with Argo Rollouts or Flagger and you get canary releases, automatic health analysis, and instant rollback on regression — all without anyone touching kubectl in production."
    ]
  },
  {
    id: 7,
    topic: "State Management",
    title: "State Management in Modern React with Fluxx",
    desc: "A deep dive into complex state management.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    author: "Hiroshi Tanaka",
    date: "January 30, 2026",
    readTime: "7 min read",
    content: [
      "React state is no longer a single problem. Local UI state, server cache, URL state, and global app state each have their own best tool — and forcing one library to handle all four is the most common architectural mistake in modern React codebases.",
      "Use React's built-in state for what is local. Use a query library like TanStack Query for what comes from your server. Use the URL for what should be shareable and bookmarkable. Reach for a global store like Fluxx, Zustand, or Jotai only for the small slice of truly cross-cutting state.",
      "Drawing those lines clearly is what keeps a growing application from collapsing into a tangle of context providers and stale data."
    ]
  },
  {
    id: 8,
    topic: "DALL-E",
    title: "Generating Production-Ready Image Assets",
    desc: "Using AI image generation in real-world workflows.",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1400&q=80",
    author: "Isabella Rossi",
    date: "January 22, 2026",
    readTime: "6 min read",
    content: [
      "AI image generation has crossed the threshold from novelty to a production tool, but shipping generated assets at scale requires a workflow that goes beyond clever prompts.",
      "We recommend treating the model as the first draft, not the final asset. Generate a batch, score them against a brand brief, run the survivors through a deterministic post-processing pipeline for color grading and aspect cropping, and store the prompt and seed alongside the asset for reproducibility.",
      "Done right, a marketing team can produce a season of campaign visuals in an afternoon — and re-render the whole season in a different style with a single config change."
    ]
  },
  {
    id: 9,
    topic: "Flutter",
    title: "Cross-Platform Mobile Development at Scale",
    desc: "Building large-scale Flutter apps for enterprise.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80",
    author: "Aarav Mehta",
    date: "January 15, 2026",
    readTime: "9 min read",
    content: [
      "Flutter has grown from a mobile-first framework into a credible option for any screen, from phones to desktops to embedded displays. At scale, the discipline that matters most is feature isolation.",
      "Structure the codebase as a monorepo of small packages — one per feature, one per shared concern — and forbid cross-feature imports. The result is a build graph that lets you ship a hundred-engineer codebase without merge conflicts and a test suite that only runs what changed.",
      "Pair that with a design system package, a thin platform abstraction layer, and a strict policy on adding native plugins, and Flutter becomes one of the most productive ways to deliver a polished application across every platform your customers use."
    ]
  }
];

export default function Blog() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedBlog = selectedId !== null ? BLOGS.find((b) => b.id === selectedId) : null;
  const remainingBlogs = selectedId !== null ? BLOGS.filter((b) => b.id !== selectedId) : BLOGS;

  useEffect(() => {
    if (selectedId !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedId]);

  const openBlog = (id: number) => setSelectedId(id);
  const closeBlog = () => {
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Featured Detail (when a card is selected) */}
      <AnimatePresence mode="wait">
        {selectedBlog && (
          <motion.section
            key={selectedBlog.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 border-b border-white/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.4),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.4),transparent_50%)]" />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
              <button
                onClick={closeBlog}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm font-semibold mb-10 group transition-colors"
                data-testid="button-back-to-blogs"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to all articles
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
                <div>
                  <span className="inline-block text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1.5 rounded-full shadow-lg mb-6 tracking-wide uppercase">
                    {selectedBlog.topic}
                  </span>

                  <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
                    {selectedBlog.title}
                  </h1>

                  <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
                    {selectedBlog.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400 border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-400" />
                      <span className="font-medium text-slate-200">{selectedBlog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      <span>{selectedBlog.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span>{selectedBlog.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-[2rem] blur-2xl" />
                  <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
                    <img
                      src={selectedBlog.image}
                      alt={selectedBlog.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Article body */}
              <div className="mt-16 max-w-3xl mx-auto">
                <div className="space-y-6">
                  {selectedBlog.content.map((para, i) => (
                    <p
                      key={i}
                      className="text-slate-300 text-lg leading-[1.85] font-light first-letter:text-5xl first-letter:font-bold first-letter:text-white first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1"
                      style={i === 0 ? undefined : { textIndent: 0 }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-12 pt-10 border-t border-white/10 flex justify-center">
                  <button
                    onClick={closeBlog}
                    className="inline-flex items-center gap-2 text-white border border-white/20 hover:border-blue-400 hover:bg-blue-500/10 px-6 py-3 rounded-full transition-all font-semibold text-sm"
                    data-testid="button-close-detail"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Browse more articles
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Hero (only when no post is selected) */}
      {!selectedBlog && (
        <section className="bg-gradient-to-b from-slate-950 to-black pt-20 pb-12 border-b border-white/10 relative overflow-hidden">
          {/* Binary / Circuit Watermark Background */}
          <div className="absolute inset-0 opacity-5 font-mono text-[8px] overflow-hidden whitespace-pre pointer-events-none flex flex-wrap leading-none select-none text-primary">
            {Array(200).fill("01010111 01100101 00100000 01100010 01110101 01101001 01101100 01100100 00100000 01000001 01001001\n").join("")}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <span className="text-primary font-bold tracking-widest uppercase animate-pulse border border-primary/30 px-4 py-1 rounded-full bg-primary/10">Beyond The Code</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-3">Stories From The Tech Frontier</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* CRT Computer Visual */}
              <div className="relative h-80 w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-slate-900 rounded-3xl border-4 border-slate-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10"></div>
                  <div className="p-8 h-full flex flex-col items-center justify-center">
                    <Terminal className="h-20 w-20 text-green-500 mb-4" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-green-500 font-mono text-2xl"
                    >
                      _
                    </motion.div>
                  </div>
                </div>

                {/* Floating Diamond Cards */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: 45 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 left-10 w-16 h-16 bg-orange-500 rounded border-2 border-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.5)] flex items-center justify-center group hover:scale-125 transition-transform z-20"
                >
                  <span className="text-white font-bold -rotate-45 text-xs group-hover:drop-shadow-md">html</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], rotate: 45 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-10 left-20 w-20 h-20 bg-blue-500 rounded border-2 border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center group hover:scale-125 transition-transform z-20"
                >
                  <span className="text-white font-bold -rotate-45 text-sm group-hover:drop-shadow-md">php</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -20, 0], rotate: 45 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-1/2 right-10 w-14 h-14 bg-yellow-400 rounded border-2 border-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.5)] flex items-center justify-center group hover:scale-125 transition-transform z-20"
                >
                  <span className="text-slate-900 font-bold -rotate-45 text-xs group-hover:drop-shadow-md">js</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0], rotate: 45 }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute top-5 right-32 w-12 h-12 bg-pink-500 rounded border-2 border-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.5)] flex items-center justify-center group hover:scale-125 transition-transform z-20"
                >
                  <span className="text-white font-bold -rotate-45 text-[10px] group-hover:drop-shadow-md">CSS</span>
                </motion.div>
              </div>

              {/* Glassmorphism Panel */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Beyond Traditional Cloud Operations - Full-Stack Cloud & DevOps Management</h2>
                <p className="text-slate-400 mb-8 text-base leading-relaxed relative z-10">
                  Discover how Anantify is redefining cloud operations. We don't just manage servers; we optimize your entire development pipeline for unprecedented speed and reliability. Learn the strategies that cut our clients' deployment times in half.
                </p>
                <button
                  onClick={() => openBlog(6)}
                  className="text-white border border-primary px-6 py-3 rounded-full hover:bg-primary transition-colors font-bold flex items-center gap-2 w-max relative z-10"
                  data-testid="button-read-featured"
                >
                  Read Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-slate-300 flex-1 max-w-[100px]"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">
              {selectedBlog ? "More Articles" : "All Blogs And News"}
            </h2>
            <div className="h-px bg-slate-300 flex-1 max-w-[100px]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {remainingBlogs.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.07, 0.4) }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => openBlog(blog.id)}
                  className="text-left bg-white rounded-3xl border border-slate-200 overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] cursor-pointer group flex flex-col h-full relative w-full"
                  data-testid={`card-blog-${blog.id}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>

                  <div className="h-56 overflow-hidden relative bg-slate-200">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wide">
                        {blog.topic}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 flex flex-col flex-1 relative z-10">
                    <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed line-clamp-3">{blog.desc}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{blog.readTime}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary shadow-sm">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
