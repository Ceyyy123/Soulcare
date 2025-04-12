// Importiert das User-Modell, bcrypt und die Funktion zum Verbinden mit der MongoDB-Datenbank
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/mongodb';

export default async function handler(req, res) {
  // Stellt eine Verbindung zur Datenbank her
  await connectToDatabase();

  if (req.method === 'POST') {
    const { email, password, wantMail, notificationTimes } = req.body;

    // wantMail absichern, da es als Boolean oder String kommen kann
    const wantMailValue = wantMail === true || wantMail === "true";

    console.log("Eingehende Registrierung:", { email, wantMail, notificationTimes });

    try {
      // Überprüfen, ob der Benutzer bereits existiert
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Benutzer existiert bereits' });
      }

      // Passwort hashen
      const hashedPassword = await bcrypt.hash(password, 10);

      // Validierung der Erinnerungszeiten, wenn aktiviert
      if (wantMailValue) {
        if (!notificationTimes || notificationTimes.length !== 2) {
          return res.status(400).json({ error: 'Bitte genau zwei Zeiten auswählen.' });
        }

        const [time1, time2] = notificationTimes.map((time) => {
          const [hours, minutes] = time.split(":").map(Number);
          return hours + minutes / 60;
        });

        const diff = Math.abs(time1 - time2);
        if (diff < 11.99 || diff > 12.01) {
          return res.status(400).json({ error: 'Die Zeiten müssen genau 12 Stunden auseinander liegen.' });
        }
      }

      // Benutzer erstellen
      const newUser = new User({
        email,
        password: hashedPassword,
        wantMail: wantMailValue,
        notificationTimes: wantMailValue ? notificationTimes : undefined,
      });

      await newUser.save();

      res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
    } catch (error) {
      console.error("Fehler bei der Registrierung:", error);
      res.status(500).json({ error: 'Fehler bei der Registrierung des Benutzers' });
    }
  } else {
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}
