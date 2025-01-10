import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/mongodb';

export default async function handler(req, res) {
  await connectToDatabase();
  if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}