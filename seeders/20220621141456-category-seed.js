"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          nama: "Kaos & Kemeja",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Celana",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Jacket & Hoodie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Sepatu & Sandal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Accessories",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
