const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelo de usuario
db.users = require('./user.model.js')(sequelize, Sequelize);
// Importar modelo de bootcamp
db.bootcamps = require('./bootcamp.model.js')(sequelize, Sequelize);

// Define relaciones
db.users.belongsToMany(db.bootcamps, { through: "user_bootcamps" });
db.bootcamps.belongsToMany(db.users, { through: "user_bootcamps" });

module.exports = db;
