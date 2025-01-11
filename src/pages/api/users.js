const express = require('express');
const User = require('../../models/User'); // Modell für die Benutzer
const bcrypt = require('bcryptjs'); // Für die Passwort-Hashing-Funktionalität
const jwt = require('jsonwebtoken'); // Für die Erstellung von JWTs (JSON Web Tokens)
const router = express.Router();  // Router-Instanz von Express

// Benutzer-Registrierung
router.post('/signup', async (req, res) => {
  const { email, password } = req.body; // Extrahiert E-Mail und Passwort aus der Anfrage

  try {
    // Überprüfen, ob der Benutzer bereits existiert
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Wenn der Benutzer bereits existiert, wird ein Fehler zurückgegeben
      return res.status(400).json({ error: 'Benutzer existiert bereits' });
    }

    // Passwort hashen: Sichere Speicherung des Passworts
    const hashedPassword = await bcrypt.hash(password, 10); // 10 ist die Anzahl der Salting-Runden

    // Neuen Benutzer erstellen
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save(); // Speichert den neuen Benutzer in der Datenbank

    // Erfolgreiche Registrierung: Erfolgsnachricht zurückgeben
    res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
  } catch (error) {
    // Fehlerbehandlung bei der Registrierung
    res.status(500).json({ error: 'Fehler bei der Registrierung des Benutzers' });
  }
});

// Benutzer-Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Extrahiert E-Mail und Passwort aus der Anfrage

  try {
    // Überprüfen, ob der Benutzer existiert
    const user = await User.findOne({ email });
    if (!user) {
      // Falls der Benutzer nicht gefunden wird, wird eine Fehlermeldung zurückgegeben
      return res.status(400).json({ error: 'Ungültige Anmeldedaten' });
    }

    // Passwort überprüfen: Vergleicht das eingegebene Passwort mit dem gehashten Passwort
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Falls das Passwort nicht übereinstimmt, wird eine Fehlermeldung zurückgegeben
      return res.status(400).json({ error: 'Ungültige Anmeldedaten' });
    }

    // JWT erstellen: Erzeugt ein Token mit der Benutzer-ID und einem Ablaufdatum
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',  // Das Token läuft nach 1 Stunde ab
    });

    // Erfolgreiches Login: Gibt das Token und eine Erfolgsnachricht zurück
    res.status(200).json({ token, message: 'Login erfolgreich' });
  } catch (error) {
    // Fehlerbehandlung beim Login
    res.status(500).json({ error: 'Fehler beim Login' });
  }
});

// Route zum Abrufen von Benutzerinformationen
router.get('/me', async (req, res) => {
  // Holt den Authorization-Header aus der Anfrage
  const authHeader = req.headers.authorization;

  // Überprüfen, ob der Authorization-Header vorhanden und korrekt formatiert ist
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Nicht autorisiert' });
  }

  // Extrahiert das Token aus dem Authorization-Header
  const token = authHeader.split(' ')[1];

  try {
    // Verifiziert das Token, um die Benutzer-ID zu extrahieren
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Sucht den Benutzer in der Datenbank anhand der extrahierten Benutzer-ID
    const user = await User.findById(decoded.userId).select('-password'); // Passwort wird nicht zurückgegeben

    // Gibt die Benutzerdaten zurück (ohne Passwort)
    res.status(200).json(user);
  } catch (error) {
    // Fehlerbehandlung bei der Token-Verifizierung oder Datenbankabfrage
    res.status(401).json({ error: 'Ungültiges Token' });
  }
});

module.exports = router;  // Exportiert die Routen für die Verwendung in anderen Dateien
