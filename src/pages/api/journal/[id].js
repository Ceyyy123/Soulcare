// Importiert die Funktion zum Verbinden mit der MongoDB-Datenbank und das Journal-Modell
import connectToDatabase from '../../../lib/mongodb'; // Zum Herstellen der Verbindung zur MongoDB
import Journal from './../../../models/journalEntry'; // Das Modell für Journal-Einträge

// Der Haupt-Handler für das Löschen eines Journal-Eintrags
export default async function handler(req, res) {
  // Stellt sicher, dass die Verbindung zur Datenbank hergestellt wurde
  await connectToDatabase();

  // Holt den 'id'-Parameter aus der URL der Anfrage
  const { id } = req.query; // Die ID des Journal-Eintrags wird aus der URL extrahiert

  // Überprüft, ob die Anfrage eine DELETE-Methode ist, die zum Löschen des Journal-Eintrags dient
  if (req.method === 'DELETE') {
    try {
      // Versucht, den Journal-Eintrag anhand der ID zu löschen
      const deletedEntry = await Journal.findByIdAndDelete(id);

      // Wenn kein Eintrag gefunden wird, wird eine Fehlermeldung zurückgegeben
      if (!deletedEntry) {
        return res.status(404).json({ error: 'Eintrag nicht gefunden' });
      }

      // Gibt eine Bestätigung zurück, dass der Eintrag erfolgreich gelöscht wurde
      res.status(200).json({ message: 'Eintrag erfolgreich gelöscht' });
    } catch (error) {
      // Wenn beim Löschen ein Fehler auftritt, wird dieser im Server-Log ausgegeben und eine Fehlermeldung zurückgegeben
      console.error('Fehler beim Löschen des Eintrags:', error);
      res.status(500).json({ error: 'Fehler beim Löschen des Eintrags' });
    }
  } else {
    // Wenn eine Methode außer DELETE verwendet wird, wird ein Fehler zurückgegeben
    res.status(405).json({ error: 'Methode nicht erlaubt' });
  }
}
