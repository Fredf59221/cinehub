import express from 'express';
import usersController from '../Controllers/users.controller.js';
import checkToken from '../Middlewares/auth.middleware.js';

const router = express.Router();
router.get('/me', checkToken, usersController.me);

export default router;
