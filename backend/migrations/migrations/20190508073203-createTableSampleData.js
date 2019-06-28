'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'SampleData',
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        data: { type: Sequelize.STRING },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SampleData');
  }
};
