import express from 'express';
import pekerjaRouter from './routes/pekerjaRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
const app = express()
const port = 3000

dotenv.config()

connectDB()

app.use(express.json());
app.use('/pekerja', pekerjaRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// connectDB().then(() => {
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// }).catch((err) => {
//   console.error('Failed to connect to MongoDB', err);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port} (NO DB)`);
});