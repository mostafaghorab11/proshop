// import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import products from './data/products.js';
dotenv.config();

const port = process.env.PORT;
const app = express();

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`app is listening on port ${port} ...`);
});
