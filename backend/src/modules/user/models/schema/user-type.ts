import { Model } from 'sequelize';

export class UserType extends Model<UserType> {

  // Add Columns and their properties of UserType Table
  public title: string;

  public code: string;

  public createdBy: number;

  public updatedBy: number;

}
