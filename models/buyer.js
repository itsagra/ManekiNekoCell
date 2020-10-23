'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
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
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    username: DataTypes.STRING,
    birth_date: DataTypes.STRING,
    password: DataTypes.STRING
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