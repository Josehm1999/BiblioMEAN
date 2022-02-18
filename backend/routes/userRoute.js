import express from "express";

import {
  registerUser,
  listUsers,
  login,
} from "../controllers/userController.js";
import { existingUser } from "../middleware/userValidations.js";
import { existingRole } from "../middleware/roleValidations.js";
const router = express.Router();

router.post("/registerUser", [existingUser, existingRole], registerUser);
router.get("/listUsers/:name?", listUsers);
router.post("/login", login);
export default router;
