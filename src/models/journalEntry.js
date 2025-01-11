// Importiert mongoose, um mit der MongoDB-Datenbank zu interagieren
import mongoose from "mongoose";

// Definiere das Journal-Schema, das die Struktur für die Journal-Einträge festlegt
const journalSchema = new mongoose.Schema({
  date: { 
    type: Date,  // Speichert das Datum als Date-Typ in der MongoDB
    required: true  // Stellt sicher, dass das Datum ein Pflichtfeld ist
  },
  content: { 
    type: String,  // Speichert den Inhalt des Journal-Eintrags als String
    required: true  // Stellt sicher, dass der Inhalt ein Pflichtfeld ist
  }
});

// Stellt sicher, dass das Modell nur einmal erstellt wird, auch wenn der Code mehrmals aufgerufen wird
const Journal = mongoose.models.Journal || mongoose.model("Journal", journalSchema);

// Exportiert das Modell, damit es in anderen Dateien verwendet werden kann
export default Journal;
