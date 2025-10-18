import { AppDataSource } from "./data-source";
import app from "./app";
import config from "./config/config";

AppDataSource.initialize()
  .then(async () => {
    app.listen(config.port, () => {
      console.log("Server is running on http://localhost:" + config.port);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
