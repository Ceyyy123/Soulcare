import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import styles from '../styles/Journal.module.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const logo = '/logo.png';

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

const Journal = () => {
  const { isAuthenticated } = useAuth();
  const [entry, setEntry] = useState('');
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchEntries(date);
    }
  }, [date, isAuthenticated]);

  const fetchEntries = async (selectedDate) => {
    try {
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        const response = await fetch(`http://localhost:3001/api/journal?date=${formattedDate}`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Einträge');
        }
        const data = await response.json();
        setEntries(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = moment(date).format('YYYY-MM-DD');
    const newEntry = { date: formattedDate, content: entry };

    try {
      const response = await fetch('http://localhost:3001/api/journal', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(newEntry)
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern des Eintrags');
      }

      const data = await response.json();
      setEntries([...entries, data]);
      setEntry('');
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/journal/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
  
      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Eintrags');
      }
  
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };
  

  if (!isAuthenticated) {
    return (
      <div className={styles.notAuthenticated}>
        <p>Bitte melde dich an, um das Journal zu sehen.</p>
        <Link href="/login">
          <a className={styles.resourceButton}>Zum Login</a>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.journalContainer}>
      <Navbar />
      <div className={styles.journalContent}>
        <div className={styles.journalForm}>
          <h2>Journal</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Datum:</label>
              <DatePicker 
                selected={date} 
                onChange={(date) => setDate(date)} 
                dateFormat="dd.MM.yyyy"
              />
            </div>
            <div>
              <label>Eintrag:</label>
              <textarea 
                value={entry} 
                onChange={(e) => setEntry(e.target.value)} 
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.button}>Speichern</button>
          </form>
        </div>
        <div className={styles.journalEntries}>
          <h2>Einträge</h2>
          {entries.map((entry, index) => (
            <div key={index} className={styles.journalEntry}>
              <strong>{entry.date}</strong>
              <p>{entry.content}</p>
              <button 
                onClick={() => handleDelete(entry._id)} 
                className={styles.deleteButton}
              >
                Löschen
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Journal;
