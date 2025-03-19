import handler from '../pages/api/journal/index'; // Die zu testende Funktion
import { createMocks } from 'node-mocks-http';
import Journal from '../models/journalEntry';

// Mock für die gesamte `mongodb.js`-Datei
jest.mock('../lib/mongodb', () => ({
    __esModule: true, // Kennzeichnet den Import als ES-Modul
    default: jest.fn(), // Mock für den Default Export
  }));

  import connectToDatabase from '../lib/mongodb';

jest.mock('../models/journalEntry', () => ({
  find: jest.fn(),
  prototype: {
    save: jest.fn(),
  },
}));

describe('Journal API Handler', () => {
    beforeAll(() => {
        // Mock für eine erfolgreiche Verbindung zur Datenbank
        connectToDatabase.mockResolvedValue(true);
      });

      afterAll(() => {
        jest.clearAllMocks(); // Bereinigt alle Mocks nach den Tests
      });

  describe('GET /api/journal', () => {
    it('should return journal entries for a specific date', async () => {
      // Mock: Beispiel-Daten für das Journal
      const mockEntries = [
        { date: '2025-01-01', content: 'Neujahrsvorsätze' },
        { date: '2025-01-01', content: 'Noch ein Vorsatz' },
      ];
      Journal.find.mockResolvedValue(mockEntries); // Mock für die Datenbankabfrage

      // Simuliert eine GET-Anfrage
      const { req, res } = createMocks({
        method: 'GET',
        query: { date: '2025-01-01' },
      });

      await handler(req, res);

      // Erwartet Status 200 und die zurückgegebenen Einträge
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(mockEntries);
    });

    it('should return a 500 error if the database query fails', async () => {
      // Mock: Fehler bei der Datenbankabfrage
      Journal.find.mockRejectedValue(new Error('Datenbankfehler'));

      const { req, res } = createMocks({
        method: 'GET',
        query: { date: '2025-01-01' },
      });

      await handler(req, res);

      // Erwartet Status 500 und eine Fehlermeldung
      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Fehler beim Abrufen der Einträge',
      });
    });
  });

  describe('POST /api/journal', () => {

    it('should return 400 if required fields are missing', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { content: 'Kein Datum' }, // Fehlendes "date"-Feld
      });

      await handler(req, res);

      // Erwartet Status 400 und eine Fehlermeldung
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Datum und Inhalt sind erforderlich.',
      });
    });

    it('should return a 500 error if saving fails', async () => {
      // Mock: Fehler beim Speichern
      Journal.prototype.save.mockRejectedValue(new Error('Speicherfehler'));

      const { req, res } = createMocks({
        method: 'POST',
        body: { date: '2025-01-01', content: 'Fehler beim Speichern' },
      });

      await handler(req, res);

      // Erwartet Status 500 und eine Fehlermeldung
      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Fehler beim Speichern des Journal-Eintrags',
      });
    });
  });

  describe('Unsupported Methods', () => {
    it('should return 405 for unsupported HTTP methods', async () => {
      const { req, res } = createMocks({
        method: 'PUT', // Nicht unterstützte Methode
      });

      await handler(req, res);

      // Erwartet Status 405 und eine Fehlermeldung
      expect(res._getStatusCode()).toBe(405);
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Methode nicht erlaubt',
      });
    });
  });
});
