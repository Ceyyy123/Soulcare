// pages/api/scheduledSend.js
import dbConnect from '../../utils/dbConnect.js';
import { sendNotificationEmail } from '../../utils/emailService.js';
import User from '../../models/User.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Methode nicht erlaubt' });
  }

  try {
    await dbConnect();

    const users = await User.find({ wantMail: true });
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // lokale Zeit im Format HH:MM

    console.log('scheduledSend wurde aufgerufen');
    console.log('Aktuelle lokale Zeit:', currentTime);
    console.log('Benutzer aus DB geladen:', users.length);

    if (users.length === 0) {
      console.log('Keine Benutzer mit wantMail: true gefunden');
    }

    for (const user of users) {
      const { email, notificationTimes } = user;

      console.log('---');
      console.log('Benutzer:', email);
      console.log('Gespeicherte Zeiten:', notificationTimes);
      console.log('Aktuelle Zeit:', currentTime);

      if (notificationTimes.includes(currentTime)) {
        console.log('Zeit stimmt überein. E-Mail wird gesendet an', email);
        await sendNotificationEmail(email, currentTime);
      } else {
        console.log('Zeit stimmt nicht überein.');
      }
    }

    res.status(200).json({ message: 'E-Mails wurden geprüft und ggf. versendet.' });
  } catch (err) {
    console.error('Fehler in scheduledSend:', err.message);
    res.status(500).json({ message: 'Fehler beim E-Mail-Versand', error: err.message });
  }
}
