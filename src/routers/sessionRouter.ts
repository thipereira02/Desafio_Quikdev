import express from 'express';

import tokenValidationMiddleware from '../middlewares/tokenValidationMiddleware';
import * as sessionController from '../controllers/sessionController';

const router = express.Router();

router.delete('/logout', tokenValidationMiddleware, sessionController.deleteSession);

export default router;
