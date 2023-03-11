import express from 'express';
import * as registerController from '../controllers/registerController.js';

const router = express.Router();

router.get('/:id', registerController.getUserById);

router.post('/', registerController.handleNewUser);



// router.put('/setRole', registerController.setUserRole);

export default router;