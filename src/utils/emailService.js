const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Mail-Funktion
const sendNotificationEmail = async (to, time) => {
  try {
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM, // z.B. onboarding@resend.dev
      to,
      subject: "Deine tägliche SoulCare-Erinnerung",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">Zeit für deine Reflexion!</h2>
          <p>Hallo,</p>
          <p>Dies ist eine kleine Erinnerung, dass es jetzt <strong>${time}</strong> ist und du dir einen Moment für dich selbst nehmen kannst.</p>
          <p>Bleib achtsam,</p>
          <p style="color: #5e9c76;">💚 Dein SoulCare Team</p>
        </div>
      `,
    });

    console.log("E-Mail gesendet:", response);
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
  }
};

module.exports = { sendNotificationEmail };
