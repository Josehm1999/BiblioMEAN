import Response from 'express';
import book from '../models/book.js';

const registerBook = async (req, res = Response) => {
  const { name, author, price, category, description, img } = req.body;

  if (!name || !author || !description || !price || !category)
    return res.status(400).send({
      message: 'Incomplete data',
    });

  let schema = new book({
    name,
    author,
    price,
    category,
    description,
    img,
  });

  let result = await schema.save();
  return !result
    ? res.status(500).send({ message: 'Failed to register book test' })
    : res.status(200).send({ result });
};

const listBooks = async (req, res = Response) => {
  const books = await book
    .find({
      $and: [{ name: new RegExp(req.params['name']) }, { dbStatus: 'true' }],
    })
    .populate('author')
    .exec();

  return books.length === 0
    ? res.status(500).send({ message: 'No results were found' })
    : res.status(200).send({ books });
};

const listBooksAdmin = async (req, res = Response) => {
  const books = await book
    .find({ name: new RegExp(req.params['name']) })
    .populate('author')
    .exec();

  return books.length === 0
    ? res.status(500).send({ message: 'No results were found' })
    : res.status(200).send({ books });
};

const deleteBook = async (req, res = Response) => {
  if (!req.params['_id'])
    return res.status(400).send({ message: 'Incomplete data' });

  const books = await book.findByIdAndUpdate(
    { _id: req.params['_id'] },
    { dbStatus: 'false' }
  );

  return !books
    ? res.status(500).send({ message: 'Error deleting book' })
    : res.status(200).send({ message: 'Book deleted' });
};

const updateBookAdmin = async (req, res = Response) => {
  const { _id, price, category, description, img } = req.body;
  if (!_id || !price || !category || !description)
    return res.status(400).send({ message: 'Incomplete data' });

  let dbStatus = '';

  if (!req.body.dbStatus) {
    const findBook = await book.findOne({ _id });
    dbStatus = findBook.dbStatus;
  } else {
    dbStatus = req.body.dbStatus;
  }
  const editBook = await book.findByIdAndUpdate(_id, {
    price,
    category,
    description,
    dbStatus,
    img,
  });

  return !editBook
    ? res.status(500).send({ message: 'Error editing book' })
    : res.status(200).send({ message: 'Book updated' });
};
export { registerBook, listBooks, listBooksAdmin, deleteBook, updateBookAdmin };
