import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import appRouter from "./routes/index.js";
config();
const app = express();

//middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-ai-frontend-umber.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
