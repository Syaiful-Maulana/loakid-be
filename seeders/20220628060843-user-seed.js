'use strict';
const bcrypt = require("bcrypt");

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
      "Users",
      [
        {
          nama: "Andi",
          email: "andi@gmail.com",
          password: bcrypt.hashSync('andi@123', 10),
          kota: "Jambi",
          alamat:"jambi, Jl no 23",
          no_hp:"085935825947",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Abdul",
          email: "abdul@gmail.com",
          password: bcrypt.hashSync('abdul@123', 10),
          kota: "Bandung",
          alamat:"Bandung, Jl no 16",
          no_hp:"082955825944",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Budi",
          email: "budi@gmail.com",
          password: bcrypt.hashSync('budi@123', 10),
          kota: "Manado",
          alamat:"Manado, jl no 10",
          no_hp:"0839354259488",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Putri",
          email: "putri@gmail.com",
          password: bcrypt.hashSync('putri@123', 10),
          kota: "Mataram",
          alamat:"Mataram, jl no 13",
          no_hp:"085935825947",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Udin",
          email: "udin@gmail.com",
          password: bcrypt.hashSync('udin@123', 10),
          kota: "Jambi",
          alamat:"Jl jambi no 23",
          no_hp:"085935825947",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Ilham",
          email: "ilham@gmail.com",
          password: bcrypt.hashSync('ilham@123', 10),
          kota: "Jambi",
          alamat:"Jl jambi no 23",
          no_hp:"087765825941",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Putra",
          email: "putra@gmail.com",
          password: bcrypt.hashSync('putra@123', 10),
          kota: "Yogyakarta",
          alamat:"Yogyakarta, Jl no 11",
          no_hp:"083935625940",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Lina",
          email: "lina@gmail.com",
          password: bcrypt.hashSync('lina@123', 10),
          kota: "Jakarta utara",
          alamat:"Jakarta utara, Jl no 14",
          no_hp:"082339825945",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Agus",
          email: "agus@gmail.com",
          password: bcrypt.hashSync('agus@123', 10),
          kota: "Jakarta Selatan",
          alamat:"Jalarta Selatan, Jl no 8",
          no_hp:"0849357259298",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Sopo",
          email: "sopo@gmail.com",
          password: bcrypt.hashSync('sopo@123', 10),
          kota: "Lampung",
          alamat:"Lampung, Jl no 4",
          no_hp:"081965824948",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Jarwo",
          email: "jarwo@gmail.com",
          password: bcrypt.hashSync('jarwo@123', 10),
          kota: "Sukabumi",
          alamat:"Sukabumi, Jl no 3",
          no_hp:"082735825973",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Melisa",
          email: "melisa@gmail.com",
          password: bcrypt.hashSync('melisa@123', 10),
          kota: "Tanggerang",
          alamat:"Tanggerang no 5",
          no_hp:"801793026893",
          avatar:"https://ik.imagekit.io/1y88cfgc5/1655987313639-baju_kDbpx7wfN.jpg",
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
     await queryInterface.bulkDelete('Users', null, {});
  }
};
