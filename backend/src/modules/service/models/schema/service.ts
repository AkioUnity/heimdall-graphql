import { Model } from 'sequelize';

class Service extends Model<Service> { }
module.exports = function (sequelize, DataTypes) {
  return Service.init(
    {
      name: { type: DataTypes.STRING(50), allowNull: false },
      baseServiceCharge: { type: DataTypes.INTEGER, allowNull: false },
      fee: { type: DataTypes.INTEGER, allowNull: false },
      numberOfLabors: { type: DataTypes.INTEGER, allowNull: false },
      estimatedServiceTime: { type: DataTypes.STRING, allowNull: false },
      createdBy: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedBy: { type: DataTypes.INTEGER, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false }
    },
    {
      sequelize, tableName: 'Service',
    }
  );
}