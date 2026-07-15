import app from "./app.js";
import { connectDb } from "./config/db.js";

import config from "./config/index";

const startServer = async () => {
  await connectDb();

  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
};

startServer();