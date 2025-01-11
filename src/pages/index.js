import React from 'react';
import Link from 'next/link';  // Import von Next.js Link für die Navigation zwischen den Seiten
import { useAuth } from '../AuthContext';  // Import des AuthContext, um den Authentifizierungsstatus zu prüfen
import '../styles/Navbar.module.css';  // Import von CSS für die Navbar
import '../styles/Footer.module.css';  // Import von CSS für den Footer
import Navbar from './navbar';  // Import der Navbar-Komponente

// Cloudinary-Links für die Bilder (Bilder werden von Cloudinary geladen)
const logo = 'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664324/logo_vaabnz.webp';
const journalImage = 'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664319/journal_dltwpb.webp';
const meditationImage = 'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664329/meditation_yewnow.webp';
const quotesImage = 'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664314/foto5_inaip7.png';

const Footer = () => {
  return (
    // Footer-Komponente, die am Ende jeder Seite angezeigt wird
    <footer className="footer">
      <div className="container">
        {/* Erste Sektion im Footer mit Logo und Beschreibung */}
        <div className="footerSection">
          <img src={logo} alt="SoulCare Logo" className="footerLogo" />  {/* Das Logo */}
          <p>Ihre Reise zu innerem Frieden und Wohlbefinden beginnt hier</p>  {/* Beschreibung */}
        </div>
        {/* Zweite Sektion im Footer mit Links */}
        <div className="footerSection">
          <h4>Kontakt</h4>
          <ul>
            {/* Links zu den Seiten "Über Uns" und "Impressum" */}
            <li>
              <Link href="/about" className="footer-link">
                Über Uns
              </Link>
            </li>
            <li>
              <Link href="/impressum" className="footer-link">
                Impressum
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  // Authentifizierungsstatus aus dem AuthContext (wird verwendet, um Inhalte nur für authentifizierte Benutzer anzuzeigen)
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      <Navbar />  {/* Navbar-Komponente oben auf der Seite */}

      <div className="container">
        {/* Header-Bereich der Seite mit Titel und Beschreibung */}
        <header className="header">
          <h1>Willkommen bei SoulCare</h1>
          <p>Ihre Reise zu innerem Frieden und Wohlbefinden beginnt hier</p>
        </header>

        {/* Features-Sektion mit den Angeboten */}
        <section id="features" className="features">
          <h3>Unsere Angebote</h3>

          {/* Erste Feature-Sektion für das Journal */}
          <div className="feature-section">
            <img src={journalImage} alt="Journal Bild" />
            <div>
              <h3>Journal</h3>
              <p>
                Mit unserem integrierten Journal können Sie Ihre Gedanken,
                Gefühle und Erfahrungen mühelos festhalten.
              </p>
              <p>
                Es bietet einen sicheren Raum für Selbstreflexion und persönliches
                Wachstum.
              </p>
              {/* Nur für authentifizierte Benutzer: Link zum Journal */}
              {isAuthenticated && (
                <Link href={'/journal'} passHref>
                  <button className="small-button">Zum Journal</button>
                </Link>
              )}
            </div>
          </div>

          {/* Zweite Feature-Sektion für Meditation */}
          <div className="feature-section">
            <img src={meditationImage} alt="Meditation Bild" />
            <div>
              <h3>Meditation</h3>
              <p>Entdecken Sie eine Vielzahl von geführten Meditationen.</p>
              <p>
                Ob Sie sich entspannen, besser schlafen oder Ihren Fokus
                verbessern möchten - unsere Meditationen sind perfekt für jeden
                Moment des Tages.
              </p>
              {/* Nur für authentifizierte Benutzer: Link zur Meditation */}
              {isAuthenticated && (
                <Link href="/meditation">
                  <button className="small-button">Zur Meditation</button>
                </Link>
              )}
            </div>
          </div>

          {/* Dritte Feature-Sektion für inspirierende Zitate und Tipps */}
          <div className="feature-section">
            <img src={quotesImage} alt="Inspirierende Zitate Bild" />
            <div>
              <h3>Inspirierende Zitate und Tipps</h3>
              <p>
                Lassen Sie sich täglich von einem neuen Zitat oder einer
                Affirmation inspirieren und motivieren.
              </p>
              <p>
                Erhalten Sie jeden Tag einen neuen Tipp, um Ihr Wohlbefinden zu
                steigern und ein gesundes Gleichgewicht zu finden.
              </p>
              {/* Nur für authentifizierte Benutzer: Link zu Zitate und Tipps */}
              {isAuthenticated && (
                <Link href="/dailyquote">
                  <button className="small-button">Mehr Zitate und Tipps</button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />  {/* Footer-Komponente am Ende der Seite */}
    </div>
  );
};

export default Home;  // Exportiert die Home-Komponente für die Verwendung in anderen Teilen der Anwendung
