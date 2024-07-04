import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import appRouter from "./routes/index.js";

config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Remove it in production
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);

export default app;
