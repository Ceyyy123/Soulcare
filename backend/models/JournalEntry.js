const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    date: { type: String, required: true }, 
    content: { type: String, required: true },
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
