const cron = require("node-cron");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const { sendNotificationEmail } = require("./emailService.js");

dotenv.config();

// Stelle sicher, dass MongoDB verbunden ist
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CronJob läuft jede volle Stunde
cron.schedule("0 * * * *", async () => {
  console.log("Überprüfe Benutzer für Erinnerungen...");

  try {
    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, "0");
    const currentMinute = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${currentHour}:${currentMinute}`;

    // Alle Nutzer mit wantMail: true abrufen
    const users = await User.find({ wantMail: true });

    for (const user of users) {
      if (user.notificationTimes.includes(currentTime)) {
        await sendNotificationEmail(user.email, currentTime);
      }
    }

    console.log("Alle fälligen Erinnerungen wurden gesendet.");
  } catch (error) {
    console.error("Fehler beim Ausführen des CronJobs:", error);
  }
});
