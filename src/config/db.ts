import { Db, MongoClient } from "mongodb";

let db: Db;
export const connectDb = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    db = client.db(process.env.DB_NAME);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export const getDB = () => db;
