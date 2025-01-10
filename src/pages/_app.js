// src/pages/_app.js
import React from 'react';
import '../styles/globals.css';  // Globale Stile für das gesamte Projekt
import { AuthProvider } from '../AuthContext';  // Authentifizierungsstatus
import '../styles/form.css';  // Globale Formularstile
import '../styles/About.module.css';  // Stile für die About-Seite, falls benötigt

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} /> {/* Jede Seite wird hier gerendert */}
    </AuthProvider>
  );
}

export default MyApp;
