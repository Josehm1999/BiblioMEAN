import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

import user from "../models/user.js";
import generateJWT from "../helpers/generateJWT.js";
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).send({ message: "Incomplete Data" });

  const passHash = await bcrypt.hash(password, 10);

  const userSchema = new user({
    name,
    email,
    password: passHash,
    role: req.body.role_id,
  });

  const result = await userSchema.save();

  if (!result)
    return res.status(500).send({ message: "Failed to register user" });

  try {
    const token = await generateJWT(result);
    return res.status(200).json({
      token,
    });
  } catch (error) {}
};

const listUsers = async (req, res = Response) => {
  const users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();

  return users.length === 0
    ? res.status(500).send({ message: "No results were found" })
    : res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await user.findOne({
    email: req.body.email,
    dbStatus: true,
  });

  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password);

  if (!passHash)
    return res.status(400).send({ message: "Wrong email or password" });

  try {
    const token = await generateJWT(userLogin);
    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).send({ message: "Login error" });
  }
};

export { registerUser, listUsers, login };
