import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

if (!dbName) {
  throw new Error("MONGODB_DB environment variable is not set");
}

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise: Promise<MongoClient> =
  globalWithMongo._mongoClientPromise ?? new MongoClient(uri).connect();

globalWithMongo._mongoClientPromise = clientPromise;

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
