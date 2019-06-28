import { Model } from 'sequelize';

class User extends Model<User> { }
module.exports = function (sequelize, DataTypes) {
  return User.init(
    {
      userTypeId: { type: DataTypes.INTEGER, allowNull: false },
      firstName: { type: DataTypes.STRING(50), allowNull: false },
      lastName: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING(50), allowNull: false },
      password: { type: DataTypes.STRING(50), allowNull: false },
      status: { type: DataTypes.SMALLINT, defaultValue: 0, allowNull: false },
      countryCode: { type: DataTypes.STRING(50), allowNull: false },
      phoneNumber: { type: DataTypes.STRING(50), allowNull: false },
      gender: { type: DataTypes.STRING(50), allowNull: false },
      dateOfBirth: { type: DataTypes.STRING(10), allowNull: false },
      personalIdentity: { type: DataTypes.STRING(50), allowNull: true },
      twilioUUID: { type: DataTypes.STRING(50), allowNull: true },
      fidoBufferID: { type: DataTypes.STRING(255), allowNull: true },
      authenticators: { type: DataTypes.STRING(255), allowNull: true },
      registered: { type: DataTypes.SMALLINT, defaultValue: 0, allowNull: false },
      createdBy: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedBy: { type: DataTypes.INTEGER, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false }
    },
    {
      sequelize, tableName: 'User',
    }
  );
}
  // @BelongsTo(() => UserType, {
  //   foreignKey: 'userTypeId'
  // })
  // userType: UserType;