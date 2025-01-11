import React from 'react';
import Link from 'next/link';
import { useAuth } from '../AuthContext';
import styles from '../styles/Navbar.module.css';
import { useRouter } from 'next/router';  // Hier den useRouter-Hook importieren

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const logo = 'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664324/logo_vaabnz.webp';
  const router = useRouter();  // Hier den Router initialisieren

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="SoulCare Logo" className={styles.logo} />
      </div>
      <ul className={styles.navLinks}>
        {!isAuthenticated ? (
          <>
            <li>
              <Link href="/login">
                <div className={styles.navLink}>Anmelden</div>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <div className={styles.navLink}>Registrieren</div>
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* Nur zeigen, wenn wir nicht auf der Startseite sind */}
            {router.pathname !== '/' && (
              <li>
                <Link href="/" passHref>
                  <div className={styles.navLink}>Zur Startseite</div>
                </Link>
              </li>
            )}
            <li>
              <button onClick={logout} className={styles.navButton}>
                Abmelden
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
