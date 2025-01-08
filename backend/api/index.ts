const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const userRoutes = require('../routes/userRoutes'); // Routen für Benutzer (Registrierung, Login)
const journalRoutes = require('../routes/journalRoutes'); // Routen für Journal
require('dotenv').config(); // Lädt die .env-Datei

const fs = require('fs');

// Überprüfen, ob die .env-Datei existiert
/*if (!fs.existsSync('.env')) {
  console.error('.env-Datei wurde nicht gefunden!');
  process.exit(1); // Beendet den Prozess, wenn keine .env-Datei vorhanden ist
} else {
  console.log('Die .env-Datei existiert.');
}*/

// Überprüfen, ob die Umgebungsvariable MONGO_DB_URL definiert ist
const MONGO_URI = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/soulcare';
console.log('DB_URI:', MONGO_URI);

if (!process.env.MONGO_DB_URL) {
  console.error('Fehler: Die Umgebungsvariable MONGO_DB_URL ist nicht definiert.');
  console.error('Verwende Standardwert: mongodb://localhost:27017/soulcare');
}

// Express-App erstellen
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors()); // CORS-Problem lösen
//app.use(express.json()); // JSON-Parsing für eingehende Anfragen

// Verbindung zu MongoDB herstellen 
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB erfolgreich verbunden');
  })
  .catch((err) => {
    console.error('Fehler beim Verbinden zur MongoDB:', err.message);
    process.exit(1); // Beendet den Prozess bei Verbindungsfehler
  });

// Routen einbinden
app.use('/api/users', userRoutes); // Benutzerbezogene Routen
app.use('/api/journal', journalRoutes); // Journalbezogene Routen

// Standard-Route für die Verfügbarkeit
app.get('/', (req, res) => {
  res.send('Server läuft. Willkommen bei SoulCare API!');
});

// Server starten
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

module.exports = app;
