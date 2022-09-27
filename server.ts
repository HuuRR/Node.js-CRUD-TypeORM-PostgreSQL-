import app from "./src/app";
import { AppDataSource } from "./src/data-source";
import "dotenv/config";
require("dotenv").config();

if (process.env.NODE_ENV !== "test") {
  const init = async () => {
    const PORT = process.env.NODE_PORT || 3001;
    await AppDataSource.initialize()
      .then(() => {
        console.log("Data Source initialized");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
    app.listen(PORT, () => {
      console.log(`App is running! ${PORT}`);
    });
  };
  init();
}
