'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'UserService',
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: Sequelize.INTEGER, allowNull: false },
        serviceId: { type: Sequelize.INTEGER, allowNull: false },
        createdBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
        updatedBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
      }
    ).then(() => {
      return queryInterface.addConstraint('UserService', ['userId'], {
        type: 'foreign key',
        name: 'FK_UserService_User',
        references: {
          table: 'User',
          field: 'id'
        }
      });
    }).then(() => {
      return queryInterface.addConstraint('UserService', ['serviceId'], {
        type: 'foreign key',
        name: 'FK_UserService_Service',
        references: {
          table: 'Service',
          field: 'id'
        }
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserService');
  }
};