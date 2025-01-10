import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
  await connectToDatabase();
  if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}
