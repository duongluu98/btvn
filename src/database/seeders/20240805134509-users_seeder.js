'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',
      [
        {
     fullname: "User 1",
     email: "user1@gmail.com",
     password: "12334444",
     created_at: new Date(),
     updated_at: new Date()
    },
    {
     fullname: "User 2",
     email: "user2@gmail.com",
     password: "12334444",
     created_at: new Date(),
     updated_at: new Date()

    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {
      truncate: true,
    });
  }
};
