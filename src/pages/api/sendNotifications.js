import { sendNotificationEmail } from '../../utils/emailService'; // Deine E-Mail-Funktion
import dbConnect from '../../utils/dbConnect'; // Deine Funktion zum Verbinden mit der DB
import User from '../../models/User'; // Dein Mongoose Modell für den User

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Stelle eine Verbindung zur Datenbank her
      await dbConnect();

      // Hole die Benutzer, die E-Mails erhalten möchten
      const users = await User.find({ wantMail: true });

      // Iteriere durch die Benutzer und sende die Benachrichtigungs-E-Mails
      for (const user of users) {
        const { email, notificationTimes } = user;

        // Vergleiche die aktuelle Zeit mit den gespeicherten Benachrichtigungszeiten
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, "0") + ':' + now.getMinutes().toString().padStart(2, "0");

        // Sende die E-Mail, wenn die gespeicherte Zeit mit der aktuellen Zeit übereinstimmt
        if (notificationTimes.includes(currentTime)) {
          await sendNotificationEmail(email, currentTime, 'Deine tägliche Erinnerung');
        }
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
