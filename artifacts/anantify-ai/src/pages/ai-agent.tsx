import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2, Plus, Bot, User, Loader2 } from "lucide-react";

const API_BASE = `${window.location.origin.replace(/:\d+$/, "")}/api`;
const LS_KEY = "anantify_chat_v1";
const EXPIRY_MS = 60 * 60 * 1000;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  expiresAt: string;
  messages: Message[];
}

function loadFromStorage(): Conversation[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const all: Conversation[] = JSON.parse(raw);
    const now = Date.now();
    return all.filter((c) => new Date(c.expiresAt).getTime() > now);
  } catch {
    return [];
  }
}

function saveToStorage(convs: Conversation[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(convs));
  } catch {}
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 0.15, 0.3].map((delay, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-blue-400"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message & { streaming?: boolean } }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-gradient-to-br from-blue-600 to-cyan-500"
            : "bg-gradient-to-br from-indigo-700 to-violet-600"
        }`}
      >
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-br-sm"
            : "bg-white/5 border border-white/10 text-slate-200 rounded-bl-sm backdrop-blur-sm"
        }`}
      >
        {msg.content}
        {(msg as any).streaming && (
          <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse align-middle" />
        )}
      </div>
    </motion.div>
  );
}

export default function AiAgent() {
  const [conversations, setConversations] = useState<Conversation[]>(() => loadFromStorage());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingMsg, setStreamingMsg] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeConv = conversations.find((c) => c.id === activeId) ?? null;
  const msgs = activeConv?.messages ?? [];

  const scrollToBottom = () => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => { scrollToBottom(); }, [msgs, streamingMsg]);

  useEffect(() => {
    saveToStorage(conversations);
  }, [conversations]);

  const updateConversation = useCallback((id: string, updater: (c: Conversation) => Conversation) => {
    setConversations((prev) => prev.map((c) => c.id === id ? updater(c) : c));
  }, []);

  function newConversation() {
    const id = `conv_${Date.now()}`;
    const now = new Date();
    const conv: Conversation = {
      id,
      title: `Chat — ${now.toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`,
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + EXPIRY_MS).toISOString(),
      messages: [],
    };
    setConversations((prev) => [...prev, conv]);
    setActiveId(id);
  }

  function deleteConversation(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) setActiveId(null);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    let conversationId = activeId;
    if (!conversationId) {
      const id = `conv_${Date.now()}`;
      const now = new Date();
      const conv: Conversation = {
        id,
        title: `Chat — ${now.toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`,
        createdAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + EXPIRY_MS).toISOString(),
        messages: [],
      };
      setConversations((prev) => [...prev, conv]);
      setActiveId(id);
      conversationId = id;
    }

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    updateConversation(conversationId, (c) => ({
      ...c,
      messages: [...c.messages, userMsg],
    }));

    setInput("");
    setLoading(true);
    setStreamingMsg("");

    const currentMsgs = (conversations.find((c) => c.id === conversationId)?.messages ?? []);

    const response = await fetch(`${API_BASE}/gemini/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        history: currentMsgs.map((m) => ({ role: m.role, content: m.content })),
        message: text,
      }),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let accumulated = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split("\n")) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6).trim();
        if (!raw) continue;
        try {
          const parsed = JSON.parse(raw);
          if (parsed.done) {
            const assistantMsg: Message = {
              id: `msg_${Date.now() + 1}`,
              role: "assistant",
              content: accumulated,
              createdAt: new Date().toISOString(),
            };
            updateConversation(conversationId!, (c) => ({
              ...c,
              messages: [...c.messages, assistantMsg],
            }));
            setStreamingMsg(null);
            setLoading(false);
          } else if (parsed.content) {
            accumulated += parsed.content;
            setStreamingMsg(accumulated);
          }
        } catch {}
      }
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-violet-900/20 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 pt-16 pb-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center pt-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Bot className="w-3.5 h-3.5" />
              Anantify AI Agent
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              Talk With Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI Agent
              </span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Ask anything about Anantify AI — our services, team, or how we can help your business grow with artificial intelligence.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 pb-8 flex gap-4" style={{ maxHeight: "calc(100vh - 220px)" }}>
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hidden md:flex flex-col w-60 bg-white/5 border border-white/10 rounded-2xl p-3 gap-2 backdrop-blur-sm overflow-hidden"
        >
          <button
            onClick={newConversation}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            <Plus className="w-4 h-4" />
            New Conversation
          </button>
          <div className="flex-1 overflow-y-auto space-y-1 mt-1 pr-0.5">
            <AnimatePresence>
              {conversations.length === 0 && (
                <p className="text-xs text-slate-500 text-center mt-4 px-2">No conversations yet. Start a new one.</p>
              )}
              {[...conversations].reverse().map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setActiveId(c.id)}
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-xs transition-all duration-150 ${
                    activeId === c.id
                      ? "bg-blue-600/20 border border-blue-500/30 text-blue-300"
                      : "hover:bg-white/5 text-slate-400"
                  }`}
                >
                  <span className="truncate flex-1">{c.title}</span>
                  <button
                    onClick={(e) => deleteConversation(c.id, e)}
                    className="opacity-0 group-hover:opacity-100 ml-1 text-slate-500 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <p className="text-[10px] text-slate-600 text-center px-2 pb-1">
            Chats are saved for 1 hour, then cleared automatically.
          </p>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex-1 flex flex-col bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden"
        >
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {msgs.length === 0 && !streamingMsg && (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Hello! I am the Anantify AI Agent.</p>
                  <p className="text-slate-400 text-sm max-w-sm">
                    Ask me about our services, our founder, our location, or how Anantify AI can transform your business.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {[
                    "Who founded Anantify AI?",
                    "What services do you offer?",
                    "Where are you located?",
                    "How can you help my business?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); textareaRef.current?.focus(); }}
                      className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {msgs.map((m) => (
              <MessageBubble key={m.id} msg={m} />
            ))}
            {streamingMsg !== null && (
              <MessageBubble
                msg={{
                  id: "streaming",
                  role: "assistant",
                  content: streamingMsg || "",
                  createdAt: new Date().toISOString(),
                  streaming: true,
                } as any}
              />
            )}
            {loading && streamingMsg === "" && <TypingIndicator />}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                placeholder="Ask about Anantify AI..."
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 resize-none outline-none leading-relaxed py-1 max-h-28 overflow-y-auto disabled:opacity-50"
                style={{ minHeight: "36px" }}
                onInput={(e) => {
                  const t = e.target as HTMLTextAreaElement;
                  t.style.height = "auto";
                  t.style.height = `${Math.min(t.scrollHeight, 112)}px`;
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white hover:from-blue-500 hover:to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-center text-xs text-slate-600 mt-2">
              This agent only provides information about Anantify AI.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
