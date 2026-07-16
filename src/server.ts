import app from "./app";
import config from "./config";
import { connectDb } from "./config/db";

const startServer = async () => {
  try {
    await connectDb();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();