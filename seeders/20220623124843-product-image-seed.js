'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
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
      "ImageProducts",
      [
        {
          product_id : 1,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id : 2,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id : 3,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id : 4,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id : 5,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id : 6,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id : 7,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id : 8,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id : 9,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id : 10,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id : 11,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id : 12,
          url: "https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('ImageProducts', null, {});
  }
};
