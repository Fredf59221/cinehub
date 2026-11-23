import express from 'express';
import roomsController from '../Controllers/rooms.controller.js';
import checkToken from '../Middlewares/auth.middleware.js';
import checkAdmin from '../Middlewares/admin.middleware.js';


const router = express.Router();
router.get('/', checkToken, roomsController.getAll);
router.get('/:id', checkToken, roomsController.getById);
router.post('/', checkToken, checkAdmin, roomsController.create);
router.patch('/:id', checkToken, checkAdmin, roomsController.update);
router.delete('/:id', checkToken, checkAdmin, roomsController.remove);



export default router;