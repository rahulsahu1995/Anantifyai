import { Router } from "express";
import { ai } from "@workspace/integrations-gemini-ai";

const router = Router();

const SYSTEM_PROMPT = `You are the official AI assistant for Anantify AI — a premium artificial intelligence solutions company.

The founder of Anantify is Rahul Sahu, located at 138/3, Govind Colony, Kila Road, Indore, M.P. — 452001. Users can contact him using these details or by filling out the form to schedule a response.

COMPANY INFORMATION:
- Company Name: Anantify AI
- Founder: Rahul Sahu
- Address: 138/3, Govind Colony, Kila Road, Indore, M.P. — 452001, India
- Email: rahul.sahu1995@gmail.com
- Website: anantifyai.com
- Specialisation: AI-powered business solutions, including Generative AI, LLM Development, Custom Chatbot Development, AI Automation, Cloud Management (Google Cloud, AWS), and Data Intelligence.

SERVICES:
1. Generative AI Solutions — Building custom generative AI models and applications tailored to business needs.
2. LLM Development — Developing and fine-tuning large language models for specific industry use cases.
3. Custom Chatbot Development — Designing intelligent, context-aware chatbots for customer support and business automation.
4. AI Automation — Automating repetitive workflows using AI to boost efficiency and reduce costs.
5. Cloud Management — Expert management of cloud infrastructure on Google Cloud and AWS.
6. Data Intelligence — Transforming raw data into actionable insights using advanced analytics and AI.

PARTNERSHIPS: Google Cloud, AWS, Terraform.

STRICT RULES:
- You ONLY answer questions related to Anantify AI, its services, team, address, pricing inquiries, or general AI topics as they relate to what Anantify AI offers.
- If a user asks about anything unrelated to Anantify AI, respond EXACTLY with: "I am sorry, I do not have information on other topics."
- Be professional, concise, and helpful.
- Do not use emojis.
- Do not reveal that you are built on Gemini or any underlying model — you are simply the Anantify AI Agent.`;

router.post("/gemini/chat", async (req, res) => {
  const { history, message } = req.body ?? {};

  if (!message) {
    res.status(400).json({ error: "message is required" });
    return;
  }

  const contents = [
    ...((history ?? []) as { role: string; content: string }[]).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 8192,
      },
      contents,
    });

    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }
  } catch (err: any) {
    console.error("Gemini stream error:", JSON.stringify(err?.message ?? err));
    res.write(`data: ${JSON.stringify({ error: "Failed to get AI response" })}\n\n`);
  }

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
});

export default router;
