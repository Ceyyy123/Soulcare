import React from 'react';  // Importiert React, um JSX zu verwenden
import Navbar from './navbar';  // Importiert die Navbar-Komponente für die Navigation
import Footer from './footer';  // Importiert die Footer-Komponente für die Fußzeile
import styles from '../styles/About.module.css';  // Importiert die CSS-Module für Stile der About-Seite

function About() {
  return (
    // Umhüllt die gesamte Seite in einem Container, der spezifische Stile aus 'About.module.css' anwendet
    <div className={styles.container}>
      <Navbar />  // Die Navbar wird oben auf der Seite gerendert
      <div className={styles.content}>  // Der Hauptinhalt der Seite wird hier gerendert
        <h2 className={styles.heading}>Über Uns</h2>  // Die Überschrift für die About-Seite

        <div className={styles.section}>  // Die Sektion für die Beschreibung und das Team
          <p className={styles.description}>  // Die erste Beschreibung des Projekts
            <strong>SoulCare</strong> ist eine Plattform, die von Schülern der HTL Spengergasse entwickelt wurde, um Menschen bei ihrer mentalen Gesundheit und ihrem Wohlbefinden zu unterstützen.
          </p>
          
          <p className={styles.description}>  // Weitere Erklärung des Ziels von SoulCare
            Unser Ziel ist es, Tools wie Journale, geführte Meditationen und inspirierende Zitate bereitzustellen, um Nutzern zu helfen, Achtsamkeit in ihren Alltag zu integrieren.
          </p>

          <h3 className={styles.subheading}>Team:</h3>  // Die Überschrift für die Team-Mitglieder

          <ul className={styles.teamList}>  // Liste der Team-Mitglieder
            <li>Ceyda Simsek</li>
            <li>Meital Haimov</li>
            <li>Mohamed Ali</li>
            <li>Jaden Bayot</li>
          </ul>

          <p className={styles.description}>  // Abschlussbeschreibung und Aufforderung zu Feedback
            Unser gemeinsames Ziel ist es, eine positive und benutzerfreundliche Erfahrung für unsere Nutzer zu schaffen. Wir freuen uns über Feedback und Anregungen, um unsere Plattform weiter zu verbessern.
          </p>
        </div>
      </div>

      <Footer />  // Fügt die Footer-Komponente am Ende der Seite hinzu
    </div>
  );
}

export default About;  // Exportiert die About-Komponente, damit sie in anderen Teilen der Anwendung verwendet werden kann
