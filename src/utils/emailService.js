// utils/emailService.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail.gmx.net',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendNotificationEmail = async (to, time, subject = 'Deine tägliche Erinnerung') => {
  const mailOptions = {
    from: `"SoulCare" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: `Hallo,dies ist deine persönliche Erinnerung von SoulCare. Es ist jetzt ${time} Uhr, ein guter Moment, um kurz innezuhalten und dir etwas Gutes zu tun. Bleib achtsam und nimm dir Zeit für dich. Dein SoulCare-Team <3`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 E-Mail an ${to} gesendet: ${info.response}`);
  } catch (err) {
    console.error(`❌ Fehler beim Senden an ${to}:`, err.message);
    throw err;
  }
};
