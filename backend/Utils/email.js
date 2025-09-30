// Utils/email.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pabodhavidumina@gmail.com",
    pass: "cvub eale qnyy yqpc", // ← App Password එක මෙතන paste කරන්න (space නැතිව)
  },
  // debug options (optional)
  logger: true,
  debug: true
});

// verify transporter immediately on start (will print error if auth wrong)
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Nodemailer transporter verify failed:", err);
  } else {
    console.log("✅ Nodemailer transporter is ready to send messages");
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"INTERNOVA" <pabodhavidumina@gmail.com>', // must match auth user
      to,
      subject,
      text,
    });
    console.log("📧 Email sent:", info.messageId, "to:", to);
    return info;
  } catch (err) {
    console.error("❌ sendEmail error:", err);
    throw err; // re-throw so caller can see error
  }
};

module.exports = sendEmail;
