'use strict';

/** @type {import('sequelize-cli').Model} */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
  }, {
    tableName: 'users', 
  });

  return User;
};
