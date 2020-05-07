'use strict';
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const USERS = await hashPassword();
    return queryInterface.bulkInsert('Users', USERS);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};


const hashPassword =  async () => {
  let hash = await bcrypt.hash('abc123', SALT_ROUNDS);
  const USERS = [{
    fullName: 'Aflak Arshi',
    email: 'aflakarshi@test.com',
    password: hash,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    fullName: 'Test User',
    email: 'test@test.com',
    password: hash,
    createdAt: new Date(),
    updatedAt: new Date()
  }];
  return USERS;
};