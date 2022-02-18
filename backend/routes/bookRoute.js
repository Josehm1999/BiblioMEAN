import express from "express";

import { registerBook, listBooks } from "../controllers/bookController.js";
import { existingBook } from "../middleware/bookValidations.js";
const router = express.Router();

router.post("/registerBook", existingBook, registerBook);
router.get("/listBooks/:name?", listBooks);
export default router;
