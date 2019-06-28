'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Vehicle',
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        year: { type: Sequelize.STRING(50), allowNull: false },
        make: { type: Sequelize.STRING(50), allowNull: false },
        model: { type: Sequelize.STRING(50), allowNull: false },
        engineTrim: { type: Sequelize.STRING(50), allowNull: false },
        engineType: { type: Sequelize.STRING(50), allowNull: false },
        engineSize: { type: Sequelize.STRING(50), allowNull: false },
        fuelFilter: { type: Sequelize.STRING(50), allowNull: false },
        airFilter: { type: Sequelize.STRING(50), allowNull: false },
        cabinAirFilter: { type: Sequelize.STRING(50), allowNull: false },
        transmissionFilter: { type: Sequelize.STRING(50), allowNull: false },
        oilFilter: { type: Sequelize.STRING(50), allowNull: false },
        oilType: { type: Sequelize.STRING(50), allowNull: false },
        oilCapacity: { type: Sequelize.STRING(50), allowNull: false },
        coolantCapacity: { type: Sequelize.STRING(50), allowNull: false },
        createdBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
        updatedBy: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
        updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.CURRENT_TIMESTAMP, allowNull: false },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Vehicle');
  }
};
