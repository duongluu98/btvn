"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("posts-categories", "post_id", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "posts",
        },
        key: "id",
      },
    });

    await queryInterface.addColumn("posts-categories", "category_id", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "categories",
        },
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("posts-categories", "post_id");
    await queryInterface.removeColumn("posts-categories", "category_id");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
