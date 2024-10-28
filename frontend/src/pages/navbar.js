import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext'; // Pfad zum AuthContext
import styles from '../styles/Navbar.module.css'; // CSS-Modul für die Navbar

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const logo = '/logo.png'; // Pfad zum Logo

    return (
        <nav className={styles.navbar}>
            <img src={logo} alt="SoulCare Logo" className={styles.logo} />
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/" passHref>
                        <a>Zur Startseite</a>
                    </Link>
                </li>
                {isAuthenticated && (
                    <li>
                        <button onClick={logout} className={styles.logoutButton}>
                            Abmelden
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
