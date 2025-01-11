import React, { useState } from 'react';
import { useRouter } from 'next/router';  // Importiert den Router, um nach dem Login weiterzuleiten
import { useAuth } from '../AuthContext';  // Importiert den AuthContext, um den Authentifizierungsstatus zu verwalten
import Link from 'next/link';  // Importiert Link, um zur Sign-Up-Seite zu navigieren

const Login = () => {
  // Zustände für E-Mail, Passwort und Fehlernachricht
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();  // Router-Instanz, um Seitenumleitungen zu ermöglichen
  const { login } = useAuth();  // Zugriff auf die login-Funktion aus dem AuthContext

  // Handler für das Absenden des Formulars
  const handleSubmit = async (e) => {
    e.preventDefault();  // Verhindert die Standardaktion des Formulars (Seitenaktualisierung)
  
    try {
      // Senden der Login-Daten (Email und Passwort) an die API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // JSON-Format für den Request-Body
        },
        body: JSON.stringify({ email, password }),  // Die E-Mail und das Passwort werden an die API gesendet
      });
  
      // Wenn die Antwort nicht ok ist, Fehler werfen
      if (!response.ok) {
        throw new Error('Login fehlgeschlagen');
      }
  
      const data = await response.json();  // Antwort in JSON umwandeln
  
      // Das Token im localStorage speichern
      localStorage.setItem('token', data.token);  // Token aus der Antwort im lokalen Speicher ablegen
  
      // Login-Funktion ausführen und zur Startseite navigieren
      login();  // Diese Funktion ändert den Authentifizierungsstatus
      router.push('/');  // Weiterleitung zur Startseite
    } catch (err) {
      setError(err.message);  // Fehlernachricht setzen, falls ein Fehler auftritt
      console.error('Login Error:', err);  // Fehler in der Konsole protokollieren
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>  {/* Titel für das Login-Formular */}
      
      {/* Falls ein Fehler auftritt, wird die Fehlermeldung angezeigt */}
      {error && <p className="error">{error}</p>}
      
      {/* Formular für die Anmeldung */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}  // Bindet den Wert der E-Mail an den State
            onChange={(e) => setEmail(e.target.value)}  // Aktualisiert den E-Mail-State
            required  // Das Feld ist erforderlich
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}  // Bindet den Wert des Passworts an den State
            onChange={(e) => setPassword(e.target.value)}  // Aktualisiert den Passwort-State
            required  // Das Feld ist erforderlich
          />
        </div>
        
        <button type="submit">Login</button>  {/* Button zum Absenden des Formulars */}
      </form>

      {/* Link zur Seite für die Registrierung, falls der Benutzer noch kein Konto hat */}
      <p>
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;  // Exportiert die Login-Komponente für die Verwendung an anderer Stelle
