import React from 'react';
import Navbar from './navbar'; // Korrigierter Pfad zur Navbar-Komponente
import Footer from './footer'; // Korrigierter Pfad zur Footer-Komponente
import styles from '../styles/About.module.css'; // Stile für die About-Seite
import Link from 'next/link'; // Import von Link

function Impressum() {
  return (
    <div className={styles.container}>
      <Navbar /> {/* Navbar-Komponente */}
      <div className={styles.content}>
        <h2 className={styles.heading}>Impressum und Kontakt zu SoulCare</h2>
        <div className={styles.box}>
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
          <p>
            <strong>Projektleiterin:</strong>
            <br />
            Ceyda Simsek (
            <Link href="mailto:SIM210485@spengergasse.at">
              SIM210485@spengergasse.at
            </Link>
            )
          </p>
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
      <Footer />
    </div>
  );
}

export default Impressum;
