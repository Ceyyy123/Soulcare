// Importiert benötigte Module
import bcrypt from 'bcryptjs'; // Zum Vergleichen von gehashten Passwörtern
import jwt from 'jsonwebtoken'; // Zum Erstellen von JWT-Token für die Authentifizierung
import User from '../../../models/User'; // Das User-Modell, um auf Benutzerdaten zuzugreifen
import connectToDatabase from '../../../lib/mongodb'; // Eine Funktion, um die Verbindung zur MongoDB-Datenbank herzustellen

// Haupt-Handler für die Authentifizierungs-API
export default async function handler(req, res) {
  // Stellt eine Verbindung zur Datenbank her
  await connectToDatabase();

  // Überprüft, ob es sich um eine POST-Anfrage handelt
  if (req.method === 'POST') {
    // Entpackt die E-Mail und das Passwort aus der Anfrage
    const { email, password } = req.body;

    // Überprüft, ob sowohl E-Mail als auch Passwort übermittelt wurden
    if (!email || !password) {
      return res.status(400).json({ error: 'Email und Passwort sind erforderlich.' });
    }

    try {
      // Sucht nach einem Benutzer mit der angegebenen E-Mail
      const user = await User.findOne({ email });
      // Wenn der Benutzer nicht gefunden wird, gibt es eine Fehlermeldung
      if (!user) {
        return res.status(401).json({ error: 'Benutzer nicht gefunden' });
      }

      // Vergleicht das eingegebene Passwort mit dem gehashten Passwort in der Datenbank
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      // Wenn das Passwort nicht übereinstimmt, gibt es eine Fehlermeldung
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: 'Ungültiges Passwort' });
      }

      // Wenn das Passwort korrekt ist, wird ein JWT-Token erstellt
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Setzt das Ablaufdatum des Tokens auf 1 Stunde
      });

      // Gibt das Token in der Antwort zurück
      res.status(200).json({ token });
    } catch (error) {
      // Falls ein Fehler auftritt (z.B. beim Zugriff auf die Datenbank), wird eine Fehlermeldung zurückgegeben
      res.status(500).json({ error: 'Fehler bei der Anmeldung' });
    }
  } else {
    // Falls die HTTP-Methode nicht POST ist, gibt es eine Fehlermeldung
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}
