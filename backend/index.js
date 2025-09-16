import express from 'express';
const app = express()
const port = 3000

import pekerjaRouter from './routes/pekerjaRoutes.js';

app.use(express.json());

app.use('/pekerja', pekerjaRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})