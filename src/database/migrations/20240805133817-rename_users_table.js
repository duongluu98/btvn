'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("users", "name", "fullname")

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn("users", "fullname", "name")

  }
};
