'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'UserType',
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: Sequelize.STRING(50), allowNull: false },
        code: { type: Sequelize.STRING(50), allowNull: false },
        createdBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
        updatedBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserType');
  }
};
