import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📩 Funktion zum Senden einer personalisierten E-Mail
export const sendNotificationEmail = async (to, time) => {
  try {
    const mailOptions = {
      from: `"SoulCare Team" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Deine tägliche SoulCare-Erinnerung",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <h2> Zeit für deine Reflexion!</h2>
          <p>Hallo,</p>
          <p>Dies ist eine kleine Erinnerung, dass es jetzt <strong>${time}</strong> ist und du dir einen Moment für dich selbst nehmen kannst. 🧘‍♀️</p>
          <p>Bleib achtsam,</p>
          <p>💚 Dein SoulCare Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`E-Mail erfolgreich an ${to} um ${time} gesendet.`);
  } catch (error) {
    console.error(`Fehler beim Senden der E-Mail an ${to}:`, error);
  }
};
