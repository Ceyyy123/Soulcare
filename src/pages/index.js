import React from 'react';
import Link from 'next/link';
import { useAuth } from '../AuthContext';
import '../styles/Navbar.module.css';
import '../styles/Footer.module.css';
import Navbar from './navbar';

// Cloudinary-Links für die Bilder
const logo = 'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664324/logo_vaabnz.webp';
const journalImage = 'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664319/journal_dltwpb.webp';
const meditationImage = 'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664329/meditation_yewnow.webp';
const quotesImage = 'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664314/foto5_inaip7.png';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerSection">
          <img src={logo} alt="SoulCare Logo" className="footerLogo" />
          <p>Ihre Reise zu innerem Frieden und Wohlbefinden beginnt hier</p>
        </div>
        <div className="footerSection">
          <h4>Kontakt</h4>
          <ul>
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
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">

      <div className="container">
        <header className="header">
          <h1>Willkommen bei SoulCare</h1>
          <p>Ihre Reise zu innerem Frieden und Wohlbefinden beginnt hier</p>
        </header>

        <section id="features" className="features">
          <h3>Unsere Angebote</h3>

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
              {isAuthenticated && (
                <Link href={'/journal'} passHref>
                  <button className="small-button">Zum Journal</button>
                </Link>
              )}
            </div>
          </div>

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
              {isAuthenticated && (
                <Link href="/meditation">
                  <button className="small-button">Zur Meditation</button>
                </Link>
              )}
            </div>
          </div>

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
              {isAuthenticated && (
                <Link href="/dailyquote">
                  <button className="small-button">Mehr Zitate und Tipps</button>
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