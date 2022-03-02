import express from 'express';

import {
  registerUser,
  listUsers,
  login,
  deleteUser,
  updateUserAdmin,
  listUserAdmin,
} from '../controllers/userController.js';
import { existingUser, emptyValues } from '../middleware/userValidations.js';
import { existingRole } from '../middleware/roleValidations.js';
const router = express.Router();

router.post(
  '/register',
  [existingUser, existingRole, emptyValues],
  registerUser
);
router.get('/listUsers/:name?', listUsers);
router.get('/listAdmin/:name?', listUserAdmin);
router.post('/login', login);
router.delete('/delete/:_id', deleteUser);
router.put('/updateUserAdmin', updateUserAdmin);
export default router;
