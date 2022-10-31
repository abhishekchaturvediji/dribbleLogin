'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTweets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserTweets.init({
    tweets: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName : 'user_tweets',
    modelName: 'UserTweets',
  });
  return UserTweets;
};