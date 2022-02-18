import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

import user from "../models/user.js";

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
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
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

export { registerUser, listUsers };
