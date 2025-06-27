import 'reflect-metadata';
import 'dotenv/config';
import './config/container';
import express from 'express';
import bodyParser from 'body-parser';
import generalRouter from './routes/general.route';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import { errorHandler } from './middlewares/error.middleware';

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(bodyParser.json());

app.use('/', generalRouter)
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
