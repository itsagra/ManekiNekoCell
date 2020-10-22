'use strict';
const phone = require('../datas/phone.json')
phone.forEach(element => {
  element.createdAt = new Date()
  element.updatedAt = new Date()
})
module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', phone, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
};
