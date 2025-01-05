import React from 'react';
import Link from 'next/link';
import { useAuth } from '../AuthContext'; // Stelle sicher, dass der Pfad zu deiner AuthContext-Datei korrekt ist
import Navbar from './navbar'; // Korrigierter Pfad zur Navbar-Komponente
import Footer from './footer'; // Korrigierter Pfad zur Footer-Komponente
import styles from '../styles/Meditation.module.css'; // Angenommen, du verwendest CSS-Module

const Meditation = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className={styles.loginPrompt}>
        <p>Bitte melde dich an, um die Meditation Videos zu sehen.</p>
        <Link href="/login" passHref>
          <a className={styles.loginLink}>Zum Login</a>
        </Link>
      </div>
    );
  }

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

  const categoryPairs = [
    ['Entspannung', 'Schlafen'],
    ['Stressabbau', 'Achtsamkeit'],
  ];

  return (
    <div>
      <Navbar /> {/* Navbar-Komponente wird hier verwendet */}
      <div className={styles.container}>
        <h2 className={styles.heading}>Geführte Meditationen</h2>
        <p className={styles.description}>
          Entdecken Sie eine Sammlung geführter Meditationen zur Entspannung, zum besseren Schlaf und zum Stressabbau.
        </p>

        {categoryPairs.map((pair, index) => (
          <div key={index} className={styles.categoryRow}>
            {pair.map((category) => (
              <div key={category} className={styles.categorySection}>
                <h3 className={styles.categoryHeading}>{category}</h3>
                <div className={styles.videoGrid}>
                  {meditations
                    .filter((meditation) => meditation.category === category)
                    .map((meditation, idx) => (
                      <div key={idx} className={styles.videoCard}>
                        <h4>{meditation.title}</h4>
                        <div className={styles.video}>{meditation.video}</div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer /> {/* Footer-Komponente wird hier verwendet */}
    </div>
  );
};

export default Meditation;
