'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('phones',
      [
        {
     value: "0099999999",
     user_id: 1,
     created_at: new Date(),
     updated_at: new Date()
    },
    {
     value: "011111111",
     user_id: 2,
     created_at: new Date(),
     updated_at: new Date()
    },
])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('phones', null, {
      truncate: true,
});/**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
