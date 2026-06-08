import nodemailer from 'nodemailer';
import 'dotenv/config';

// Ensure you have SMTP_USER and SMTP_PASS in your .env file
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use host/port if not using Gmail
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // App password
  },
});

export async function sendLeadEmail(entry) {
  const { name, email, phone, message, projectType, budget } = entry;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: 'brandspire2026@gmail.com', // Sending directly to this email
    subject: `New Lead: ${name} (${projectType || 'General Inquiry'})`,
    text: `
You have received a new contact submission on the BrandSpire website.

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Project Type: ${projectType || 'N/A'}
Budget: ${budget || 'N/A'}

Message:
${message}

-------------------
Submission ID: ${entry.id}
Date: ${entry.receivedAt}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[mail] Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('[mail] Error sending email:', error);
    return false;
  }
}
