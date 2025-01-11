// Importiert notwendige Module und Stile für das gesamte Projekt
import React from 'react';
import '../styles/globals.css';  // Globale Stile für das gesamte Projekt, die auf jeder Seite angewendet werden
import { AuthProvider } from '../AuthContext';  // Authentifizierungs-Provider, um den Authentifizierungsstatus zu verwalten
import '../styles/form.css';  // Stile für Formulare, die in der gesamten Anwendung verwendet werden
import '../styles/About.module.css';  // Stile für die About-Seite, falls benötigt

// MyApp ist die Hauptkomponente, die auf jeder Seite gerendert wird
function MyApp({ Component, pageProps }) {
  return (
    // Der AuthProvider umhüllt die gesamte Anwendung und stellt den Authentifizierungsstatus zur Verfügung
    <AuthProvider>
      {/* Jede Seite wird hier basierend auf der Component gerendert, die an MyApp übergeben wird */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;  // Exportiert die MyApp-Komponente
