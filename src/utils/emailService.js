import nodemailer from 'nodemailer';

// SMTP-Transporter für Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Gmail SMTP
  auth: {
    user: process.env.EMAIL_USER,  // Deine Gmail-Adresse
    pass: process.env.EMAIL_PASS,  // Dein App-Passwort für Gmail (nicht das normale Gmail-Passwort)
  },
});

// Funktion zum Senden von E-Mails
export const sendNotificationEmail = async (to, time, subject) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,  // Deine Gmail-Adresse
    to: to,  // Empfänger-E-Mail-Adresse
    subject: subject || 'Deine tägliche Erinnerung',  // Betreff
    text: `Dies ist eine Erinnerung: Es ist jetzt ${time}.`,  // Text-Inhalt
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-Mail erfolgreich gesendet:', info.response);
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    throw error;
  }
};
