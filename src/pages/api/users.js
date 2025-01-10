const express = require('express');
const User = require('../../models/User'); // Modell für die Benutzer
const bcrypt = require('bcryptjs'); // Für die Passwort-Hashing-Funktionalität
const jwt = require('jsonwebtoken'); // Für die Erstellung von JWTs
const router = express.Router();

// Benutzer-Registrierung
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Überprüfen, ob der Benutzer bereits existiert
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Benutzer existiert bereits' });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Neuen Benutzer erstellen
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler bei der Registrierung des Benutzers' });
  }
});

// Benutzer-Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Benutzer suchen
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Ungültige Anmeldedaten' });
    }

    // Passwort überprüfen
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Ungültige Anmeldedaten' });
    }

    // JWT erstellen
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, message: 'Login erfolgreich' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Login' });
  }
});

// Route zum Abrufen von Benutzerinformationen
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Nicht autorisiert' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password'); // Passwort ausblenden
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: 'Ungültiges Token' });
  }
});

module.exports = router;
