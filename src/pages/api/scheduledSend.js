// pages/api/scheduledSend.js
import dbConnect from '../../utils/dbConnect.js';
import { sendNotificationEmail } from '../../utils/emailService.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Methode nicht erlaubt' });
  }

  try {
    console.log('Sofortiger Testversand gestartet');

    await dbConnect();
    console.log('Datenbank verbunden');

    // TEST: Mail direkt senden – ohne Bedingungen
    await sendNotificationEmail("soulcare.organisation@gmx.at", "JETZT", "Testmail vom Live-System");
    console.log('Testmail erfolgreich gesendet');

    return res.status(200).json({ message: "Testmail gesendet" });
  } catch (err) {
    console.error('Fehler beim Mailversand:', err.message);
    return res.status(500).json({ message: 'Fehler beim Senden', error: err.message });
  }
}
