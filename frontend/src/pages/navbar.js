import React from 'react';
import Link from 'next/link';
import { useAuth } from '../AuthContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const logo = 'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664324/logo_vaabnz.webp';

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
                <a className={styles.navLink}>Anmelden</a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a className={styles.navLink}>Registrieren</a>
              </Link>
            </li>
          </>
        ) : (
          <>
          <li>
          <Link href="/" passHref>
            <a className={styles.navLink}>Zur Startseite</a>
          </Link>
        </li>
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
