import bcrypt from 'bcrypt';

import user from '../models/user.js';
import generateJWT from '../helpers/generateJWT.js';

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const passHash = await bcrypt.hash(password, 10);

  const userSchema = new user({
    name,
    email,
    password: passHash,
    role,
  });

  const result = await userSchema.save();

  if (!result)
    return res.status(500).send({ message: 'Failed to register user' });

  try {
    const token = await generateJWT(result);
    return res.status(200).json({
      token,
    });
  } catch (error) {}
};

const listUsers = async (req, res = Response) => {
  const users = await user
    .find({
      $and: [{ name: new RegExp(req.params['name']) }, { dbStatus: 'true' }],
    })
    .populate('role')
    .exec();

  return users.length === 0
    ? res.status(500).send({ message: 'No results were found' })
    : res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await user.findOne({
    $and: [
      {
        email: req.body.email,
      },
      { dbStatus: 'true' },
    ],
  });

  if (!userLogin)
    return res.status(400).send({ message: 'Wrong email or password' });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password);

  if (!passHash)
    return res.status(400).send({ message: 'Wrong email or password' });

  try {
    const token = await generateJWT(userLogin);
    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).send({ message: 'Login error' });
  }
};

const listUserAdmin = async (req, res = Response) => {
  const users = await user
    .find({ name: new RegExp(req.params['name']) })
    .populate('role')
    .exec();

  return users.length === 0
    ? res.status(500).send({ message: 'No search results' })
    : res.status(200).send({ users });
};

const deleteUser = async (req, res = Response) => {
  if (!req.params['_id'])
    return res.status(400).send({ message: 'Incomplete data' });

  const users = await user.findByIdAndUpdate(req.params['_id'], {
    dbStatus: false,
  });

  return !users
    ? res.status(400).send({ message: 'Error deleting user' })
    : res.status(200).send({ message: 'User deleted' });
};

const updateUserAdmin = async (req, res = Response) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({ message: 'Incomplete data' });

  let pass = '';

  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }

  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    role: req.body.role,
  });

  return !editUser
    ? res.status(500).send({ message: 'Error editing user' })
    : res.status(200).send({ message: 'User updated ' });
};

export {
  registerUser,
  listUsers,
  listUserAdmin,
  login,
  deleteUser,
  updateUserAdmin,
};
