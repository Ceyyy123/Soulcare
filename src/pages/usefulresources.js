import React from 'react';
import Link from 'next/link';  // Importiert Link von Next.js für die Navigation
import { useAuth } from '../AuthContext';  // Importiert den AuthContext, um den Authentifizierungsstatus zu überprüfen
import Navbar from './navbar';  // Importiert die Navbar-Komponente für die Navigation
import Footer from './footer';  // Importiert die Footer-Komponente für die Fußzeile
import styles from '../styles/Resources.module.css';  // Importiert das CSS-Modul für die Seite

const UsefulResources = () => {
  const { isAuthenticated } = useAuth();  // Überprüft, ob der Benutzer authentifiziert ist

  // Wenn der Benutzer nicht authentifiziert ist, wird ein Login-Link angezeigt
  if (!isAuthenticated) {
    return (
      <div className={styles.loginPrompt}>
        <p>Bitte melde dich an, um weitere Ressourcen zu sehen.</p>
        <Link href="/login" passHref>
          <div className={styles.resourceButton}>Zum Login</div>
        </Link>
      </div>
    );
  }

  // Ressourcen, die angezeigt werden, wenn der Benutzer authentifiziert ist
  const resources = [
    {
      title: 'Meditations-Apps',
      description: 'Finde Ruhe und Gelassenheit mit den besten Meditations-Apps wie Headspace und Calm.',
      link: 'https://www.headspace.com',  // Link zur Meditations-App Headspace
    },
    {
      title: 'Ernährungstipps',
      description: 'Entdecke nützliche Ernährungstipps für eine ausgewogene und gesunde Ernährung.',
      link: 'https://www.eatright.org',  // Link zu Ernährungstipps
    },
    {
      title: 'Stressbewältigungsstrategien',
      description: 'Lerne effektive Strategien zur Stressbewältigung und finde deinen inneren Frieden.',
      link: 'https://www.mindful.org/stress-management/',  // Link zu Stressbewältigungsstrategien
    },
    {
      title: 'Schlafhygiene',
      description: 'Verbessere deine Schlafgewohnheiten mit hilfreichen Tipps zur Schlafhygiene.',
      link: 'https://www.sleepfoundation.org/sleep-hygiene',  // Link zur Schlafhygiene
    },
  ];

  return (
    <div className={styles.container}>
      <Navbar />  {/* Navbar-Komponente oben auf der Seite */}
      <h2 className={styles.heading}>Nützliche Ressourcen</h2>  {/* Titel der Seite */}
      <p className={styles.description}>
        Entdecken Sie wertvolle Ressourcen, um Ihr Wohlbefinden zu verbessern und ein ausgeglichenes Leben zu führen.
      </p>
      <div className={styles.resourcesGrid}>
        {/* Iteriert über das Ressourcen-Array und zeigt jede Ressource in einem Grid an */}
        {resources.map((resource, index) => (
          <div key={index} className={styles.resourceCard}>
            <h3>{resource.title}</h3>  {/* Titel der Ressource */}
            <p>{resource.description}</p>  {/* Beschreibung der Ressource */}
            <Link href={resource.link} passHref>
              <div className={styles.button}>Mehr erfahren</div>  {/* Button zum weiterführenden Link */}
            </Link>
          </div>
        ))}
      </div>
      <Footer />  {/* Footer-Komponente am Ende der Seite */}
    </div>
  );
};

export default UsefulResources;  // Exportiert die UsefulResources-Komponente
