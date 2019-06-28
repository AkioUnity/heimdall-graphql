'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Order',
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: Sequelize.INTEGER, allowNull: false },
        mechanicUserId: { type: Sequelize.INTEGER, allowNull: false },
        serviceId: { type: Sequelize.INTEGER, allowNull: false },
        userVehicleId: { type: Sequelize.INTEGER, allowNull: true },
        serviceAddress: { type: Sequelize.STRING(200), allowNull: false },
        orderStartDateTime: { type: Sequelize.DATE, allowNull: true },
        orderCompleteDateTime: { type: Sequelize.DATE, allowNull: true },
        status: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        paymentMethod: { type: Sequelize.STRING(50), allowNull: false },
        paymentTotal: { type: Sequelize.INTEGER, allowNull: false },
        paymentReceived: { type: Sequelize.INTEGER, allowNull: false },
        paymentStatus: { type: Sequelize.STRING(50), allowNull: true },
        discount: { type: Sequelize.STRING(50), allowNull: true },
        createdBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
        updatedBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
      }
    ).then(() => {
      return queryInterface.addConstraint('Order', ['userId'], {
        type: 'foreign key',
        name: 'FK_Order_User_Customer',
        references: {
          table: 'User',
          field: 'id'
        }
      });
    }).then(() => {
      return queryInterface.addConstraint('Order', ['mechanicUserId'], {
        type: 'foreign key',
        name: 'FK_Order_User_mechanic',
        references: {
          table: 'User',
          field: 'id'
        }
      });
    }).then(() => {
      return queryInterface.addConstraint('Order', ['serviceId'], {
        type: 'foreign key',
        name: 'FK_Order_Service',
        references: {
          table: 'Service',
          field: 'id'
        }
      });
    }).then(() => {
      return queryInterface.addConstraint('Order', ['userVehicleId'], {
        type: 'foreign key',
        name: 'FK_Order_UserVehicle',
        references: {
          table: 'UserVehicle',
          field: 'id'
        }
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Order');
  }
};
