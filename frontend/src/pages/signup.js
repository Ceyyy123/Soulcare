import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signupUser } from '../authService';
import { useAuth } from '../AuthContext';
import Link from 'next/link';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  

  try {
    // Registrierung des Benutzers
    const signupResponse = await fetch('backend/api/auth/signup.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!signupResponse.ok) {
      throw new Error('Fehler bei der Registrierung');
    }

    // Nach der erfolgreichen Registrierung automatisch einloggen
    const loginResponse = await fetch('backend/api/auth/login', {
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

    // Token im Local Storage oder in einem Zustand speichern, um den Benutzer anzumelden
    localStorage.setItem('token', token);

    // Nach erfolgreichem Login zur Startseite weiterleiten
    router.push('/');
  } catch (err) {
    setError(err.message);
    console.error('Signup Error:', err);
  }
};


  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
