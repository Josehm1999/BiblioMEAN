import express from 'express';

import {
  registerBook,
  listBooks,
  listBooksAdmin,
  deleteBook,
  updateBookAdmin,
} from '../controllers/bookController.js';
import { existingBook } from '../middleware/bookValidations.js';
const router = express.Router();

router.post('/registerBook', existingBook, registerBook);
router.get('/listBooks/:name?', listBooks);
router.get('/listBooksAdmin/:name?', listBooksAdmin);
router.delete('/delete/:_id', deleteBook);
router.put('/updateBookAdmin', updateBookAdmin);
export default router;
