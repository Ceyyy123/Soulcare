import jwt from 'jsonwebtoken';
import User from '../../models/User';
import connectToDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
  await connectToDatabase();
  if (req.method === 'GET') {
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
  } else {
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}
