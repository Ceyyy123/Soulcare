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

  useEffect(() => {
    console.log(entries);
  }, [entries])

  // Wenn sich das Datum ändert, aktualisiere die URL
  const handleDateChange = (selectedDate) => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setDate(selectedDate);
    //router.push(`/journal?date=${formattedDate}`, undefined, { shallow: true });
  };

  // Einträge vom Server holen  
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // Datum im richtigen Format (z.B. 'YYYY-MM-DD') für die API-Abfrage formatieren
        const formattedDate = date.toISOString().split('T')[0];

        const response = await fetch(`/api/journal?date=${formattedDate}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log("Fehler beim Abrufen der Einträge");
          return;
        }

        // Antwort in JSON umwandeln
        const data = await response.json();

        // Setze die Einträge in den State
        setEntries(data);
      } catch (error) {
        console.log('Fehler beim Abrufen der Einträge:', error);
      }
    };

    // Aufruf der fetchEntries-Funktion
    fetchEntries();
  }, [date]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const newEntry = { date: formattedDate, content: entry };

    try {

      const response = await fetch("/api/journal", {
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
      setEntries([...entries, newEntry]);
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleDelete = async (id) => {
  try {
    // Debugging: Überprüfen, ob der ID-Wert korrekt ist
    console.log('Lösche Eintrag mit ID:', id); // Sollte die tatsächliche ID im Log ausgeben

    // Falls id nicht vorhanden ist, einen Fehler werfen
    if (!id) {
      throw new Error('Keine ID zum Löschen vorhanden');
    }

    // URL korrekt mit der ID interpolieren
    const url = `/api/journal/${id}`;
    console.log('API URL:', url); // Sicherstellen, dass die URL korrekt ist

    // DELETE-Request an die API senden
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });

    // Wenn die Antwort nicht erfolgreich ist, einen Fehler werfen
    if (!response.ok) {
      throw new Error('Fehler beim Löschen des Eintrags');
    }

    // Nach dem Löschen den Eintrag aus dem Zustand entfernen
    setEntries(entries.filter(entry => entry._id !== id));
  } catch (error) {
    console.error('Delete error:', error.message);
  }
};


  if (!isAuthenticated) {
    return (
      <div className={styles.notAuthenticated}>
        <p>Bitte melde dich an, um das Journal zu sehen.</p>
        <Link href="/login">
          <div className={styles.resourceButton}>Zum Login</div>
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
          {entries.map((entry, index) => {
            const formattedDate = moment(entry.date).format('YYYY-MM-DD'); // Datum im Format YYYY-MM-DD
            console.log('Eintrag:', entry);  // Debugging: Überprüfen, ob die ID vorhanden ist
            return (
              <div key={index} className={styles.journalEntry}>
                <strong>{formattedDate}</strong> {/* Zeige das formatierte Datum an */}
                <p>{entry.content}</p>
                <button 
                  onClick={() => handleDelete(entry._id)} 
                  className={styles.deleteButton}
                >
                  Löschen
                </button>
              </div>
            );
        })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Journal;
