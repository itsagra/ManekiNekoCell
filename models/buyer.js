'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Buyer.belongsToMany(models.Product, {
        through: models.BuyerProduct
      })
    }
  };
  Buyer.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
    }},
    gender: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      username: {
        type: DataTypes.TEXT,
        validate: {
          allowNull: false,
          unique: true
      }}},
    birth_date: DataTypes.STRING,
    password: DataTypes.STRING,
    isLogin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Buyer',
  });

  Buyer.addHook('beforeCreate', (instance, options) => {
    // console.log(instance)
    let hashPassword = bcrypt.hashSync(instance.password, 10)
    instance.password = hashPassword
  })

  return Buyer;
};