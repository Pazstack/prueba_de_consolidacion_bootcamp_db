module.exports = (sequelize, Sequelize) => { 
  const Bootcamp = sequelize.define("bootcamp", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cue: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 25, 
        max: 35 
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Bootcamp;
};
