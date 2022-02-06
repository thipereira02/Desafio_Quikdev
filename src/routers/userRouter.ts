import express from 'express';

import tokenValidationMiddleware from '../middlewares/tokenValidationMiddleware';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/signUp', userController.createNewUser);
router.get('/user/:id', tokenValidationMiddleware, userController.getUserById);
router.put('/user/:id', tokenValidationMiddleware, userController.updateUserData);

export default router;
