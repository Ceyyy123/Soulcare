// Importiert mongoose, um mit der MongoDB-Datenbank zu interagieren
import mongoose from "mongoose";

// Definiere das User-Schema, das die Struktur für die User-Daten festlegt
const userSchema = new mongoose.Schema({
  email: { 
    type: String,  // Speichert die E-Mail des Benutzers als String
    required: true,  // Stellt sicher, dass die E-Mail ein Pflichtfeld ist
    unique: true  // Stellt sicher, dass jede E-Mail nur einmal in der Datenbank vorhanden ist
  },
  password: { 
    type: String,  // Speichert das Passwort des Benutzers als String (wird normalerweise gehasht gespeichert)
    required: true  // Stellt sicher, dass das Passwort ein Pflichtfeld ist
  },
});

// Erstelle das Mongoose-Modell und exportiere es
// Wenn das Modell bereits existiert, wird es nicht erneut erstellt
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Exportiert das User-Modell, damit es in anderen Teilen der Anwendung verwendet werden kann
export default User;
