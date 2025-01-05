import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css'; // CSS-Modul für den Footer

// Cloudinary-URL für das Logo
const logo = "https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664324/logo_vaabnz.webp";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerSection}>
          <img src={logo} alt="SoulCare Logo" className={styles.footerLogo} />
          <p>Ihre Reise zu innerem Frieden und Wohlbefinden beginnt hier</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Kontakt</h4>
          <ul>
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

export default Footer;
