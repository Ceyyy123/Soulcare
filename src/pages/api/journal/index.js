import connectToDatabase from '../../../lib/mongodb'; // MongoDB-Verbindungslogik
import Journal from './../../../models/journalEntry'; // Dein Journal-Modell

export default async function handler(req, res) {
  await connectToDatabase(); // Stelle sicher, dass du die DB-Verbindung aufbaust

  // Überprüfen, ob es sich um einen GET-Request handelt
  if (req.method === 'GET') {
    const { date } = req.query;

    try {
      // Abrufen der Journal-Einträge basierend auf dem Datum
      const entries = await Journal.find({ date: date });
      res.status(200).json(entries); // Rückgabe der Einträge als JSON
    } catch (error) {
      console.error("Fehler beim Abrufen der Journal-Einträge:", error);
      res.status(500).json({ error: 'Fehler beim Abrufen der Einträge' });
    }
  }

  // Überprüfen, ob es sich um einen POST-Request handelt
  else if (req.method === 'POST') {
    const { date, content } = req.body; // Journal-Daten aus dem Body extrahieren

    if (!date || !content) {
      return res.status(400).json({ error: 'Datum und Inhalt sind erforderlich.' });
    }

    try {
      // Erstellen eines neuen Journal-Eintrags
      const newEntry = new Journal({
        date,
        content
      });

      // Speichern des neuen Journal-Eintrags in der Datenbank
      const data = await newEntry.save();

      res.status(201).json({ message: 'Journal-Eintrag erfolgreich gespeichert.', entry: newEntry });
    } catch (error) {
      console.error("Fehler beim Speichern des Journal-Eintrags:", error);
      res.status(500).json({ error: 'Fehler beim Speichern des Journal-Eintrags' });
    }
  }

  // Wenn die Methode weder GET noch POST ist, gebe einen 405-Fehler zurück
  else {
    res.status(405).json({ error: 'Methode nicht erlaubt' }); 
  }
}