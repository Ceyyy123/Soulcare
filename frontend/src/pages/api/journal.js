const express = require('express');
const router = express.Router();
const Journal = require('../models/JournalEntry');

// GET Route zum Abrufen von Journal-Einträgen basierend auf dem Datum
router.get('/', async (req, res, next) => {
  const { date } = req.query;
  try {
    const entries = await Journal.find({ date: date });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Einträge' });
  }
});

module.exports = router;
