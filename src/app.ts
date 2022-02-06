import './setup';

import express from 'express';
import cors from 'cors';
import 'reflect-metadata';

import connectDatabase from './database';

import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import sessionRouter from './routers/sessionRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(authRouter);
app.use(sessionRouter);

export async function init() {
  await connectDatabase();
}

export default app;
