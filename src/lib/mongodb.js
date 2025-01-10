import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/soulcare';

if (!MONGO_URI) {
  throw new Error('Fehler: MONGO_URL ist nicht definiert!');
}

let cached = global.mongoose;

if (!cached) {
    console.log("caching fehler")
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    console.log("connecting hat gestartet")
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log('MongoDB verbunden');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;