import { Model } from 'sequelize';

class Vehicle extends Model<Vehicle> { }
module.exports = function (sequelize, DataTypes) {
  return Vehicle.init(
    {
      year: { type: DataTypes.STRING(50), allowNull: false },
      make: { type: DataTypes.STRING(50), allowNull: false },
      model: { type: DataTypes.STRING(50), allowNull: false },
      engineTrim: { type: DataTypes.STRING(50), allowNull: false },
      engineType: { type: DataTypes.STRING(50), allowNull: false },
      engineSize: { type: DataTypes.STRING(50), allowNull: false },
      fuelFilter: { type: DataTypes.STRING(50), allowNull: false },
      airFilter: { type: DataTypes.STRING(50), allowNull: false },
      cabinAirFilter: { type: DataTypes.STRING(50), allowNull: false },
      transmissionFilter: { type: DataTypes.STRING(50), allowNull: false },
      oilFilter: { type: DataTypes.STRING(50), allowNull: false },
      oilType: { type: DataTypes.STRING(50), allowNull: false },
      oilCapacity: { type: DataTypes.STRING(50), allowNull: false },
      coolantCapacity: { type: DataTypes.STRING(50), allowNull: false },
      createdBy: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedBy: { type: DataTypes.INTEGER, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false }
    },
    {
      sequelize, tableName: 'Vehicle',
    }
  );
}