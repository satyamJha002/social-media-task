import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js";
import connectDB from "./config/db.js";

configDotenv();

const PORT = process.env.PORT || 3000;

const app = express();

connectDB();

// middleware function used to parse incoming request bodies, allowing your server to access data sent from clients in either JSON format (express.json()) or URL-encoded format (express.urlencoded()), which is typically used for traditional HTML form submissions.

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello Server running");
});

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
