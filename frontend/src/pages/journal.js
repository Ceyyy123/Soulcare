import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useRouter } from 'next/router';
import Navbar from './navbar';
import Footer from './footer';
import styles from '../styles/Journal.module.css';

const Journal = () => {
  const { isAuthenticated, logout } = useAuth();
  const [entry, setEntry] = useState('');
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const { date: queryDate } = router.query;
    if (isAuthenticated && queryDate) {
      setDate(new Date(queryDate));
      fetchEntries(queryDate);
    }
  }, [isAuthenticated, router.query.date]);

  // Wenn sich das Datum ändert, aktualisiere die URL
  const handleDateChange = (selectedDate) => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setDate(selectedDate);
    router.push(`/journal?date=${formattedDate}`, { shallow: true });
  };

  // Einträge vom Server holen
  const fetchEntries = async (selectedDate) => {
    try {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = localStorage.getItem('token');
  
      // Debug-Logs
      console.log("API URL:", apiUrl);
      console.log("Datum:", formattedDate);
      console.log("Token:", token);
  
      // Überprüfen, ob API-URL und Token vorhanden sind
      if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL ist nicht gesetzt");
      if (!token) throw new Error("Token fehlt im localStorage");
  
      // API-Aufruf
      const response = await fetch(`${apiUrl}/journal?date=${formattedDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Fehlerbehandlung
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Fehler: ${response.status}, Details: ${errorText}`);
        throw new Error('Fehler beim Abrufen der Einträge');
      }
  
      // JSON-Daten verarbeiten
      const data = await response.json();
      console.log("Daten:", data);
      return data;
  
    } catch (error) {
      console.error("Fehler:", error.message);
      throw error;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const newEntry = { date: formattedDate, content: entry };

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/journal`;
      console.log(url); // Debugging: URL überprüfen
      const response = await fetch(url, {
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
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/journal/${id}`;
      console.log(url); // Debugging: URL überprüfen
      const response = await fetch(url, {
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
                onChange={handleDateChange} 
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
};

export default Journal;
