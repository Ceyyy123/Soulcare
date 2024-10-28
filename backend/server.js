const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Routen für Benutzer (Registrierung, Login)
const journalRoutes = require('./routes/journalRoutes'); // Routen für Journal
require('dotenv').config(); // .env-Datei laden

const app = express();

app.use(cors()); // CORS-Problem lösen
app.use(express.json());

// Mit MongoDB verbinden
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB verbunden');
}).catch(err => {
  console.error('Fehler beim Verbinden zur MongoDB:', err);
});

// Routen einbinden
app.use('/api/users', userRoutes); // Registrierung und Login Routen
app.use('/api/journal', journalRoutes); // Journal Routen

// Server starten
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
