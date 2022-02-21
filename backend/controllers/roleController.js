import Response from 'express';
import role from '../models/role.js';

const registerRole = async (req, res = Response) => {
  const { name, description } = req.body;
  const roleDB = await role.findOne({ name });

  if (!name || !description)
    return res.status(400).send({
      message: 'Incomplete data',
    });

  if (roleDB) {
    return res.status(400).send({
      message: `${name} doesn't exist.`,
    });
  }

  let schema = new role({
    name,
    description,
  });

  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: 'Failed to register role' });

  res.status(200).send({ result });
};

const listRoles = async (req, res = Response) => {
  const roles = await role.find({
    $and: [{ name: new RegExp(req.params['name']) }, { dbStatus: 'true' }],
  });
  return roles.length === 0
    ? res.status(500).send({ message: 'No roles were found' })
    : res.status(200).send({ roles });
};

const listRolesAdmin = async (req, res = Response) => {
  const roles = await role.find({ name: new RegExp(req.params['name']) });
  return roles.length === 0
    ? res.status(500).send({ message: 'No roles were found' })
    : res.status(200).send({ roles });
};

const deleteRole = async (req, res = Response) => {
  if (!req.params['_id'])
    return res.status(400).send({ message: 'Incomplete data' });

  const roles = await role.findByIdAndUpdate(req.params['_id'], {
    dbStatus: false,
  });

  return !roles
    ? res.status(400).send({ message: 'Error deleting role' })
    : res.status(200).send({ message: 'Role deleted' });
};

const updateRoleAdmin = async (req, res = Response) => {
  if (!req.body._id || !req.body.description)
    return res.status(400).send({ message: 'Incomplete data' });

  let dbStatus = '';

  if (!req.body.dbStatus) {
    const findRole = await role.findOne({ _id: req.body._id });
    dbStatus = findRole.dbStatus;
  } else {
    dbStatus = req.body.dbStatus;
  }
  const editRole = await role.findByIdAndUpdate(req.body._id, {
    description: req.body.description,
    dbStatus,
  });

  return !editRole
    ? res.status(500).send({ message: 'Error editing role' })
    : res.status(200).send({ message: 'Role updated' });
};
export { registerRole, listRoles, listRolesAdmin, deleteRole, updateRoleAdmin };
