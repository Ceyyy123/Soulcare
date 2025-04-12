const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  wantMail: {
    type: Boolean,
    default: false
  },
  notificationTimes: {
    type: [String],
    default: undefined,
    validate: {
      validator: function (times) {
        if (!this.wantMail) return true;
        if (!times || times.length !== 2) return false;

        const [time1, time2] = times.map((time) => {
          const [hours, minutes] = time.split(":").map(Number);
          return hours + minutes / 60;
        });

        const diff = Math.abs(time1 - time2);
        return diff >= 11.99 && diff <= 12.01;
      },
      message: "Die beiden Zeiten müssen genau 12 Stunden auseinander liegen."
    }
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
