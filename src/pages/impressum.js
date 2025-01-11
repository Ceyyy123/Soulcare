import React from 'react';
import Navbar from './navbar';  // Korrigierter Pfad zur Navbar-Komponente, die oben auf jeder Seite angezeigt wird
import Footer from './footer';  // Korrigierter Pfad zur Footer-Komponente, die am Ende jeder Seite angezeigt wird
import styles from '../styles/About.module.css';  // Stile für die About-Seite (auch für das Impressum verwendet)
import Link from 'next/link';  // Import von Link, um E-Mail-Links korrekt zu erstellen

function Impressum() {
  return (
    <div className={styles.container}>
      <Navbar /> {/* Navbar-Komponente wird oben auf der Seite gerendert */}

      <div className={styles.content}>
        {/* Hauptüberschrift für die Impressum-Seite */}
        <h2 className={styles.heading}>Impressum und Kontakt zu SoulCare</h2>

        <div className={styles.box}>
          {/* Herausgeber und Inhaber */}
          <p>
            <strong>Herausgeber und Inhaber:</strong>
            <br />
            SoulCare
            <br />
            Spengergasse 20
            <br />
            1050 Wien
            <br />
            Österreich
          </p>

          {/* Projektleiterin mit E-Mail-Link */}
          <p>
            <strong>Projektleiterin:</strong>
            <br />
            Ceyda Simsek (
            <Link href="mailto:SIM210485@spengergasse.at">
              SIM210485@spengergasse.at
            </Link>
            )
          </p>

          {/* Projektteammitglieder mit E-Mail-Links */}
          <p>
            <strong>Projektteammitglieder:</strong>
            <br />
            Meital Haimov (
            <Link href="mailto:HAI210477@spengergasse.at">
              HAI210477@spengergasse.at
            </Link>
            )
            <br />
            Mohamed Ali (
            <Link href="mailto:ALI210464@spengergasse.at">
              ALI210464@spengergasse.at
            </Link>
            )
            <br />
            Jaden Bayot (
            <Link href="mailto:BAY210469@spengergasse.at">
              BAY210469@spengergasse.at
            </Link>
            )
          </p>

          {/* Hinweis über den Zweck der Website */}
          <p>
            <strong>Hinweis:</strong>
            <br />
            Die grundlegende Intention unserer Website besteht darin, Menschen
            in ihrer mentalen Gesundheit und Achtsamkeit zu unterstützen.
            Sollte Ihnen ein Fehler auffallen, freuen wir uns darüber, wenn Sie
            uns kontaktieren.
          </p>
        </div>
      </div>

      <Footer />  {/* Footer-Komponente wird unten auf der Seite gerendert */}
    </div>
  );
}

export default Impressum;  // Exportiert die Impressum-Komponente für die Verwendung in anderen Teilen der Anwendung
