import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import connectToDatabase from '../../../lib/mongodb';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email und Passwort sind erforderlich.' });
    }

    try {
      // Benutzer anhand der Email suchen
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Benutzer nicht gefunden' });
      }

      // Passwort mit dem gehashten in der DB vergleichen
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: 'Ungültiges Passwort' });
      }

      // JWT erstellen
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Optional: Token läuft nach 1 Stunde ab
      });

      // Token zurückgeben
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Fehler bei der Anmeldung' });
    }
  } else {
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}