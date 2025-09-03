import express, { Request, Response, NextFunction } from "express";
import path from "path";
import guitarRoutes from "./routes/guitarRoutes";
import userRoutes from "./routes/userRoutes";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json()); // Add this line to enable JSON parsing in the request body

app.use(express.static(path.join(__dirname, "/images"))); // Serve images in directory images/

app.use("/guitar", guitarRoutes); // Add this line to mount the Guitar API routes
app.use("/user", userRoutes); // Add this line to mount the Guitar API routes

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export default app;
