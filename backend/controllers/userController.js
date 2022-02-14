import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

import user from "../models/user.js";
import role from "../models/role.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).send({ message: "Incomplete Data" });

  const existingUser = await user.findOne({ email });
  if (existingUser)
    return res.status(400).send({ message: "The user is already registered" });
  const passHash = await bcrypt.hash(password, 10);

  const roleId = await role.findOne({ name: "user" });

  if (!roleId) return res.status(500).send({ message: "No role was assgined" });

  const userSchema = new user({
    name,
    email,
    password: passHash,
    role: roleId._id,
    dbStatus: true,
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

const getUsers = async (_, res = Response) => {
  const users = await user.find({});

  if (!users) return res.status(500).send({ message: "Failed to get users" });

  res.status(200).send({ users });
};

export default { registerUser, getUsers };
