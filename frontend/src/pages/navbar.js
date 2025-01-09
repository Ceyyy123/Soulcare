import React from 'react';
import Link from 'next/link';
import { useAuth } from '../AuthContext'; // Pfad zum AuthContext
import styles from '../styles/Navbar.module.css'; // CSS-Modul für die Navbar

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const logo = "https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664324/logo_vaabnz.webp"; // Cloudinary-URL für das Logo

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="SoulCare Logo" className={styles.logo} />
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/" passHref>
            <a className={styles.navLink}>Zur Startseite</a>
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link href="/journal" passHref>
                <a className={styles.navLink}>Journal</a>
              </Link>
            </li>
            <li>
              <button onClick={logout} className={styles.navButton}>
                Abmelden
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" passHref>
                <a className={styles.navLink}>Anmelden</a>
              </Link>
            </li>
            <li>
              <Link href="/signup" passHref>
                <a className={styles.navLink}>Registrieren</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
