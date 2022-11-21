import AppDataSource from "./data-source";

import app from "./app";

import "dotenv/config";

(async () => {
  const PORT = 3001;

  await AppDataSource.initialize().catch((err: Error) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
  });
})();
