const express = require("express");
import { connectToDatabase } from '../../lib/mongodb'; // MongoDB-Verbindung
const router = express.Router();

// Abrufen der Einträge
router.get('/', async (req, res) => {
  const { date } = req.query;
  try {
    const { db } = await connectToDatabase();
    const entries = await db.collection('journal').find({ date }).toArray();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Einträge' });
  }
});

// Erstellen eines neuen Eintrags
router.post('/', async (req, res) => {
  const { date, content } = req.body;
  try {
    const { db } = await connectToDatabase();
    const newEntry = { date, content };
    await db.collection('journal').insertOne(newEntry);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Speichern des Eintrags' });
  }
});

export default router;
