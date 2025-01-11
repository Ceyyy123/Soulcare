import mongoose from 'mongoose';

// Die URI für die Verbindung zur MongoDB-Datenbank, entweder aus der Umgebungsvariable oder mit einem Standardwert
const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/soulcare';

// Überprüft, ob die MongoDB URI korrekt gesetzt wurde
if (!MONGO_URI) {
  throw new Error('Fehler: MONGO_URL ist nicht definiert!');
}

// Caching: Verhindert, dass bei jeder Verbindung eine neue Verbindung zur Datenbank erstellt wird
let cached = global.mongoose;

// Überprüft, ob es bereits eine gecachte Verbindung gibt, und erstellt sie nur einmal
if (!cached) {
    console.log("caching fehler");
  cached = global.mongoose = { conn: null, promise: null };  // Setzt den Cache, wenn keine Verbindung vorhanden ist
}

// Funktion, um eine Verbindung zur MongoDB-Datenbank herzustellen
async function connectToDatabase() {
    console.log("connecting hat gestartet");  // Zeigt an, dass der Verbindungsversuch begonnen hat

  // Wenn eine Verbindung bereits besteht, wird sie zurückgegeben
  if (cached.conn) {
    return cached.conn;
  }

  // Wenn keine Verbindung besteht, wird ein neues Verbindungsversprechen erstellt
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,   // Verwenden des neuen URL-Parsers
      useUnifiedTopology: true,  // Aktiviert die Verwendung des Unified Topology-Modus
    }).then((mongoose) => {
      console.log('MongoDB verbunden');  // Gibt eine Bestätigung aus, wenn die Verbindung hergestellt wurde
      return mongoose;
    });
  }

  // Warten auf die Verbindung und speichern sie im Cache
  cached.conn = await cached.promise;
  return cached.conn;  // Gibt die bestehende oder neu hergestellte Verbindung zurück
}

// Exportiert die Funktion, um sie an anderen Stellen der Anwendung zu verwenden
export default connectToDatabase;
