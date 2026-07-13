import { Router } from "express";
import multer from "multer";
import { getUncachableSendGridClient } from "../lib/sendgrid";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const TO = "rahul.sahu1995@gmail.com";

const uploadFields = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "expCert_0", maxCount: 1 },
  { name: "expCert_1", maxCount: 1 },
  { name: "expCert_2", maxCount: 1 },
  { name: "expCert_3", maxCount: 1 },
  { name: "expCert_4", maxCount: 1 },
]);

router.post("/internship", uploadFields, async (req, res) => {
  const { firstName, middleName, lastName, email, skills, duration, description } = req.body ?? {};

  if (!firstName || !lastName || !email) {
    res.status(400).json({ error: "First name, last name and email are required" });
    return;
  }

  const files = req.files as Record<string, Express.Multer.File[]> | undefined;

  // Parse previous internship entries from body (JSON-stringified array)
  let prevInternships: Array<{ company: string; duration: string }> = [];
  try {
    prevInternships = JSON.parse(req.body.prevInternships ?? "[]");
  } catch {
    prevInternships = [];
  }

  const skillList: string[] = Array.isArray(skills)
    ? skills
    : typeof skills === "string" && skills
    ? skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  // Build HTML for previous internships section
  const prevInternshipsHtml = prevInternships.length
    ? `
      <tr>
        <td colspan="2" style="padding:18px 0 6px;color:#64748b;font-weight:700;border-top:1px solid #f1f5f9;font-size:13px;text-transform:uppercase;letter-spacing:.05em;">
          Previous Internships
        </td>
      </tr>
      ${prevInternships
        .map(
          (p, i) => `
        <tr>
          <td colspan="2" style="padding:8px 0;border-top:1px solid #f1f5f9;">
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 18px;">
              <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#0f172a;">${i + 1}. ${p.company || "—"}</p>
              <p style="margin:0;font-size:13px;color:#64748b;">Duration: ${p.duration || "—"}</p>
            </div>
          </td>
        </tr>`
        )
        .join("")}
    `
    : "";

  // Build skill badges HTML
  const skillBadgesHtml = skillList.length
    ? skillList
        .map(
          (s) =>
            `<span style="display:inline-block;background:#eff6ff;color:#1d4ed8;padding:3px 12px;border-radius:20px;font-weight:700;font-size:12px;margin:2px 3px;">${s}</span>`
        )
        .join("")
    : "—";

  // Build SendGrid attachments
  const attachments: Array<{ content: string; filename: string; type: string; disposition: string }> = [];

  const resumeFiles = files?.["resume"];
  if (resumeFiles?.[0]) {
    attachments.push({
      content: resumeFiles[0].buffer.toString("base64"),
      filename: resumeFiles[0].originalname,
      type: resumeFiles[0].mimetype,
      disposition: "attachment",
    });
  }

  prevInternships.forEach((_, i) => {
    const certFiles = files?.[`expCert_${i}`];
    if (certFiles?.[0]) {
      attachments.push({
        content: certFiles[0].buffer.toString("base64"),
        filename: `ExpCert_${i + 1}_${certFiles[0].originalname}`,
        type: certFiles[0].mimetype,
        disposition: "attachment",
      });
    }
  });

  const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    await client.send({
      from: fromEmail,
      to: TO,
      replyTo: email,
      subject: `Internship Application — ${fullName}`,
      attachments,
      html: `
        <div style="font-family:Inter,system-ui,sans-serif;max-width:620px;margin:0 auto;background:#f8fafc;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1e40af,#4f46e5);padding:32px 40px;">
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Internship Application — Anantify AI</h1>
            <p style="color:#bfdbfe;margin:6px 0 0;font-size:13px;">Submitted via the Internship form</p>
          </div>
          <div style="padding:36px 40px;background:#fff;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="padding:10px 0;color:#64748b;font-weight:600;width:160px;">Full Name</td>
                <td style="padding:10px 0;color:#0f172a;font-weight:500;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Email</td>
                <td style="padding:10px 0;border-top:1px solid #f1f5f9;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Duration</td>
                <td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;">${duration || "—"}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;vertical-align:top;">Skills</td>
                <td style="padding:10px 0;border-top:1px solid #f1f5f9;">${skillBadgesHtml}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Resume</td>
                <td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;">${resumeFiles?.[0] ? resumeFiles[0].originalname + " (attached)" : "Not provided"}</td>
              </tr>
              ${description ? `
              <tr>
                <td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;vertical-align:top;">About</td>
                <td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;line-height:1.6;">${String(description).replace(/\n/g, "<br/>")}</td>
              </tr>` : ""}
              ${prevInternshipsHtml}
            </table>
          </div>
          <div style="padding:20px 40px;background:#f8fafc;text-align:center;font-size:12px;color:#94a3b8;">Anantify AI · rahul.sahu1995@gmail.com</div>
        </div>`,
    });

    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err?.response?.body?.errors?.[0]?.message ?? err?.message ?? "Failed to send application" });
  }
});

export default router;

// import { Router } from "express";
// import multer from "multer";
// import { getUncachableEmailClient } from "../lib/sendgrid";

// const router = Router();
// const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// const TO = "rahul.sahu1995@gmail.com";

// const uploadFields = upload.fields([
//   { name: "resume", maxCount: 1 },
//   { name: "expCert_0", maxCount: 1 },
//   { name: "expCert_1", maxCount: 1 },
//   { name: "expCert_2", maxCount: 1 },
//   { name: "expCert_3", maxCount: 1 },
//   { name: "expCert_4", maxCount: 1 },
// ]);

// router.post("/internship", uploadFields, async (req, res) => {
//   const { firstName, middleName, lastName, email, skills, duration, description } = req.body ?? {};

//   if (!firstName || !lastName || !email) {
//     res.status(400).json({ error: "First name, last name and email are required" });
//     return;
//   }

//   const files = req.files as Record<string, Express.Multer.File[]> | undefined;

//   // Parse previous internship entries from body (JSON-stringified array)
//   let prevInternships: Array<{ company: string; duration: string }> = [];
//   try {
//     prevInternships = JSON.parse(req.body.prevInternships ?? "[]");
//   } catch {
//     prevInternships = [];
//   }

//   const skillList: string[] = Array.isArray(skills)
//     ? skills
//     : typeof skills === "string" && skills
//     ? skills.split(",").map((s: string) => s.trim()).filter(Boolean)
//     : [];

//   // Build HTML for previous internships section
//   const prevInternshipsHtml = prevInternships.length
//     ? `
//       <tr>
//         <td colspan="2" style="padding:18px 0 6px;color:#64748b;font-weight:700;border-top:1px solid #f1f5f9;font-size:13px;text-transform:uppercase;letter-spacing:.05em;">
//           Previous Internships
//         </td>
//       </tr>
//       ${prevInternships
//         .map(
//           (p, i) => `
//         <tr>
//           <td colspan="2" style="padding:8px 0;border-top:1px solid #f1f5f9;">
//             <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 18px;">
//               <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#0f172a;">${i + 1}. ${p.company || "—"}</p>
//               <p style="margin:0;font-size:13px;color:#64748b;">Duration: ${p.duration || "—"}</p>
//             </div>
//           </td>
//         </tr>`
//         )
//         .join("")}
//     `
//     : "";

//   // Build skill badges HTML
//   const skillBadgesHtml = skillList.length
//     ? skillList
//         .map(
//           (s) =>
//             `<span style="display:inline-block;background:#eff6ff;color:#1d4ed8;padding:3px 12px;border-radius:20px;font-weight:700;font-size:12px;margin:2px 3px;">${s}</span>`
//         )
//         .join("")
//     : "—";

//   // 🟢 Nodemailer compatible attachments list
//   const attachments: Array<{ filename: string; content: Buffer; contentType: string }> = [];

//   const resumeFiles = files?.["resume"];
//   if (resumeFiles?.[0]) {
//     attachments.push({
//       filename: resumeFiles[0].originalname,
//       content: resumeFiles[0].buffer,
//       contentType: resumeFiles[0].mimetype,
//     });
//   }

//   prevInternships.forEach((_, i) => {
//     const certFiles = files?.[`expCert_${i}`];
//     if (certFiles?.[0]) {
//       attachments.push({
//         filename: `ExpCert_${i + 1}_${certFiles[0].originalname}`,
//         content: certFiles[0].buffer,
//         contentType: certFiles[0].mimetype,
//       });
//     }
//   });

//   const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

//   try {
//     // 🟢 Nodemailer Client Init
//     const { transporter, fromEmail } = await getUncachableEmailClient();
    
//     await transporter.sendMail({
//       from: `"${fullName}" <${fromEmail}>`,
//       to: TO,
//       replyTo: email,
//       subject: `Internship Application — ${fullName}`,
//       attachments, // Attachments yahan pass ho rahe hain
//       html: `
//         <div style="font-family:Inter,system-ui,sans-serif;max-width:620px;margin:0 auto;background:#f8fafc;border-radius:16px;overflow:hidden;">
//           <div style="background:linear-gradient(135deg,#1e40af,#4f46e5);padding:32px 40px;">
//             <h1 style="color:#fff;margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Internship Application — Anantify AI</h1>
//             <p style="color:#bfdbfe;margin:6px 0 0;font-size:13px;">Submitted via the Internship form</p>
//           </div>
//           <div style="padding:36px 40px;background:#fff;">
//             <table style="width:100%;border-collapse:collapse;font-size:14px;">
//               <tr>
//                 <td style="padding:10px 0;color:#64748b;font-weight:600;width:160px;">Full Name</td>
//                 <td style="padding:10px 0;color:#0f172a;font-weight:500;">${fullName}</td>
//               </tr>
//               <tr>
//                 <td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Email</td>
//                 <td style="padding:10px 0;border-top:1px solid #f1f5f9;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td>
//               </tr>
//               <tr>
//                 <td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Duration</td>
//                 <td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;">${duration || "—"}</td>
//               </tr>
//               <tr>
//                 <td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;vertical-align:top;">Skills</td>
//                 <td style="padding:10px 0;border-top:1px solid #f1f5f9;">${skillBadgesHtml}</td>
//               </tr>
//               <tr>
//                 <td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;">Resume</td>
//                 <td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;">${resumeFiles?.[0] ? resumeFiles[0].originalname + " (attached)" : "Not provided"}</td>
//               </tr>
//               ${description ? `
//               <tr>
//                 <td style="padding:10px 0;color:#64748b;font-weight:600;border-top:1px solid #f1f5f9;vertical-align:top;">About</td>
//                 <td style="padding:10px 0;color:#0f172a;border-top:1px solid #f1f5f9;line-height:1.6;">${String(description).replace(/\n/g, "<br/>")}</td>
//               </tr>` : ""}
//               ${prevInternshipsHtml}
//             </table>
//           </div>
//           <div style="padding:20px 40px;background:#f8fafc;text-align:center;font-size:12px;color:#94a3b8;">Anantify AI · ${TO}</div>
//         </div>`,
//     });

//     res.json({ ok: true });
//   } catch (err: any) {
//     console.error("internship email error:", err?.message || err);
//     res.status(500).json({ error: err?.message || "Failed to send application" });
//   }
// });

// export default router;