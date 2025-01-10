// pages/api/journal/[id].js
import connectToDatabase from '../../../lib/mongodb';
import Journal from './../../../models/journalEntry';

export default async function handler(req, res) {
  await connectToDatabase(); // Sicherstellen, dass die DB-Verbindung aufgebaut wird

  const { id } = req.query; // Holen des id-Parameters aus der URL

  if (req.method === 'DELETE') {
    try {
      // Löschen des Journal-Eintrags anhand der ID
      const deletedEntry = await Journal.findByIdAndDelete(id);

      if (!deletedEntry) {
        return res.status(404).json({ error: 'Eintrag nicht gefunden' });
      }

      res.status(200).json({ message: 'Eintrag erfolgreich gelöscht' });
    } catch (error) {
      console.error('Fehler beim Löschen des Eintrags:', error);
      res.status(500).json({ error: 'Fehler beim Löschen des Eintrags' });
    }
  } else {
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}