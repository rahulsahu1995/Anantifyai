import sgMail from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.SENDGRID_FROM_EMAIL;

if (!apiKey) {
  console.error("❌ ERROR: SENDGRID_API_KEY is missing in your environment variables!");
} else {
  sgMail.setApiKey(apiKey);
}

export async function getUncachableSendGridClient() {
  if (!apiKey) {
    throw new Error("SendGrid API Key is not configured in environment variables.");
  }

  return {
    client: sgMail,     
    fromEmail: fromEmail
  };
}






















// import nodemailer from "nodemailer";

// export async function getUncachableEmailClient() {
//   const emailUser = process.env.EMAIL_USER;
//   const emailPass = process.env.EMAIL_PASS;

//   if (!emailUser || !emailPass) {
//     throw new Error("EMAIL_USER or EMAIL_PASS missing in environment variables");
//   }

// Nodemailer transport for Gmail
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

//   return { transporter, fromEmail: emailUser };
// }
