'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rav_registered_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rav_registered_user.init({
    name: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    email: DataTypes.STRING,
    college_name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rav_registered_user',
  });
  return rav_registered_user;
};