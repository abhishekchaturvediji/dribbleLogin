'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile_no: DataTypes.INTEGER,
    status: DataTypes.STRING,
    token: DataTypes.STRING,
    image: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    tableName : 'user',
    modelName: 'User',
  });
  return User;
};