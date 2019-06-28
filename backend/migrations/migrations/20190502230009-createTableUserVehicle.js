'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'UserVehicle',
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: Sequelize.INTEGER, allowNull: false },
        vehicleId: { type: Sequelize.INTEGER, allowNull: false },
        vin: { type: Sequelize.STRING(50), allowNull: true },
        image: { type: Sequelize.STRING(50), allowNull: true },
        createdBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
        updatedBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
      }
    ).then(() => {
      return queryInterface.addConstraint('UserVehicle', ['userId'], {
        type: 'foreign key',
        name: 'FK_UserVehicle_User',
        references: {
          table: 'User',
          field: 'id'
        }
      });
    }).then(() => {
      return queryInterface.addConstraint('UserVehicle', ['vehicleId'], {
        type: 'foreign key',
        name: 'FK_UserVehicle_Vehicle',
        references: {
          table: 'Vehicle',
          field: 'id'
        }
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserVehicle');
  }
};
