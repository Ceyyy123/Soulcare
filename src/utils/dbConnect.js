import mongoose from 'mongoose';

// Deine MongoDB-Verbindungs-URI
const MONGODB_URI = process.env.MONGO_URL;  // Stelle sicher, dass dies in deiner .env-Datei definiert ist

if (!MONGODB_URI) {
  throw new Error('Bitte stelle sicher, dass die MongoDB URI in deiner .env-Datei definiert ist.');
}

let isConnected = false; // Um doppelte Verbindungen zu verhindern

const dbConnect = async () => {
  if (isConnected) {
    console.log('Datenbank bereits verbunden');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Datenbank erfolgreich verbunden');
  } catch (error) {
    console.error('Datenbank-Verbindungsfehler:', error);
    throw new Error('Fehler bei der Verbindung zur MongoDB');
  }
};

export default dbConnect;
