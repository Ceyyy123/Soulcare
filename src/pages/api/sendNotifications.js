import { sendNotificationEmail } from '../../utils/emailService';  // Importiere die E-Mail-Funktion
import dbConnect from '../../utils/dbConnect';  // Importiere die Funktion zum Verbinden mit der DB
import User from '../../models/User';  // Importiere das Mongoose Modell für den User

export default async function handler(req, res) {
  // Prüfe, ob die Anfrage ein GET-Request ist
  if (req.method === 'GET') {
    try {
      // Stelle eine Verbindung zur MongoDB her
      await dbConnect();

      // Hol alle Benutzer, die E-Mails erhalten möchten
      const users = await User.find({ wantMail: true });

      // Iteriere durch die Benutzer und sende eine Benachrichtigungs-E-Mail
      for (const user of users) {
        const { email, notificationTimes } = user;

        // Hole die aktuelle Zeit
        const now = new Date();
        const currentHour = now.getHours();  // Extrahiere die Stunden
        const currentMinute = now.getMinutes();  // Extrahiere die Minuten
        const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;  // Formatiere die Zeit im Format HH:mm

        // Überprüfe, ob die aktuelle Zeit mit den gespeicherten Benachrichtigungszeiten übereinstimmt
        if (notificationTimes.includes(currentTime)) {
          console.log(`Sende E-Mail an ${email} für Zeit: ${currentTime}`);  // Logge die E-Mail-Adresse und die Zeit
          // Sende die E-Mail
          await sendNotificationEmail(email, currentTime, 'Deine tägliche Erinnerung');
        }
      }

      // Erfolgreiche Antwort nach dem Senden der E-Mails
      res.status(200).json({ message: 'E-Mails erfolgreich gesendet!' });
    } catch (error) {
      // Fehlerbehandlung, falls etwas schiefgeht
      console.error('Fehler beim Senden der E-Mail:', error);
      res.status(500).json({ message: 'Fehler beim Senden der E-Mail', error: error.message });
    }
  } else {
    // Fehlercode 405, falls eine andere HTTP-Methode als GET verwendet wird
    res.status(405).json({ message: 'Methode nicht erlaubt' });
  }
}
