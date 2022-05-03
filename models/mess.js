'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mess.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        
        model: "Auths",
        key: "email",
      },
      unquie:true
      
    },
    messAdvance: {
      type: DataTypes.INTEGER
    },
    manDay: {
      type: DataTypes.INTEGER
    },
    dietPerDay: {
      type: DataTypes.INTEGER
    },
    specialLunch: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Mess',
  });
  return Mess;
};