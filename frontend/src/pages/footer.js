import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css'; // CSS-Modul für den Footer

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerSection}>
                    <img src="/logo.png" alt="SoulCare Logo" className={styles.footerLogo} />
                    <p>Ihre Reise zu innerem Frieden und Wohlbefinden beginnt hier</p>
                </div>
                <div className={styles.footerSection}>
                    <h4>Kontakt</h4>
                    <ul>
                        <li><Link href="/about"><a>Über Uns</a></Link></li>
                        <li><Link href="/impressum"><a>Impressum</a></Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
