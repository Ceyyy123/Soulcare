// utils/emailService.js
import nodemailer from 'nodemailer';

// Erstelle den Nodemailer Transporter mit SendGrid oder einem anderen externen Dienst
const transporter = nodemailer.createTransport({
  service: 'SendGrid',  // Du kannst 'SendGrid' verwenden oder deinen SMTP-Server angeben
  auth: {
    user: 'apikey',  // Verwende 'apikey' für SendGrid
    pass: process.env.SENDGRID_API_KEY,  // Dein SendGrid API-Schlüssel
  },
});

// Funktion zum Senden der E-Mail
export const sendNotificationEmail = async (to, time, subject) => {
  // Logge die Daten, die gesendet werden
  console.log(`Sende E-Mail an: ${to}, mit der Zeit: ${time}, Betreff: ${subject}`);

  const mailOptions = {
    from: 'soulcareorganisation@gmail.com',  // Deine verifizierte SendGrid E-Mail-Adresse
    to,                              // Empfänger-E-Mail-Adresse
    subject: subject || 'Deine tägliche SoulCare-Erinnerung',  // Betreff
    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
             <h2 style="color: #333;">Zeit für deine Reflexion!</h2>
             <p>Hallo,</p>
             <p>Dies ist eine Erinnerung, dass es jetzt <strong>${time}</strong> ist und du dir einen Moment für dich selbst nehmen kannst.</p>
             <p>Bleib achtsam,</p>
             <p style="color: #5e9c76;">💚 Dein SoulCare Team</p>
           </div>`,  // HTML-Inhalt
    text: `Dies ist eine Erinnerung: Es ist jetzt ${time}.`, // Text-Inhalt (für E-Mail-Clients, die keine HTML-E-Mails unterstützen)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-Mail erfolgreich gesendet:', info.response);  // Logge die erfolgreiche Antwort
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);  // Logge Fehler, falls welche auftreten
    throw error;  // Werfe den Fehler weiter, falls etwas schiefgeht
  }
};
