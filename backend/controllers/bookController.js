import Response from "express";
import book from "../models/book.js";

const registerBook = async (req, res = Response) => {
  const { name, owner, price, category, description, img } = req.body;

  if (!name || !owner || !description || !price || !category)
    return res.status(400).send({
      message: "Incomplete data",
    });

  let schema = new book({
    name,
    owner,
    price,
    category,
    description,
    img,
  });

  let result = await schema.save();
  return !result
    ? res.status(500).send({ message: "Failed to register book test" })
    : res.status(200).send({ result });
};

const listBooks = async (req, res = Response) => {
  const books = await book
    .find({ name: new RegExp(req.params["name"]) })
    .populate("owner")
    .exec();

  return books.length === 0
    ? res.status(500).send({ message: "No results were found" })
    : res.status(200).send({ books });
};

export { registerBook, listBooks };
