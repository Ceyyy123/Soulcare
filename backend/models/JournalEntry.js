const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  date: { 
    type: Date,  // Speichert das Datum als Date-Typ
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  }
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
