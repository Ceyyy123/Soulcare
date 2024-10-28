import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import Navbar from './navbar'; // Korrigierter Pfad zur Navbar-Komponente
import Footer from './footer'; // Korrigierter Pfad zur Footer-Komponente
import styles from '../styles/Resources.module.css'; // Korrigierter Pfad zur CSS-Datei

const UsefulResources = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
          <div className={styles.loginPrompt}>
            <p>Bitte melde dich an, um weitere Ressourcen zu sehen.</p>
            <Link href="/login">
              <a className={styles.resourceButton}>Zum Login</a>
            </Link>
          </div>
        );
      }
      
      const resources = [
        {
          title: 'Meditations-Apps',
          description: 'Finde Ruhe und Gelassenheit mit den besten Meditations-Apps wie Headspace und Calm.',
          link: 'https://www.headspace.com',
        },
        {
          title: 'Ernährungstipps',
          description: 'Entdecke nützliche Ernährungstipps für eine ausgewogene und gesunde Ernährung.',
          link: 'https://www.eatright.org',
        },
        {
          title: 'Stressbewältigungsstrategien',
          description: 'Lerne effektive Strategien zur Stressbewältigung und finde deinen inneren Frieden.',
          link: 'https://www.mindful.org/stress-management/',
        },
        {
          title: 'Schlafhygiene',
          description: 'Verbessere deine Schlafgewohnheiten mit hilfreichen Tipps zur Schlafhygiene.',
          link: 'https://www.sleepfoundation.org/sleep-hygiene',
        },
      ];
      

  return (
    <div className={styles.container}>
      <Navbar />

      <h2 className={styles.heading}>Nützliche Ressourcen</h2>
      <p className={styles.description}>
        Entdecken Sie wertvolle Ressourcen, um Ihr Wohlbefinden zu verbessern und ein ausgeglichenes Leben zu führen.
      </p>

      <div className={styles.resourcesGrid}>
        {resources.map((resource, index) => (
          <div key={index} className={styles.resourceCard}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <Link href={resource.link}>
              <a className={styles.button}>Mehr erfahren</a>
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default UsefulResources;
