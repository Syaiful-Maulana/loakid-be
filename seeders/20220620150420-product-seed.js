'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: 1
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          seller_id: 1,
          category_id: 1,
          nama: 'Kemeja Flannel Uniqlo',
          deskripsi: 'Kemeja Flannel',
          harga: 75000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 1,
          category_id: 2,
          nama: 'Carhartt WIP Side Pants Chino',
          deskripsi: 'Chino dari Carhartt',
          harga: 85000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 1,
          category_id: 3,
          nama: 'Docmart 1461 Series',
          deskripsi: 'Sepatu Dr.Marteens',
          harga: 200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 1,
          category_id: 4,
          nama: 'Rawtype Riot - Vasrsity Series',
          deskripsi: "Varsity Jacket 90's",
          harga: 900000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 2,
          category_id: 5,
          nama: 'Zara T-Shirt',
          deskripsi: 'Kaos Zara ori pokonya',
          harga: 89000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 2,
          category_id: 1,
          nama: 'Erigo',
          deskripsi: 'Kaos',
          harga: 125000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 2,
          category_id: 2,
          nama: 'Erigo',
          deskripsi: 'Celana Pendek',
          harga: 175000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 2,
          category_id: 3,
          nama: 'Erigo',
          deskripsi: 'Celana Panjang',
          harga: 200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 3,
          category_id: 4,
          nama: 'Matoa',
          deskripsi: 'Kemeja',
          harga: 225000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 3,
          category_id: 5,
          nama: 'Matoa',
          deskripsi: 'Kaos',
          harga: 200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 3,
          category_id: 1,
          nama: 'Matoa',
          deskripsi: 'Celana Panjang',
          harga: 300000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 3,
          category_id: 2,
          nama: 'Matoa',
          deskripsi: 'Celana Pendek',
          harga: 250000,
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
    await queryInterface.bulkDelete('Products', null, {});
  },
};
