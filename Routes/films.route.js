import express from 'express';
import filmsController from '../Controllers/films.controller.js';
import checkToken from '../Middlewares/auth.middleware.js';
import checkAdmin from '../Middlewares/admin.middleware.js';


const router = express.Router();
router.get('/', checkToken, filmsController.getAll);
router.get('/showing', checkToken, filmsController.getShowing);
router.get('/:id', checkToken, filmsController.getById);
router.post('/', checkToken, checkAdmin, filmsController.create);



export default router;