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
    email:{
     type: DataTypes.STRING,
     allowNull:false,
     references: {
          
      model: "Auths",
      key: "email",
    }
    },
    menDay: DataTypes.INTEGER,
    dailyCharge: DataTypes.INTEGER,
    month: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mess',
  });
  return Mess;
};