import connectToDatabase from '@/lib/mongodb';
import SleepingTip from '@/models/SleepTip';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const newTip = new SleepingTip({ text: req.body.text });
      await newTip.save();
      res.status(201).json({ message: 'Schlaf-Tipp hinzugefügt!' });
    } catch (error) {
      console.error("Fehler beim Hinzufügen eines Schlaf-Tipps:", error);
      res.status(500).json({ message: 'Fehler beim Hinzufügen des Tipps' });
    }
  } else if (req.method === 'GET') {
    const tips = await SleepingTip.find();
    res.status(200).json(tips);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
