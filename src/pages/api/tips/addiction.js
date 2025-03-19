import connectToDatabase from '@/lib/mongodb';
import AddictionTip from '@/models/AddictionTip';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const tips = await AddictionTip.find();
    console.log("GET Anfrage - Tipps aus der DB:", tips);  // 🟢 Log für Debugging
    res.status(200).json(tips);
  } else if (req.method === 'POST') {
    try {
      const newTip = new AddictionTip({ text: 'Test-Tipp: Trinke Wasser!' });
      await newTip.save();
      console.log("POST Anfrage - Neuer Tipp hinzugefügt!");
      res.status(201).json({ message: 'Tipp hinzugefügt!' });
    } catch (error) {
      console.error("Fehler beim Hinzufügen eines Tipps:", error);
      res.status(500).json({ message: 'Fehler beim Hinzufügen des Tipps' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
