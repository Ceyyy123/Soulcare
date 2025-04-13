import dbConnect from '../../utils/dbConnect.js';
import { sendNotificationEmail } from '../../utils/emailService.js';
import User from '../../models/User.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Methode nicht erlaubt' });
  }

  try {
    console.log('🔁 scheduledSend gestartet');

    await dbConnect();
    console.log('✅ DB verbunden');

    const users = await User.find({ wantMail: true });

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
    console.log('🕒 Aktuelle Zeit:', currentTime);
    console.log('👥 Benutzer mit wantMail=true:', users.length);

    for (const user of users) {
      const { email, notificationTimes } = user;

      console.log(`→ Prüfe ${email}`);
      console.log('→ Erwartete Zeiten:', notificationTimes);

      if (notificationTimes.includes(currentTime)) {
        console.log(`✅ Zeit stimmt überein (${currentTime}), sende Mail an ${email}`);
        await sendNotificationEmail(email, currentTime, 'Deine tägliche Erinnerung');
        console.log(`📨 Mail an ${email} erfolgreich gesendet`);
      } else {
        console.log(`⏭ ${email}: Keine Übereinstimmung (${currentTime} nicht in ${notificationTimes})`);
      }
    }

    return res.status(200).json({ message: 'E-Mails geprüft und ggf. gesendet.' });
  } catch (err) {
    console.error('❌ Fehler in scheduledSend:', err.message);
    return res.status(500).json({ message: 'Fehler beim Senden', error: err.message });
  }
}
