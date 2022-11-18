import AppDataSource from "./data-source";

import app from "./app";

import "dotenv/config";

(async () => {
  await AppDataSource.initialize().catch((err: Error) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running");
  });
})();
