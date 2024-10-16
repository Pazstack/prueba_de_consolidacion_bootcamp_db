const db = require('../models');
const User = db.users;
const Bootcamp = db.bootcamps;

exports.createUser = (req, res) => {
  const { firstName, lastName, email } = req.body;
  User.create({ firstName, lastName, email })
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json({ error: err.message }));
};

exports.findUserById = (req, res) => {
  const id = req.params.id;
  User.findByPk(id, { include: Bootcamp })
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ error: "User not found" }));
};

exports.findAll = (req, res) => {
  User.findAll({ include: Bootcamp })
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateUserById = (req, res) => {
  const id = req.params.id;
  User.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.json({ message: "User updated successfully" });
      else res.status(404).json({ error: "User not found" });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteUserById = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.json({ message: "User deleted successfully" });
      else res.status(404).json({ error: "User not found" });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};
