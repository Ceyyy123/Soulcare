import React from 'react';
import Navbar from './navbar'; // Korrigierter Pfad zur Navbar-Komponente
import Footer from './footer'; // Korrigierter Pfad zur Footer-Komponente
import styles from '../styles/About.module.css'; // Stile für die About-Seite

function Impressum() {
    return (
        <div className={styles.container}>
            <Navbar /> {/* Navbar-Komponente */}
            <div className={styles.content}>
                <h2 className={styles.heading}>Impressum und Kontakt zu SoulCare</h2>
                <div className={styles.box}>
                    <p><strong>Herausgeber und Inhaber:</strong><br />
                        SoulCare<br />
                        Spengergasse 20<br />
                        1050 Wien<br />
                        Österreich</p>
                    <p><strong>Projektleiterin:</strong><br />
                        Ceyda Simsek (SIM210485@spengergasse.at)</p>
                    <p><strong>Projektteammitglieder:</strong><br />
                        Meital Haimov (HAI210477@spengergasse.at)<br />
                        Mohamed Ali (ALI210464@spengergasse.at)<br />
                        Jaden Bayot (BAY210469@spengergasse.at)</p>
                    <p><strong>Hinweis:</strong><br />
                        Die grundlegende Intention unserer Website besteht darin, Menschen in ihrer mentalen Gesundheit und Achtsamkeit zu unterstützen. Sollte Ihnen ein Fehler auffallen, freuen wir uns darüber, wenn Sie uns kontaktieren.</p>
                </div>
            </div>
            <Footer /> {/* Footer-Komponente */}
        </div>
    );
}

export default Impressum;
