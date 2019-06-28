'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserType',
      [
        { title: 'Customer', code: 'customer' },
        { title: 'Service Provider', code: 'service-provider' }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserType', null, {});
  }
};
