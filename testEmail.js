import { sendNotificationEmail } from "./src/utils/emailService.js";

sendNotificationEmail("deineTestEmail@gmail.com", "07:00").then(() =>
  console.log("✅ Test-Mail wurde gesendet!")
);
