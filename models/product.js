'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    formatRupiah() {
      let separator,prefix
      let number_string = this.price.toString().replace(/[^,\d]/g, '')
      let split = number_string.split(',')
      let sisa = split[0].length % 3
      let rupiah = split[0].substr(0, sisa)
      let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  
      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if(ribuan){
          separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
      }
  
      rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
      return prefix == undefined ? 'Rp. ' + rupiah : (rupiah ? rupiah : '');
    }
    
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Buyer, {
        through: models.BuyerProduct
      })
    }
  };
  Product.init({
    product_name: DataTypes.STRING,
    description: DataTypes.STRING,
    brand: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};