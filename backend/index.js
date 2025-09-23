import express from "express";
import pekerjaRouter from "./routes/pekerja.js";
import laporanRouter from "./routes/laporan.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// MIDDLEWARE
app.use(express.json());
app.use("/pekerja", pekerjaRouter);
app.use("/laporan", laporanRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
