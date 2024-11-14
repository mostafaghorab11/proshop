// import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import globalErrorsHandler from './controllers/errorController.js';
import productsRouter from './routes/products.js';
import AppError from './utils/appError.js';
dotenv.config();

const port = process.env.PORT;
const app = express();

connectDB();

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/products', productsRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorsHandler);

app.listen(port, () => {
  console.log(`app is listening on port ${port} ...`);
});
