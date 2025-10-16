import { AppDataSource } from "./data-source";
import * as express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import path = require("path");
import cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

import config from "./config/config";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import guitarRouter from "./routes/guitar.routes";
import reportRouter from "./routes/reporting.routes";
import { errorHandler } from "./middlewares/errorHandler";

// Pass the global passport object into the configuration function
require("./config/passport")(passport);

const app = express();

// This will initialize the passport object on every request
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(express.static(path.join(__dirname, "..", "src", "/images"))); // Serve images in directory images/

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/guitar", guitarRouter);
app.use("/reporting", reportRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(config.port, () => {
      console.log("Server is running on http://localhost:" + config.port);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
