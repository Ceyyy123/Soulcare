import React from 'react';
import Link from 'next/link';  // Importiert den Link-Tag von Next.js für Navigation
import styles from '../styles/Footer.module.css'; // Importiert das CSS-Modul für den Footer

// Cloudinary-URL für das Logo
const logo = "https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664324/logo_vaabnz.webp";  // Das Logo, das von Cloudinary geladen wird

const Footer = () => {
  return (
    // Das Footer-Element, das den gesamten Fußbereich der Seite definiert
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Erster Abschnitt im Footer - Logo und Beschreibung */}
        <div className={styles.footerSection}>
          <img src={logo} alt="SoulCare Logo" className={styles.footerLogo} />  {/* Das Logo */}
          <p>Ihre Reise zu innerem Frieden und Wohlbefinden beginnt hier</p>  {/* Kurze Beschreibung */}
        </div>

        {/* Zweiter Abschnitt im Footer - Kontaktbereich */}
        <div className={styles.footerSection}>
          <h4>Kontakt</h4>  {/* Überschrift für den Kontaktbereich */}
          <ul>
            {/* Links zu den Seiten 'Über uns' und 'Impressum' */}
            <li>
              <Link href="/about" className={styles.footerLink}>
                Über Uns
              </Link>
            </li>
            <li>
              <Link href="/impressum" className={styles.footerLink}>
                Impressum
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  // Exportiert die Footer-Komponente, um sie in anderen Dateien verwenden zu können
