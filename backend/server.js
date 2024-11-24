// import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import connectDB from './config/db.js';
import globalErrorsHandler from './controllers/errorController.js';
import ordersRouter from './routes/orders.js';
import productsRouter from './routes/products.js';
import uploadRouter from './routes/uploadRoutes.js';
import usersRouter from './routes/users.js';
import AppError from './utils/appError.js';
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

connectDB();

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/upload', uploadRouter);

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorsHandler);

app.listen(port, () => {
  console.log(`app is listening on port ${port} ...`);
});
