import express from 'express';
import screeningController from '../Controllers/screenings.controller.js';
import checkToken from '../Middlewares/auth.middleware.js';
import checkAdmin from '../Middlewares/admin.middleware.js';

const router = express.Router();
router.get('/', checkToken, screeningController.getAll);
router.get('/film/:filmId', checkToken, screeningController.getByFilm);
router.get('/:id', checkToken, screeningController.getById);
router.post('/', checkToken, checkAdmin, screeningController.create);
router.patch('/:id', checkToken, checkAdmin, screeningController.update);
router.delete('/:id', checkToken, checkAdmin, screeningController.remove);

export default router;