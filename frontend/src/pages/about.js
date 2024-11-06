import React from 'react';
import Navbar from './navbar'
import Footer from './footer'; // Korrigierter Pfad zur Footer-Komponente
import styles from '../styles/About.module.css'; // Stile für die About-Seite

function About() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h2 className={styles.heading}>Über Uns</h2>
        <p className={styles.paragraph}>HTL Spengergasse</p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
