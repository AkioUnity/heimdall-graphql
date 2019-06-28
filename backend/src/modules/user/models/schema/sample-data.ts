import { Model } from 'sequelize';

class SampleData extends Model<SampleData> { }
module.exports = function (sequelize, DataTypes) {
  return SampleData.init(
    {
      data: { type: DataTypes.STRING },
    },
    {
      sequelize, tableName: 'SampleData',
    }
  );
}