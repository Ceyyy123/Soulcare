import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Um nach erfolgreichem Login weiterzuleiten
import { useAuth } from '../AuthContext'; // AuthContext für Login
import Link from 'next/link'; // Zum Verlinken von Seiten
import styles from '../styles/Login.module.css'; // CSS-Module für Login-Seite

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth(); // Hier wird das Login aus dem AuthContext genutzt

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Login');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Speichern des Tokens im localStorage
      login(); // Den Authentifizierungs-Context updaten
      router.push('/'); // Weiterleitung zur Startseite
    } catch (err) {
      setError(err.message); // Fehlerbehandlung
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Passwort:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Login</button>
      </form>
      <p>
        Noch kein Konto? <Link href="/signup">Registrieren</Link>
      </p>
    </div>
  );
};

export default Login;
