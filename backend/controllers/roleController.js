import Response from "express";
import role from "../models/role.js";

const registerRole = async (req, res = Response) => {
  const { name, description } = req.body;
  const roleDB = await role.findOne({ name });

  if (!name || !description)
    return res.status(400).send({
      message: "Incomplete data",
    });

  if (roleDB) {
    return res.status(400).send({
      message: `El rol ${name} ya existe.`,
    });
  }

  let schema = new role({
    name,
    description,
  });

  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register role" });

  res.status(200).send({ result });
};

const getRoles = async (_, res = Response) => {
  const roles = await role.find({});

  if (!roles) return res.status(500).send({ message: "Failed to get roles" });

  res.status(200).send({ roles });
};

export { registerRole, getRoles };
