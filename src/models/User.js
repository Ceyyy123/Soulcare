// models/User.js
import mongoose from "mongoose";

// Definiere das User-Schema
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true // Gehashtes Passwort wird hier gespeichert
  },
});

// Erstelle das Mongoose-Modell und exportiere es
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;