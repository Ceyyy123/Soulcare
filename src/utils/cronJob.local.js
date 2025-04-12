// Hinweis: Dieser CronJob ist nur für lokale Tests gedacht. 
// Wird auf Vercel nicht ausgeführt, da Vercel keine Hintergrundjobs unterstützt.

const cron = require("node-cron");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User"); // funktioniert jetzt korrekt mit module.exports
const { sendNotificationEmail } = require("./emailService.js");

dotenv.config();

// MongoDB verbinden (nur wenn nicht schon verbunden)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

cron.schedule("*/1 * * * *", async () => {
  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, "0");
  const currentMinute = now.getMinutes().toString().padStart(2, "0");
  const currentTime = `${currentHour}:${currentMinute}`;

  console.log("Aktuelle Zeit:", currentTime);
  console.log("Überprüfe Benutzer für Erinnerungen...");

  try {
    const users = await User.find({ wantMail: true });

    for (const user of users) {
      console.log("Prüfe:", user.email, user.notificationTimes);

      if (user.notificationTimes?.includes(currentTime)) {
        console.log("Sende E-Mail an:", user.email);
        await sendNotificationEmail(user.email, currentTime);
      }
    }

    console.log("Überprüfung abgeschlossen.");
  } catch (error) {
    console.error("Fehler beim Ausführen des CronJobs:", error);
  }
});
