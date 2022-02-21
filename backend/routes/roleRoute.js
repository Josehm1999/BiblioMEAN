import express from 'express';

import {
  deleteRole,
  listRoles,
  listRolesAdmin,
  registerRole,
  updateRoleAdmin,
} from '../controllers/roleController.js';

const router = express.Router();

router.post('/registerRole', registerRole);
router.get('/listRoles/:name?', listRoles);
router.get('/listRolesAdmin/:name?', listRolesAdmin);
router.delete('/delete/:_id', deleteRole);
router.put('/updateRole', updateRoleAdmin);
export default router;
