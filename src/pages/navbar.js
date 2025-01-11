import React from 'react';
import Link from 'next/link';  // Importiert den Link-Tag von Next.js für die Navigation
import { useAuth } from '../AuthContext';  // Importiert den AuthContext, um den Authentifizierungsstatus zu verwalten
import styles from '../styles/Navbar.module.css';  // Importiert das CSS-Modul für die Navbar
import { useRouter } from 'next/router';  // Importiert den Router-Hook, um die aktuelle Route abzufragen

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();  // Destrukturiert die login- und logout-Funktionen sowie den Authentifizierungsstatus aus dem AuthContext
  const logo = 'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664324/logo_vaabnz.webp';  // Cloudinary-URL für das Logo
  const router = useRouter();  // Initialisiert den Router, um auf die aktuelle Route zuzugreifen

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="SoulCare Logo" className={styles.logo} />  {/* Das Logo der Webseite */}
      </div>
      <ul className={styles.navLinks}>
        {/* Wenn der Benutzer nicht authentifiziert ist, zeigen wir die Anmelde- und Registrierungslinks */}
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
            {/* Nur anzeigen, wenn wir nicht auf der Startseite sind */}
            {router.pathname !== '/' && (
              <li>
                <Link href="/" passHref>
                  <div className={styles.navLink}>Zur Startseite</div>
                </Link>
              </li>
            )}
            <li>
              {/* Logout-Button für authentifizierte Benutzer */}
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
