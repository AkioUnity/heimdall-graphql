'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Service',
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING(50), allowNull: false },
        baseServiceCharge: { type: Sequelize.INTEGER, allowNull: false },
        fee: { type: Sequelize.INTEGER, allowNull: false },
        numberOfLabors: { type: Sequelize.INTEGER, allowNull: false },
        estimatedServiceTime: { type: Sequelize.STRING, allowNull: false },
        createdBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
        updatedBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Service');
  }
};
