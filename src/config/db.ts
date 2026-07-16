import { Db, MongoClient } from "mongodb";

let db: Db;

export const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    if (!uri) throw new Error("MONGO_URI is not defined in environment variables");
    if (!dbName) throw new Error("DB_NAME is not defined in environment variables");

    const client = new MongoClient(uri); 
    // await client.connect();

    db = client.db(dbName);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export const getDB = (): Db => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDb() first.");
  }
  return db;
};