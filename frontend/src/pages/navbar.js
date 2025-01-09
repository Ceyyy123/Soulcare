import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../AuthContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const logo =
    'https://res.cloudinary.com/dwla3jvrl/image/upload/v1735664324/logo_vaabnz.webp';

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="SoulCare Logo" className={styles.logo} />
      </div>
      <ul className={styles.navLinks}>
        {!isAuthenticated ? (
          <>
            <li>
              <button
                onClick={() => router.push('/login')}
                className={styles.navButton}
              >
                Anmelden
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/signup')}
                className={styles.navButton}
              >
                Registrieren
              </button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={logout} className={styles.navButton}>
              Abmelden
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
