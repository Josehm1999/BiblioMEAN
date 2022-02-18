import express from "express";

import { registerUser, listUsers } from "../controllers/userController.js";
import { existingUser } from "../middleware/userValidations.js";
import { existingRole } from "../middleware/roleValidations.js";
const router = express.Router();

router.post("/registerUser", [existingUser, existingRole], registerUser);
router.get("/listUsers/:name?", listUsers);
export default router;
