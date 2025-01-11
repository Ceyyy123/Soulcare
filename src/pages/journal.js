import React, { useState, useEffect } from 'react';
import Link from 'next/link';  // Importiert Link für die Navigation zu anderen Seiten
import { useAuth } from '../AuthContext';  // Importiert den AuthContext, um den Authentifizierungsstatus zu überprüfen
import DatePicker from 'react-datepicker';  // Importiert das DatePicker-Modul für die Datumsauswahl
import 'react-datepicker/dist/react-datepicker.css';  // Importiert die CSS-Datei für das DatePicker-Modul
import moment from 'moment';  // Importiert moment.js zur Formatierung von Daten
import { useRouter } from 'next/router';  // Importiert Router für die Navigation
import Navbar from './navbar';  // Importiert die Navbar-Komponente
import Footer from './footer';  // Importiert die Footer-Komponente
import styles from '../styles/Journal.module.css';  // Importiert CSS-Modul für die Journal-Seite

const Journal = () => {
  const { isAuthenticated, logout } = useAuth();  // Zugriff auf den Authentifizierungsstatus
  const [entry, setEntry] = useState('');  // Zustand für den aktuellen Journal-Eintrag
  const [date, setDate] = useState(new Date());  // Zustand für das ausgewählte Datum
  const [entries, setEntries] = useState([]);  // Zustand für alle Journal-Einträge
  const router = useRouter();  // Router, um die URL zu verwalten

  // Lädt die Journal-Einträge für das ausgewählte Datum
  useEffect(() => {
    const { date: queryDate } = router.query;  // Holt das Datum aus der URL (falls vorhanden)
    if (isAuthenticated && queryDate) {
      setDate(new Date(queryDate));  // Setzt das Datum auf den in der URL angegebenen Wert
      fetchEntries(queryDate);  // Holt die Einträge für dieses Datum
    }
  }, [isAuthenticated, router.query.date]);

  // Logs die Einträge zur Fehlerbehebung
  useEffect(() => {
    console.log(entries);
  }, [entries]);

  // Handhabt die Änderung des Datums im DatePicker
  const handleDateChange = (selectedDate) => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setDate(selectedDate);
    // router.push(`/journal?date=${formattedDate}`, undefined, { shallow: true });  // Kommentierte URL-Änderung (optional)
  };

  // Holt die Journal-Einträge vom Server
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // Formatierte Datum für die API-Abfrage
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

        // Antwort in JSON umwandeln und die Einträge im Zustand speichern
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.log('Fehler beim Abrufen der Einträge:', error);
      }
    };

    fetchEntries();  // Ruft die Einträge beim Laden der Seite ab
  }, [date]);  // Wird immer ausgeführt, wenn sich das Datum ändert

  // Handhabt das Absenden eines neuen Journal-Eintrags
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const newEntry = { date: formattedDate, content: entry };  // Neues Journal-Dokument

    try {
      const response = await fetch("/api/journal", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),  // Token für authentifizierte Benutzer
        },
        body: JSON.stringify(newEntry),  // Neues Journal in den Request-Body einfügen
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern des Eintrags');
      }

      const data = await response.json();  // Antwort aus der API
      setEntries([...entries, data.entry]);  // Neuen Eintrag zu den bestehenden Einträgen hinzufügen
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  // Handhabt das Löschen eines Journal-Eintrags
  const handleDelete = async (id) => {
    try {
      console.log('Lösche Eintrag mit ID:', id);  // Debugging: Überprüfen der ID

      if (!id) {
        throw new Error('Keine ID zum Löschen vorhanden');
      }

      const url = `/api/journal/${id}`;  // URL für die Löschanfrage
      console.log('API URL:', url);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),  // Token für authentifizierte Benutzer
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Eintrags');
      }

      setEntries(entries.filter(entry => entry._id !== id));  // Entfernt den gelöschten Eintrag aus der Liste
    } catch (error) {
      console.error('Delete error:', error.message);
    }
  };

  // Falls der Benutzer nicht authentifiziert ist, wird ein Login-Link angezeigt
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
      <Navbar />  {/* Navbar oben auf der Seite */}
      <div className={styles.journalContent}>
        <div className={styles.journalForm}>
          <h2>Journal</h2>
          <form onSubmit={handleSubmit}>  {/* Formular zum Erstellen eines neuen Journal-Eintrags */}
            <div>
              <label>Datum:</label>
              <DatePicker 
                selected={date} 
                onChange={handleDateChange} 
                dateFormat="dd.MM.yyyy"  // Datum im Format TT.MM.JJJJ anzeigen
              />
            </div>
            <div>
              <label>Eintrag:</label>
              <textarea 
                value={entry} 
                onChange={(e) => setEntry(e.target.value)}  // Aktualisiert den Text des Journal-Eintrags
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.button}>Speichern</button>  {/* Speichert den Eintrag */}
          </form>
        </div>
        
        {/* Anzeige der vorhandenen Journal-Einträge */}
        <div className={styles.journalEntries}>
          <h2>Einträge</h2>
          {entries.map((entry, index) => {
            const formattedDate = moment(entry.date).format('YYYY-MM-DD');  // Datum formatieren
            return (
              <div key={index} className={styles.journalEntry}>
                <strong>{formattedDate}</strong>  {/* Anzeige des formatierten Datums */}
                <p>{entry.content}</p>  {/* Anzeige des Journal-Inhalts */}
                <button 
                  onClick={() => handleDelete(entry._id)}  // Löscht den Eintrag bei Klick
                  className={styles.deleteButton}
                >
                  Löschen
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />  {/* Footer am Ende der Seite */}
    </div>
  );
};

export default Journal;  // Exportiert die Journal-Komponente für die Verwendung an anderer Stelle
