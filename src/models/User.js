import mongoose from "mongoose";

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
    default: undefined, // Falls wantMail false ist, bleibt es leer
    validate: {
      validator: function (times) {
        if (!this.wantMail) return true; // Wenn wantMail false ist, dann keine Prüfung
        if (!times || times.length !== 2) return false; // Es müssen genau 2 Zeiten sein

        // Zeiten in Stunden umwandeln
        const [time1, time2] = times.map((time) => {
          const [hours, minutes] = time.split(":").map(Number);
          return hours + minutes / 60;
        });

        return Math.abs(time1 - time2) === 12; // Prüft, ob genau 12 Stunden Unterschied sind
      },
      message: "Die beiden Zeiten müssen genau 12 Stunden auseinander liegen."
    },
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
