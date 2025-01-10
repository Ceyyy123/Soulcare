// models/Journal.js
import mongoose from "mongoose";

// Definiere das Journal-Schema
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

// Stellt sicher, dass das Modell nur einmal erstellt wird
const Journal = mongoose.models.Journal || mongoose.model("Journal", journalSchema);

export default Journal;
