const express = require('express');
const Journal = require('../models/JournalEntry');
const router = new express.Router();

// GET Route zum Abrufen von Journal-Einträgen basierend auf dem Datum
router.get('/journal', async (req, res) => {
  const { date } = req.query;
  try {
    const entries = await Journal.find({ date: date });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Einträge' });
  }
});

module.exports = router;
