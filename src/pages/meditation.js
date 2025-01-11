import React from 'react';
import Link from 'next/link';  // Importiert Link von Next.js für die Navigation zwischen Seiten
import { useAuth } from '../AuthContext';  // Importiert den AuthContext, um den Authentifizierungsstatus zu prüfen
import Navbar from './navbar';  // Importiert die Navbar-Komponente für die Navigation
import Footer from './footer';  // Importiert die Footer-Komponente für den Fußbereich der Seite
import styles from '../styles/Meditation.module.css';  // Importiert das CSS-Modul für die Seite

const Meditation = () => {
  const { isAuthenticated } = useAuth();  // Zugriff auf den Authentifizierungsstatus

  // Wenn der Benutzer nicht authentifiziert ist, wird ein Login-Link angezeigt
  if (!isAuthenticated) {
    return (
      <div className={styles.loginPrompt}>
        <p>Bitte melde dich an, um die Meditation Videos zu sehen.</p>
        <Link href="/login" passHref>
          <div className={styles.loginLink}>Zum Login</div>
        </Link>
      </div>
    );
  }

  // Liste der Meditationen, die auf der Seite angezeigt werden
  const meditations = [
    {
      title: 'Entspannung - Geführte Meditation',
      video: (
        <video controls width="100%">
          <source
            src="https://res.cloudinary.com/dwla3jvrl/video/upload/v1735664344/video1_slgvtm.mp4"
            type="video/mp4"
          />
        </video>
      ),
      category: 'Entspannung',
    },
    {
      title: 'Schlaf - Geführte Meditation',
      video: (
        <video controls width="100%">
          <source
            src="https://res.cloudinary.com/dwla3jvrl/video/upload/v1735665260/Video2_ehru2c.mp4"
            type="video/mp4"
          />
        </video>
      ),
      category: 'Schlafen',
    },
    {
      title: 'Stressabbau - Geführte Meditation',
      video: (
        <video controls width="100%">
          <source
            src="https://res.cloudinary.com/dwla3jvrl/video/upload/v1735664377/video3_q9k4hx.mp4"
            type="video/mp4"
          />
        </video>
      ),
      category: 'Stressabbau',
    },
    {
      title: 'Achtsamkeit - Geführte Meditation',
      video: (
        <video controls width="100%">
          <source
            src="https://res.cloudinary.com/dwla3jvrl/video/upload/v1735664396/video4_bv0hbb.mp4"
            type="video/mp4"
          />
        </video>
      ),
      category: 'Achtsamkeit',
    },
  ];

  // Paare von Kategorien, um die Meditationen zu gruppieren
  const categoryPairs = [
    ['Entspannung', 'Schlafen'],
    ['Stressabbau', 'Achtsamkeit'],
  ];

  return (
    <div>
      <Navbar />  {/* Fügt die Navbar-Komponente hinzu */}
      <div className={styles.container}>
        <h2 className={styles.heading}>Geführte Meditationen</h2>  {/* Titel der Seite */}
        <p className={styles.description}>
          Entdecken Sie eine Sammlung geführter Meditationen zur Entspannung, zum besseren Schlaf und zum Stressabbau.
        </p>

        {/* Iteriere durch die Kategorienpaare und zeige die entsprechenden Meditationen an */}
        {categoryPairs.map((pair, index) => (
          <div key={index} className={styles.categoryRow}>
            {pair.map((category) => (
              <div key={category} className={styles.categorySection}>
                <h3 className={styles.categoryHeading}>{category}</h3>  {/* Anzeige der Kategorie-Überschrift */}
                <div className={styles.videoGrid}>
                  {/* Filtert die Meditationen nach der Kategorie und zeigt sie an */}
                  {meditations
                    .filter((meditation) => meditation.category === category)
                    .map((meditation, idx) => (
                      <div key={idx} className={styles.videoCard}>
                        <h4>{meditation.title}</h4>  {/* Titel der Meditation */}
                        <div className={styles.video}>{meditation.video}</div>  {/* Video der Meditation */}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer />  {/* Fügt die Footer-Komponente hinzu */}
    </div>
  );
};

export default Meditation;  // Exportiert die Meditation-Komponente
