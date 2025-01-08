const express = require('express');
const Journal = require('../models/JournalEntry'); // Pfad anpassen
const router = express.Router();

// GET Route zum Abrufen von Journal-Einträgen basierend auf dem Datum
router.get('/', async (req, res) => {
  console.log(req);
  console.log(res);
  const { date } = req.query;
  try {
    console.log(date);
    const entries = await Journal.find({ date: date });
    console.log(entries);
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Einträge' });
  }
});

// POST Route zum Erstellen eines neuen Journal-Eintrags
router.post('/', async (req, res) => {
  const { date, content } = req.body;
  try {
    const newEntry = new Journal({ date, content });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Speichern des Eintrags' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Journal.findByIdAndDelete(id);
    res.status(200).json({ message: 'Eintrag erfolgreich gelöscht' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Löschen des Eintrags' });
  }
});


module.exports = router;
