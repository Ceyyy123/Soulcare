import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_DB_URL);

export async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect();
  }
  const db = client.db();
  return { db, client };
}
