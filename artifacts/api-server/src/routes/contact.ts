// import { Router } from "express";
// import { getUncachableSendGridClient } from "../lib/sendgrid";

// const router = Router();

// const TO = "rahul.sahu1995@gmail.com";

// router.post("/contact", async (req, res) => {
//   const { name, phone, email, service, idea } = req.body ?? {};

//   if (!name || !email) {
//     res.status(400).json({ error: "name and email are required" });
//     return;
//   }

//   try {
//     const { client, fromEmail } = await getUncachableSendGridClient();
//     await client.send({
//       from: fromEmail,
//       to: TO,
//       replyTo: email,
//       subject: `New Enquiry from ${name} — ${service ?? "General"}`,
//       html: `
//         <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:16px;overflow:hidden;">
//           <div style="background:linear-gradient(135deg,#1e40af,#4f46e5);padding:32px 40px;">
//             <h1 style="color:#fff;margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;">New Enquiry — Anantify AI</h1>
//             <p style="color:#bfdbfe;margin:6px 0 0;font-size:13px;">Submitted via the Get In Touch form</p>
//           </div>
//           <div style="padding:36px 40px;background:#fff;">
//             <table style="width:100%;border-collapse:collapse;font-size:14px;">
//               <tr><td style="padding:10px 0;color:#64748b;font-weight:600;width:140px;">Name</td><td style="padding:10px 0;color:#0f172a;font-weight:500;">${name}</td></tr>
//               <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Email</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
//               <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Phone</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;">${phone || "—"}</td></tr>
//               <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Service</td><td style="padding:10px 0;border-top:1px solid #f1f5f9;"><span style="background:#eff6ff;color:#1d4ed8;padding:3px 12px;border-radius:20px;font-weight:700;font-size:12px;">${service || "—"}</span></td></tr>
//               <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;vertical-align:top;">Idea</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;white-space:pre-wrap;">${idea || "—"}</td></tr>
//             </table>
//           </div>
//           <div style="padding:20px 40px;background:#f8fafc;text-align:center;font-size:12px;color:#94a3b8;">Anantify AI · rahul.sahu1995@gmail.com</div>
//         </div>`,
//     });
//     res.json({ ok: true });
//   } catch (err: any) {
//     console.error("contact email error:", JSON.stringify(err?.response?.body ?? err?.message ?? err));
//     res.status(500).json({ error: err?.response?.body?.errors?.[0]?.message ?? err?.message ?? "Failed to send email" });
//   }
// });

// router.post("/appointment", async (req, res) => {
//   const { name, phone, email, service, idea, date, time } = req.body ?? {};

//   if (!name || !email || !date || !time) {
//     res.status(400).json({ error: "name, email, date and time are required" });
//     return;
//   }

//   try {
//     const { client, fromEmail } = await getUncachableSendGridClient();
//     const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
//     await client.send({
//       from: fromEmail,
//       to: TO,
//       ...(isValidEmail(email) ? { replyTo: email } : {}),
//       subject: `Appointment Booking — ${name} on ${date} at ${time}`,
//       html: `
//         <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:16px;overflow:hidden;">
//           <div style="background:linear-gradient(135deg,#1e40af,#4f46e5);padding:32px 40px;">
//             <h1 style="color:#fff;margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Appointment Booked — Anantify AI</h1>
//             <p style="color:#bfdbfe;margin:6px 0 0;font-size:13px;">AI Consultation Request</p>
//           </div>
//           <div style="padding:36px 40px;background:#fff;">
//             <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:18px 24px;margin-bottom:28px;text-align:center;">
//               <p style="margin:0;font-size:13px;color:#1d4ed8;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">Scheduled Slot</p>
//               <p style="margin:6px 0 0;font-size:20px;font-weight:800;color:#1e3a8a;">${date}</p>
//               <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#2563eb;">${time}</p>
//             </div>
//             <table style="width:100%;border-collapse:collapse;font-size:14px;">
//               <tr><td style="padding:10px 0;color:#64748b;font-weight:600;width:140px;">Name</td><td style="padding:10px 0;color:#0f172a;font-weight:500;">${name}</td></tr>
//               <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Email</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
//               <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Phone</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;">${phone || "—"}</td></tr>
//               ${service ? `<tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Service</td><td style="padding:10px 0;border-top:1px solid #f1f5f9;"><span style="background:#eff6ff;color:#1d4ed8;padding:3px 12px;border-radius:20px;font-weight:700;font-size:12px;">${service}</span></td></tr>` : ""}
//               ${idea ? `<tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;vertical-align:top;">Notes</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;white-space:pre-wrap;">${idea}</td></tr>` : ""}
//             </table>
//           </div>
//           <div style="padding:20px 40px;background:#f8fafc;text-align:center;font-size:12px;color:#94a3b8;">Anantify AI · rahul.sahu1995@gmail.com</div>
//         </div>`,
//     });
//     res.json({ ok: true });
//   } catch (err: any) {
//     console.error("appointment email error:", JSON.stringify(err?.response?.body ?? err?.message ?? err));
//     res.status(500).json({ error: err?.response?.body?.errors?.[0]?.message ?? err?.message ?? "Failed to send email" });
//   }
// });

// export default router;



import { Router } from "express";
import { getUncachableEmailClient } from "../lib/sendgrid";

const router = Router();
const TO = "rahul.sahu1995@gmail.com";

// 🟢 1. CONTACT ROUTE
router.post("/contact", async (req, res) => {
  const { name, phone, email, service, idea } = req.body ?? {};

  if (!name || !email) {
    res.status(400).json({ error: "name and email are required" });
    return;
  }

  try {
    const { transporter, fromEmail } = await getUncachableEmailClient();
    
    await transporter.sendMail({
      from: `"${name}" <${fromEmail}>`,
      to: TO,
      replyTo: email,
      subject: `New Enquiry from ${name} — ${service ?? "General"}`,
      html: `
        <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1e40af,#4f46e5);padding:32px 40px;">
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;">New Enquiry — Anantify AI</h1>
            <p style="color:#bfdbfe;margin:6px 0 0;font-size:13px;">Submitted via the Get In Touch form</p>
          </div>
          <div style="padding:36px 40px;background:#fff;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:10px 0;color:#64748b;font-weight:600;width:140px;">Name</td><td style="padding:10px 0;color:#0f172a;font-weight:500;">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Email</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Phone</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;">${phone || "—"}</td></tr>
              <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Service</td><td style="padding:10px 0;border-top:1px solid #f1f5f9;"><span style="background:#eff6ff;color:#1d4ed8;padding:3px 12px;border-radius:20px;font-weight:700;font-size:12px;">${service || "—"}</span></td></tr>
              <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;vertical-align:top;">Idea</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;white-space:pre-wrap;">${idea || "—"}</td></tr>
            </table>
          </div>
          <div style="padding:20px 40px;background:#f8fafc;text-align:center;font-size:12px;color:#94a3b8;">Anantify AI · ${TO}</div>
        </div>`,
    });
    
    res.json({ ok: true });
  } catch (err: any) {
    console.error("contact email error:", err?.message || err);
    res.status(500).json({ error: err?.message || "Failed to send email" });
  }
});

// 🟢 2. APPOINTMENT ROUTE
router.post("/appointment", async (req, res) => {
  const { name, phone, email, service, idea, date, time } = req.body ?? {};

  if (!name || !email || !date || !time) {
    res.status(400).json({ error: "name, email, date and time are required" });
    return;
  }

  try {
    const { transporter, fromEmail } = await getUncachableEmailClient();
    const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    
    await transporter.sendMail({
      from: `"${name}" <${fromEmail}>`,
      to: TO,
      ...(isValidEmail(email) ? { replyTo: email } : {}),
      subject: `Appointment Booking — ${name} on ${date} at ${time}`,
      html: `
        <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1e40af,#4f46e5);padding:32px 40px;">
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Appointment Booked — Anantify AI</h1>
            <p style="color:#bfdbfe;margin:6px 0 0;font-size:13px;">AI Consultation Request</p>
          </div>
          <div style="padding:36px 40px;background:#fff;">
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:18px 24px;margin-bottom:28px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#1d4ed8;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">Scheduled Slot</p>
              <p style="margin:6px 0 0;font-size:20px;font-weight:800;color:#1e3a8a;">${date}</p>
              <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#2563eb;">${time}</p>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:10px 0;color:#64748b;font-weight:600;width:140px;">Name</td><td style="padding:10px 0;color:#0f172a;font-weight:500;">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Email</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Phone</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;">${phone || "—"}</td></tr>
              ${service ? `<tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Service</td><td style="padding:10px 0;border-top:1px solid #f1f5f9;"><span style="background:#eff6ff;color:#1d4ed8;padding:3px 12px;border-radius:20px;font-weight:700;font-size:12px;">${service}</span></td></tr>` : ""}
              ${idea ? `<tr><td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;vertical-align:top;">Notes</td><td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;white-space:pre-wrap;">${idea}</td></tr>` : ""}
            </table>
          </div>
          <div style="padding:20px 40px;background:#f8fafc;text-align:center;font-size:12px;color:#94a3b8;">Anantify AI · ${TO}</div>
        </div>`,
    });
    
    res.json({ ok: true });
  } catch (err: any) {
    console.error("appointment email error:", err?.message || err);
    res.status(500).json({ error: err?.message || "Failed to send email" });
  }
});

export default router;