import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import appRouter from "./routes/index.js";
config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-ai-frontend-umber.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  })
);

app.options('*', cors()); // Handle preflight requests
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
// app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
