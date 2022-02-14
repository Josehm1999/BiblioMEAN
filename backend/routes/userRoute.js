import express from "express";

import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/registerUser", userController.registerUser);
router.get("/", userController.getUsers);
export default router;
