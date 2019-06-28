import { FormControl, Validators } from "@angular/forms";

export class VehicleModel {
  public id?: number;
  public year: string;
  public make: string;
  public model: string;
  public engineTrim: string;
  public engineType: string;
  public engineSize: string;
  public fuelFilter: string;
  public airFilter: string;
  public cabinAirFilter: string;
  public transmissionFilter: string;
  public oilFilter: string;
  public oilType: string;
  public oilCapacity: string;
  public coolantCapacity: string
  public createdBy?: number;
  public createdAt?: Date;
  public updatedBy?: number;
  public updatedAt?: Date;

  public static attributeLabels = {
    id: 'Id',
    year: 'Year',
    make: 'Make',
    model: 'Model',
    engineTrim: 'Engine Trim',
    engineType: 'Engine Type',
    engineSize: 'Engine Size',
    fuelFilter: 'Fuel Filter',
    airFilter: 'Air Filter',
    cabinAirFilter: 'Cabin Air Filter',
    transmissionFilter: 'Transmission Filter',
    oilFilter: 'Oil Filter',
    oilType: 'Oil Type',
    oilCapacity: 'Oil Capacity',
    coolantCapacity: 'Coolant Capacity',
    createdBy: 'Created By',
    createdAt: 'Created At',
    updatedBy: 'Updated By',
    updatedAt: 'Updated At',
  }

  public validationRules() {
    return {
      year: new FormControl('', Validators.required),
      make: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      engineTrim: new FormControl('', Validators.required),
      engineType: new FormControl('', Validators.required),
      engineSize: new FormControl('', Validators.required),
      fuelFilter: new FormControl('', Validators.required),
      airFilter: new FormControl('', Validators.required),
      cabinAirFilter: new FormControl('', Validators.required),
      transmissionFilter: new FormControl('', Validators.required),
      oilFilter: new FormControl('', Validators.required),
      oilType: new FormControl('', Validators.required),
      oilCapacity: new FormControl('', Validators.required),
      coolantCapacity: new FormControl('', Validators.required)
    }
  }
}
