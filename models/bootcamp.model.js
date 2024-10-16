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
          min: 5,
          max: 10
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Bootcamp;
  };
  