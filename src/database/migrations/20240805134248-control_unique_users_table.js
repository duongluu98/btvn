'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("users", "users_email_key")
  },

  async down (queryInterface, Sequelize) {
    down:
await queryInterface.addConstraint("users", {
  fields: ["email"],
  type: "unique",
  name: "users_email_key"
})
  }
};
