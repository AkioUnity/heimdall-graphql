import { FormControl, Validators } from "@angular/forms";

/**
 * Funny Name, becuause our CRUD identity is also named as service
 */
export class ServiceModel {
  public id?: number;
  public name: string;
  public baseServiceCharge: number;
  public fee: number;
  public numberOfLabors: number;
  public estimatedServiceTime: string;
  public createdBy: number;
  public createdAt: Date;
  public updatedBy: string;
  public updatedAt: Date;

  public static attributeLabels = {
    id: 'Id',
    name: 'Name',
    baseServiceCharge: 'Base Service Charge',
    fee: 'Fee',
    numberOfLabors: 'No. Of Labors',
    estimatedServiceTime: 'Estimated Service Time',
    createdBy: 'Created By',
    createdAt: 'Created At',
    updatedBy: 'Updated By',
    updatedAt: 'Updated At',
  }

  public validationRules() {
    return {
      name: new FormControl('', Validators.required),
      baseServiceCharge: new FormControl('', Validators.required),
      fee: new FormControl('', Validators.required),
      numberOfLabors: new FormControl('', Validators.required),
      estimatedServiceTime: new FormControl('', Validators.required),
    }
  }
}
