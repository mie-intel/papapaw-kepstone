import "dotenv/config";

import nodemailer from "nodemailer";
import render_email from "./render-email.js";
export async function postEmail(name, email, details) {
  try {
    const transporter = nodemailer.createTransport({
      //   service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Report Approval Confirmation",
      html: render_email(name, details),
    };

    // // console.log(mailOptions);

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return; // console.log(error);
      }
      // console.log("Message sent: %s", info.messageId);
    });
  } catch (error) {
    // Tangani kemungkinan error
    // console.error("Email gagal dikirim", error);
  }
}
