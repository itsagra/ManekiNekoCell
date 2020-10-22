'use strict';
const phone = require('../phone.json')
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
