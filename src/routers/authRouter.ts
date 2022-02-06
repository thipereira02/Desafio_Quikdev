import express from 'express';

import tokenValidationMiddleware from '../middlewares/tokenValidationMiddleware';
import * as authController from '../controllers/auth';

const router = express.Router();

router.post('/login', tokenValidationMiddleware, authController.createNewSession);

export default router;
