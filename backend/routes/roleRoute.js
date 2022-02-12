import express from "express";

import { getRoles, registerRole } from "../controllers/roleController.js";

const router = express.Router();

router.post("/registerRole", registerRole);
router.get("/", getRoles);
export default router;
