module.exports = app => {
    const users = require('../controllers/user.controller.js');
    const router = require('express').Router();
  
    router.post("/", users.createUser);
    router.get("/:id", users.findUserById);
    router.get("/", users.findAll);
    router.put("/:id", users.updateUserById);
    router.delete("/:id", users.deleteUserById);
  
    app.use('/api/users', router);
  };
  