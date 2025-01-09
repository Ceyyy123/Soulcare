import React from 'react';
import Link from 'next/link';
import { useAuth } from '../AuthContext';
import Navbar from '../styles/Navbar.module.css'; // Navbar wird als eigene Komponente importiert
import Footer from '../styles/Footer.module.css'; // Footer als eigene Komponente
import styles from '../styles/globals.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Willkommen bei SoulCare</h1>
          <p>Ihre Reise zu innerem Frieden und Wohlbefinden beginnt hier</p>
        </header>
        <section id="features" className={styles.features}>
          <h3>Unsere Angebote</h3>
          <div className={styles.featureSection}>
            <img src="https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664319/journal_dltwpb.webp" alt="Journal" />
            <div>
              <h3>Journal</h3>
              <p>
                Mit unserem integrierten Journal können Sie Ihre Gedanken, Gefühle und Erfahrungen mühelos festhalten.
              </p>
              {isAuthenticated && (
                <Link href="/journal">
                  <button className={styles.smallButton}>Zum Journal</button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
