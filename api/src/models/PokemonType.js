const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('PokemonType', {
    id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: false });
};
