import dbConnect from '../../utils/dbConnect.js';
import { sendNotificationEmail } from '../../utils/emailService.js';
import User from '../../models/User.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Methode nicht erlaubt' });
  }

  try {
    console.log('🔁 scheduledSend gestartet');

    // Datenbankverbindung
    await dbConnect();
    console.log('✅ Datenbank erfolgreich verbunden');

    // Aktuelle Zeit in deutscher Lokalzeit (UTC+2), korrekt begrenzt auf 24h
    const now = new Date();
    const offset = 2; // UTC+2 Sommerzeit
    const localHours = ((now.getUTCHours() + offset) % 24).toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    const currentTime = `${localHours}:${minutes}`;

    console.log('🕒 Lokale Zeit (UTC+2):', currentTime);

    // Benutzer abrufen
    const users = await User.find({ wantMail: true });
    console.log('👥 Gefundene Benutzer:', users.length);

    // Alle Benutzer prüfen
    for (const user of users) {
      const { email, notificationTimes } = user;

      console.log(`📩 Prüfe Benutzer: ${email}`);
      console.log('⏰ Benachrichtigungszeiten:', notificationTimes);

      // Zeitvergleich (getrimmt)
      if (notificationTimes.map(t => t.trim()).includes(currentTime.trim())) {
        console.log(`✅ Übereinstimmung: ${currentTime}, sende Mail an ${email}`);

        await sendNotificationEmail(email, currentTime, 'Deine tägliche Erinnerung');

        console.log(`📨 Mail erfolgreich gesendet an ${email}`);
      } else {
        console.log(`⏭ Keine Übereinstimmung (${currentTime} nicht in ${notificationTimes})`);
      }
    }

    return res.status(200).json({ message: 'E-Mails wurden geprüft und ggf. versendet.' });

  } catch (err) {
    console.error('❌ Fehler beim E-Mail-Versand:', err);
    return res.status(500).json({ message: 'Fehler beim E-Mail-Versand', error: err.message });
  }
}
