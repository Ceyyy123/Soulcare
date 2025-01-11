import jwt from "jsonwebtoken";  // Importiert jwt, falls du das Token für die Authentifizierung verwenden möchtest
import React, { useState } from 'react';  // Importiert React und useState für Zustandsverwaltung
import { useRouter } from 'next/router';  // Importiert useRouter für die Navigation
import { signupUser } from '../authService';  // Importiert eine Funktion zum Registrieren (wird hier nicht genutzt, aber könnte nützlich sein)
import { useAuth } from '../AuthContext';  // Importiert useAuth, um die Authentifizierung zu verwalten
import Link from 'next/link';  // Importiert Link von Next.js für die Navigation

const Signup = () => {
  // Zustände für Email, Passwort und Fehlernachrichten
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();  // Initialisiert den Router, um nach der Registrierung weiterzuleiten
  const { login } = useAuth();  // Destrukturiert die login-Funktion aus dem AuthContext, um den Benutzer nach der Registrierung anzumelden

  // Formular-Handler für die Registrierung
  const handleSubmit = async (e) => {
    e.preventDefault();  // Verhindert das Standard-Verhalten des Formulars, um die Seite nicht neu zu laden
  
    try {
      // Registrierung des Benutzers über eine API-Anfrage
      const signupResponse = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Setzt den Content-Type des Requests auf JSON
        },
        body: JSON.stringify({ email, password }),  // Schickt die Email und das Passwort im Request-Body
      });

      if (!signupResponse.ok) {
        throw new Error('Fehler bei der Registrierung');  // Fehler werfen, wenn die Registrierung nicht erfolgreich war
      }
      
      // Falls der Benutzer registriert ist, können wir optional einen Login-Prozess ausführen
      /*const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        throw new Error('Fehler beim Login');
      }

      const loginData = await loginResponse.json();
      const { token } = loginData;

      // Speichern des Tokens im LocalStorage oder in einem Zustand
      localStorage.setItem('token', token);*/

      // Weiterleitung zur Login-Seite nach erfolgreicher Registrierung
      router.push('/login');
    } catch (err) {
      setError(err.message);  // Fehlernachricht im State speichern, wenn etwas schiefgeht
      console.error('Signup Error:', err);  // Fehler in der Konsole protokollieren
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}  {/* Zeigt die Fehlernachricht an, wenn ein Fehler auftritt */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}  // Bindet die Email-Eingabe an den Zustand
            onChange={(e) => setEmail(e.target.value)}  // Aktualisiert den Zustand, wenn die E-Mail eingegeben wird
            required  // Stellt sicher, dass das Feld ausgefüllt wird
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}  // Bindet das Passwort an den Zustand
            onChange={(e) => setPassword(e.target.value)}  // Aktualisiert den Zustand, wenn das Passwort eingegeben wird
            required  // Stellt sicher, dass das Feld ausgefüllt wird
          />
        </div>
        <button type="submit">Sign Up</button>  {/* Der Button zum Absenden des Formulars */}
      </form>
      <p>
        Already have an account? <Link href="/login">Login</Link>  {/* Link zur Login-Seite für bereits registrierte Benutzer */}
      </p>
    </div>
  );
};

export default Signup;  // Exportiert die Signup-Komponente
