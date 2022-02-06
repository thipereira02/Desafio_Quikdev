import './setup';

import express from 'express';
import cors from 'cors';
import 'reflect-metadata';

import connectDatabase from './database';

import * as userController from './controllers/userController';
import * as authController from './controllers/auth';
import tokenValidationMiddleware from './middlewares/tokenValidationMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/signUp', userController.createNewUser);
app.post('/login', authController.createNewSession);
app.get('/user/:id', userController.getUserById);
app.delete('/user/:id', userController.deleteUser);

export async function init() {
  await connectDatabase();
}

export default app;
