import connectToDatabase from "../../lib/mongodb";
import User from "../../models/User";
import { sendNotificationEmail } from "../../utils/emailService";

export default async function handler(req, res) {
  await connectToDatabase();

  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, "0");
  const currentMinute = now.getMinutes().toString().padStart(2, "0");
  const currentTime = `${currentHour}:${currentMinute}`;

  console.log(" Web-Cron ausgeführt:", currentTime);

  try {
    const users = await User.find({ wantMail: true });

    for (const user of users) {
      if (user.notificationTimes.includes(currentTime)) {
        console.log(`Sende an ${user.email} um ${currentTime}`);
        await sendNotificationEmail(user.email, currentTime);
      }
    }

    res.status(200).json({ message: "Benachrichtigungen geprüft." });
  } catch (error) {
    console.error("Fehler bei Benachrichtigung:", error);
    res.status(500).json({ error: "Fehler beim Benachrichtigen." });
  }
}
