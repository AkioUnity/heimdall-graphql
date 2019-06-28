'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'User',
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userTypeId: { type: Sequelize.INTEGER, allowNull: false },
        firstName: { type: Sequelize.STRING(50), allowNull: false },
        lastName: { type: Sequelize.STRING(50), allowNull: false },
        email: { type: Sequelize.STRING(50), allowNull: false },
        password: { type: Sequelize.STRING(50), allowNull: false },
        status: { type: Sequelize.SMALLINT, defaultValue: 0, allowNull: false },
        phoneNumber: { type: Sequelize.STRING(50), allowNull: false },
        countryCode: { type: Sequelize.STRING(50), allowNull: false },
        gender: { type: Sequelize.STRING(50), allowNull: false },
        dateOfBirth: { type: Sequelize.STRING(10), allowNull: false },
        personalIdentity: { type: Sequelize.STRING(50), allowNull: true },
        twilioUUID: { type: Sequelize.STRING(50), allowNull: true },
        fidoBufferID: { type: DataTypes.STRING(255), allowNull: true },
        authenticators: { type: DataTypes.STRING(255), allowNull: true },
        registered: { type: DataTypes.SMALLINT, defaultValue: 0, allowNull: false },
        createdBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
        updatedBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
      }
    ).then(() => {
      return queryInterface.addConstraint('User', ['userTypeId'], {
        type: 'foreign key',
        name: 'FK_User_UserType',
        references: {
          table: 'UserType',
          field: 'id'
        }
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  }
};
