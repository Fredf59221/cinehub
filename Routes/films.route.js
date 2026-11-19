import express from 'express';
import filmsController from '../Controllers/films.controller.js';
import checkToken from '../Middlewares/auth.middleware.js';

const router = express.Router();
router.get('/', checkToken, filmsController.getAll);
router.get('/showing', checkToken, filmsController.getShowing);
router.get('/:id', checkToken, filmsController.getById);



export default router;