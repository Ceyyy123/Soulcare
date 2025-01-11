// Importiert die Funktion zum Verbinden mit der MongoDB-Datenbank und das Journal-Modell
import connectToDatabase from '../../../lib/mongodb'; // MongoDB-Verbindungslogik
import Journal from './../../../models/journalEntry'; // Das Modell für Journal-Einträge

// Der Haupt-Handler für das Abrufen und Speichern von Journal-Einträgen
export default async function handler(req, res) {
  // Stellt sicher, dass eine Verbindung zur Datenbank hergestellt wurde
  await connectToDatabase(); 

  // Überprüfen, ob es sich um eine GET-Anfrage handelt (Abrufen von Journal-Einträgen)
  if (req.method === 'GET') {
    const { date } = req.query; // Holt das Datum aus der URL-Abfrage

    try {
      // Sucht nach Journal-Einträgen, die mit dem angegebenen Datum übereinstimmen
      const entries = await Journal.find({ date: date });

      // Gibt die gefundenen Einträge als JSON zurück
      res.status(200).json(entries);
    } catch (error) {
      // Falls ein Fehler auftritt, wird dieser im Log ausgegeben und eine Fehlermeldung zurückgegeben
      console.error("Fehler beim Abrufen der Journal-Einträge:", error);
      res.status(500).json({ error: 'Fehler beim Abrufen der Einträge' });
    }
  }

  // Überprüfen, ob es sich um eine POST-Anfrage handelt (Erstellen eines neuen Journal-Eintrags)
  else if (req.method === 'POST') {
    const { date, content } = req.body; // Extrahiert das Datum und den Inhalt aus dem Body der Anfrage

    // Überprüft, ob sowohl das Datum als auch der Inhalt vorhanden sind
    if (!date || !content) {
      return res.status(400).json({ error: 'Datum und Inhalt sind erforderlich.' });
    }

    try {
      // Erstelle einen neuen Journal-Eintrag mit den angegebenen Daten
      const newEntry = new Journal({
        date,
        content
      });

      // Speichert den neuen Journal-Eintrag in der Datenbank
      const data = await newEntry.save();

      // Gibt eine Bestätigung zurück, dass der Eintrag erfolgreich gespeichert wurde
      res.status(201).json({ message: 'Journal-Eintrag erfolgreich gespeichert.', entry: newEntry });
    } catch (error) {
      // Falls ein Fehler auftritt, wird dieser im Log ausgegeben und eine Fehlermeldung zurückgegeben
      console.error("Fehler beim Speichern des Journal-Eintrags:", error);
      res.status(500).json({ error: 'Fehler beim Speichern des Journal-Eintrags' });
    }
  }

  // Wenn die Methode weder GET noch POST ist, gibt es einen Fehlerstatus 405 (Method Not Allowed)
  else {
    res.status(405).json({ error: 'Methode nicht erlaubt' }); 
  }
}
