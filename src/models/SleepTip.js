import mongoose from 'mongoose';

const SleepingTipSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const SleepingTip = mongoose.models.SleepingTip || mongoose.model('SleepingTip', SleepingTipSchema, 'sleeping_tips');

export default SleepingTip;
