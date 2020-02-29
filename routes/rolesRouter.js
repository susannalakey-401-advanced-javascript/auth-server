const express = require('express');
const rolesRouter = express.Router();

const Role = require('../models/roles')

rolesRouter.get('/roles', async (req, res, next) => {
  const allRoles = await Role.find({})
  res.status(200).json(allRoles);
})

rolesRouter.post('/roles', async (req, res, next) => {
  const role = new Role(req.body);
  const created = await role.save();
  res.status(201).json(created);
})


module.exports = rolesRouter;