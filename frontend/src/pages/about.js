import React from 'react';
import Navbar from './navbar'; // Korrigierter Pfad zur Navbar-Komponente
import Footer from './footer'; // Korrigierter Pfad zur Footer-Komponente
import styles from '../styles/About.module.css'; // Stile für die About-Seite

function About() {
  return (
    <div className={styles.container}>
      <Navbar /> {/* Navbar-Komponente wird hier verwendet */}
      <div className={styles.content}>
        <h2 className={styles.heading}>Über Uns</h2>
        <p className={styles.paragraph}>HTL Spengergasse</p>
      </div>
      <Footer /> {/* Footer-Komponente wird hier verwendet */}
    </div>
  );
}

export default About;
