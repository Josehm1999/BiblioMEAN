import user from '../models/user.js';

const existingUser = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).send({ message: 'Incomplete Data' });

  const existingUser = await user.findOne({ email });
  return existingUser
    ? res.status(400).send({ message: 'The user is already registered' })
    : next();
};
const emptyValues = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  return !name || !email || !password || !role
    ? res.status(400).send({ message: 'Incomplete Data' })
    : next();
};
export { existingUser, emptyValues };
