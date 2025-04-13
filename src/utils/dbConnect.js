// utils/dbConnect.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URL;

if (!MONGODB_URI) {
  throw new Error('Fehlende MONGO_URL in .env-Datei.');
}

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB verbunden');
  } catch (err) {
    console.error('MongoDB-Verbindungsfehler:', err.message);
    throw err;
  }
};

export default dbConnect;
