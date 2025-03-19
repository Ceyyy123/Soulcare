import mongoose from 'mongoose';

const AddictionTipSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

// 🟢 ACHTUNG: Der dritte Parameter muss exakt `addiction_tips` sein!
export default mongoose.models.AddictionTip || mongoose.model('AddictionTip', AddictionTipSchema, 'addiction_tips');
