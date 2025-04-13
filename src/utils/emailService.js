import nodemailer from 'nodemailer';
import postmark from 'postmark';

// Erstelle den Postmark Transporter
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// Funktion zum Senden der E-Mail
export const sendNotificationEmail = async (to, time, subject) => {
  // Logge die Daten, die gesendet werden
  console.log(`Sende E-Mail an: ${to}, mit der Zeit: ${time}, Betreff: ${subject}`);

  // Postmark E-Mail-Inhalt
  const message = {
    From: 'sim210485@spengergasse.at',  // Deine verifizierte Postmark-E-Mail-Adresse
    To: to,                         // Empfänger-E-Mail-Adresse
    Subject: subject || 'Deine tägliche SoulCare-Erinnerung',  // Betreff
    HtmlBody: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                 <h2 style="color: #333;">Zeit für deine Reflexion!</h2>
                 <p>Hallo,</p>
                 <p>Dies ist eine Erinnerung, dass es jetzt <strong>${time}</strong> ist und du dir einen Moment für dich selbst nehmen kannst.</p>
                 <p>Bleib achtsam,</p>
                 <p style="color: #5e9c76;">💚 Dein SoulCare Team</p>
               </div>`, // HTML-Inhalt
    TextBody: `Dies ist eine Erinnerung: Es ist jetzt ${time}.`, // Text-Inhalt (für E-Mail-Clients, die keine HTML-E-Mails unterstützen)
  };

  try {
    const info = await client.sendEmail(message);
    console.log('E-Mail erfolgreich gesendet:', info);
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    throw error;  // Werfe den Fehler weiter, falls etwas schiefgeht
  }
};
