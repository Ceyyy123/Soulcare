// Importiert das User-Modell, bcrypt und die Funktion zum Verbinden mit der MongoDB-Datenbank
import User from '../../../models/User';  // User-Modell zum Erstellen und Verwalten von Benutzer-Dokumenten in der MongoDB
import bcrypt from 'bcryptjs';  // Bcrypt für das Hashen von Passwörtern
import connectToDatabase from '../../../lib/mongodb';  // Funktion zum Verbinden mit der MongoDB-Datenbank

// Der Haupt-Handler für den Benutzer-Registrierungsprozess
export default async function handler(req, res) {
  // Stellt eine Verbindung zur Datenbank her
  await connectToDatabase();

  // Überprüft, ob es sich um eine POST-Anfrage handelt, die zum Erstellen eines neuen Benutzers dient
  if (req.method === 'POST') {
    const { email, password } = req.body;  // Entpackt die E-Mail und das Passwort aus der Anfrage

    try {
      // Überprüfen, ob der Benutzer mit der angegebenen E-Mail bereits existiert
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // Wenn der Benutzer bereits existiert, gibt es einen Fehler zurück
        return res.status(400).json({ error: 'Benutzer existiert bereits' });
      }

      // Wenn der Benutzer nicht existiert, wird das Passwort gehasht, um es sicher zu speichern
      const hashedPassword = await bcrypt.hash(password, 10);  // 10 ist die Anzahl der Salting-Runden

      // Erstelle ein neues Benutzer-Dokument
      const newUser = new User({ email, password: hashedPassword });

      // Speichert den neuen Benutzer in der Datenbank
      await newUser.save();

      // Erfolgreiche Registrierung: Gibt eine Bestätigungsmeldung zurück
      res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
    } catch (error) {
      // Wenn ein Fehler auftritt (z.B. bei der Speicherung in der Datenbank), wird dieser Fehler zurückgegeben
      res.status(500).json({ error: 'Fehler bei der Registrierung des Benutzers' });
    }
  } else {
    // Wenn die HTTP-Methode nicht POST ist, gibt es einen Fehler zurück
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}
