import nodemailer from "nodemailer";
import { otpEmailHtml } from "./otpHtmlEmail.js";

// Function to send email
export const sendEmail = async (email, otp) => {
  // Implementation for sending email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nadayehia1998@gmail.com",
      pass: "ygtufvbfsmdgwpif",
    },
  });

  const info = await transporter.sendMail({
    from: '"JobSearchApp Admin" <nadayehia1998@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "OTP Forget Password", // Subject line
    html: otpEmailHtml(otp), // html body
  });
  console.log("Message sent: %s", info.messageId);
};
