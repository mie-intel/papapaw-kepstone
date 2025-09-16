const express = require('express');
const app = express();
const port = 3000;
const pekerjaRouter = require('./routes/pekerja');
// const connectDB = require('./config/db'); // ADD THIS

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