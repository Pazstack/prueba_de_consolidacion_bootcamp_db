const db = require('../models');
const Bootcamp = db.bootcamps;
const User = db.users;

exports.createBootcamp = (req, res) => {
  const { title, cue, description } = req.body;
  Bootcamp.create({ title, cue, description })
    .then(bootcamp => res.status(201).json(bootcamp))
    .catch(err => res.status(400).json({ error: err.message }));
};

exports.addUser = (req, res) => {
  const bootcampId = req.params.bootcampId;
  const userId = req.params.userId;

  Bootcamp.findByPk(bootcampId)
    .then(bootcamp => {
      if (!bootcamp) return res.status(404).json({ error: "Bootcamp not found" });
      User.findByPk(userId).then(user => {
        if (!user) return res.status(404).json({ error: "User not found" });
        bootcamp.addUser(user);
        res.json({ message: "User added to bootcamp" });
      });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Bootcamp.findByPk(id, { include: User })
    .then(bootcamp => res.json(bootcamp))
    .catch(err => res.status(404).json({ error: "Bootcamp not found" }));
};

exports.findAll = (req, res) => {
  Bootcamp.findAll({ include: User })
    .then(bootcamps => res.json(bootcamps))
    .catch(err => res.status(500).json({ error: err.message }));
};
