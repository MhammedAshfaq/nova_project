import express, { Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

import "reflect-metadata";
import AppDataSource from "./db/config";

dotenv.config;
const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(helmet());

// Database init
AppDataSource.initialize()
  .then(() => {
    console.log("SQL Database connected");
  })
  .catch((error) => {
    console.log("SQL not conected", error);
  });

app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);

app.listen(PORT, () => {
  console.log(`Server Running on port http://localhost:${PORT}`);
});
