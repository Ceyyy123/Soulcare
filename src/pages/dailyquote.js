import React, { useState, useEffect } from 'react';
import Link from 'next/link';  // Importiert Link, um zu einer anderen Seite zu navigieren
import { useAuth } from '../AuthContext';  // Importiert den AuthContext, um den Authentifizierungsstatus zu prüfen
import styles from '../styles/Quote.module.css';  // Importiert die CSS-Stile für diese Seite
import Navbar from './navbar';  // Importiert die Navbar-Komponente
import Footer from './footer';  // Importiert die Footer-Komponente

const DailyQuote = () => {
  // Authentifizierungsstatus aus dem AuthContext
  const { isAuthenticated } = useAuth();
  // Zustand für das Zitat und die Tipps
  const [quote, setQuote] = useState('');
  const [tips, setTips] = useState([]);

  // Array mit inspirierenden Zitaten
  const quotes = [
    '„Die beste Zeit, einen Baum zu pflanzen, war vor 20 Jahren. Die zweitbeste Zeit ist jetzt.“ - Chinesisches Sprichwort',
    '„Glaube an dich selbst und all das, was du bist. Wisse, dass in dir etwas ist, das größer ist als jedes Hindernis.“ - Christian D. Larson',
    // ... weitere Zitate
  ];

  // Array mit täglichen Wohlfühl-Tipps
  const dailyTips = [
    'Trinke ausreichend Wasser, um deinen Körper hydratisiert zu halten.',
    'Geh für 30 Minuten nach draußen und genieße die frische Luft.',
    // ... weitere Tipps
  ];

  // Effekt, der beim Laden der Seite das Zitat und die Tipps auswählt
  useEffect(() => {
    const today = new Date().getDate();  // Holt den aktuellen Tag des Monats
    const randomQuote = quotes[today % quotes.length];  // Wählt ein Zitat basierend auf dem aktuellen Tag
    const shuffledTips = dailyTips.sort(() => 0.5 - Math.random()).slice(0, 3);  // Mischt die Tipps und wählt 3 aus
    setQuote(randomQuote);  // Setzt das Zitat
    setTips(shuffledTips);  // Setzt die Tipps
  }, []);

  // Wenn der Benutzer nicht authentifiziert ist, zeigt eine Aufforderung zur Anmeldung an
  if (!isAuthenticated) {
    return (
      <div className={styles.quoteContainer}>
        <p>Bitte melde dich an, um das inspirierende Zitat des Tages und die Wohlfühl-Tipps zu sehen.</p>
        <Link href="/login">
          <div className={styles.resourceButton}>Zum Login</div>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Navbar />  {/* Fügt die Navbar-Komponente oben auf der Seite ein */}
      <div className={styles.quoteContainer}>
        <div className={styles.content}>
          <div className={styles.quoteSection}>
            <h2 className={styles.quoteText}>Inspirierendes Zitat des Tages</h2>
            <p className={styles.quoteText}>{quote}</p>  {/* Zeigt das zufällig ausgewählte Zitat an*/}
          </div>

          <div className={styles.tipsSection}>
            <h3>Wohlfühl-Tipps des Tages</h3>
            <ul className={styles.tipsList}>
              {tips.map((tip, index) => (
                <li key={index} className={styles.tipItem}>{tip}</li>  /* Listet die täglichen Tipps auf */
              ))}
            </ul>
          </div>

          <div className={styles.additionalResources}>
            <h3>Nützliche Ressourcen</h3>
            <Link href="/usefulresources">
              <button className={styles.resourceButton}>Zu den Ressourcen</button>  {/* Link zu weiteren Ressourcen*/}
            </Link>
          </div>
        </div>
      </div>
      <Footer />  {/* Fügt den Footer am unteren Rand der Seite hinzu*/}
    </div>
  );
};

export default DailyQuote;
