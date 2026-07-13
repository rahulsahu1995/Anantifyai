// import sgMail from "@sendgrid/mail";

// let connectionSettings: any;

// async function getCredentials() {
//   const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
//   const xReplitToken = process.env.REPL_IDENTITY
//     ? "repl " + process.env.REPL_IDENTITY
//     : process.env.WEB_REPL_RENEWAL
//     ? "depl " + process.env.WEB_REPL_RENEWAL
//     : null;

//   if (!xReplitToken) throw new Error("X-Replit-Token not found");

//   connectionSettings = await fetch(
//     "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=sendgrid",
//     {
//       headers: {
//         Accept: "application/json",
//         "X-Replit-Token": xReplitToken,
//       },
//     }
//   )
//     .then((r) => r.json())
//     .then((data) => data.items?.[0]);

//   if (!connectionSettings?.settings?.api_key || !connectionSettings?.settings?.from_email) {
//     throw new Error("SendGrid not connected — api_key or from_email missing");
//   }

//   return {
//     apiKey: connectionSettings.settings.api_key as string,
//     fromEmail: connectionSettings.settings.from_email as string,
//   };
// }

// // WARNING: Never cache this client — API keys can rotate.
// export async function getUncachableSendGridClient() {
//   const { apiKey, fromEmail } = await getCredentials();
//   sgMail.setApiKey(apiKey);
//   return { client: sgMail, fromEmail };
// }




import nodemailer from "nodemailer";

export async function getUncachableEmailClient() {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    throw new Error("EMAIL_USER or EMAIL_PASS missing in environment variables");
  }

  // Nodemailer transport for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

  return { transporter, fromEmail: emailUser };
}
