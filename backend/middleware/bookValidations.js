import book from "../models/book.js";

const existingBook = async (req, res, next) => {
  const { name } = req.body;
  const bookDB = await book.findOne({ name });

  return bookDB
    ? res.status(400).send({
        message: `${name} already exists`,
      })
    : next();
};

export { existingBook };
