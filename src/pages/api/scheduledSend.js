// api/scheduledSend.js
import { sendNotificationEmail } from '../../utils/emailService';
import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Verbindung zur DB herstellen
      await dbConnect();

      // Hol die Benutzer, die E-Mails erhalten möchten
      const users = await User.find({ wantMail: true });

      // Iteriere durch die Benutzer und sende die Benachrichtigungs-E-Mails
      for (const user of users) {
        const { email, notificationTimes } = user;

        // Sende die E-Mail für jede Zeit, die in der DB gespeichert ist
        notificationTimes.forEach(async (time) => {
          // Logik für den Versand zur festgelegten Zeit, z. B. Mit Cron oder setTimeout
          await sendNotificationEmail(email, time, 'Deine tägliche Erinnerung');
        });
      }

      res.status(200).json({ message: 'E-Mails erfolgreich gesendet!' });
    } catch (error) {
      console.error('Fehler beim Senden der E-Mail:', error);
      res.status(500).json({ message: 'Fehler beim Senden der E-Mail', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Methode nicht erlaubt' });
  }
}
