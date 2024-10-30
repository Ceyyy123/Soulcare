import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../authService';
import { useAuth } from '../AuthContext';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password); // Anmeldung abschließen
      await login(); // Benutzer im Auth-Context anmelden
      router.push('/');
    } catch (err) {
      setError(err.message);
      console.error("Login Error:", err); // Mehr Details im Fehlerfall
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Noch kein Konto? <Link href="/signup">Registrieren</Link>
      </p>
    </div>
  );
};

export default Login;
