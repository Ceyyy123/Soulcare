// src/pages/api/testResend.js

const { sendNotificationEmail } = require("../../utils/emailService");

const handler = async (req, res) => {
  await sendNotificationEmail("deineMail@domain.com", "TESTZEIT 13:34");
  res.status(200).json({ message: "Test-E-Mail ausgelöst" });
};

export default handler;
