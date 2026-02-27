import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Configure SMTP transporter
      // Using Netease Enterprise Mail (qiye.163.com)
      const transporter = nodemailer.createTransport({
        host: "smtphz.qiye.163.com", // Common host for Netease Enterprise Mail
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER || "***REMOVED***",
          pass: process.env.SMTP_PASS || "***REMOVED***",
        },
      });

      // Send email to self
      const info = await transporter.sendMail({
        from: `"Maxproof Contact Form" <${process.env.SMTP_USER || "***REMOVED***"}>`, // sender address
        to: process.env.SMTP_USER || "***REMOVED***", // list of receivers (self)
        subject: `New Contact Form Submission from ${name}`, // Subject line
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `, // html body
      });

      console.log("Message sent: %s", info.messageId);
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
