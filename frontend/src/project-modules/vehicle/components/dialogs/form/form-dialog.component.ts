import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { VehicleService } from '@projectModules/vehicle/services';
import { VehicleModel } from '@projectModules/vehicle/models';
import { GLOBALS_CONSTANTS } from "@app/config";

@Component({
  selector: 'vehicle-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})

export class FormDialogComponent implements OnInit {
  public loaded: boolean = false;
  public pageTitle: string = 'Add new Vehicle';
  private id: number = null; // vehicle id, incase of edit

  public attributeLabels = VehicleModel.attributeLabels;
  public fg: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // TODO: normal, have to implement types
    private fb: FormBuilder,
    public vehicleService: VehicleService) { }

  ngOnInit() {
    this.fg = this.fb.group(new VehicleModel().validationRules());

    if (this.data.pageMode === GLOBALS_CONSTANTS.PAGE_MODE.UPDATE) {
      this.pageTitle = 'Edit Vehicle';
      this.id = this.data.id;
      this.fg.patchValue(this.data.vehicle);
    }

    this.loaded = true;
  }


  public submit(vehicle: VehicleModel) {
    this.loaded = false;
    if (this.data.pageMode === GLOBALS_CONSTANTS.PAGE_MODE.CREATE) this.createVehicle(vehicle);
    else this.updateVehicle(this.id, vehicle);
  }

  private createVehicle(vehicle: VehicleModel) {
    this.vehicleService.create(vehicle).subscribe(res => {
      console.log('vehicle created successfully: ', res);
      // this.vehicleService.addIssue(res);
      this.dialogRef.close(true);
    }, err => {
      console.log('Something wen wrong while creating vehicle.: ', err);
      this.dialogRef.close(false);
    }, () => this.loaded = true);
  }

  private updateVehicle(id: number, vehicle: VehicleModel) {
    this.vehicleService.update(id, vehicle).subscribe(res => {
      console.log('vehicle updated successfully: ', res);
      // this.vehicleService.updateIssue(vehicle); // TODO: normal, have to implement proper refresh of datatable
      this.dialogRef.close(true);
    }, err => {
      console.log('Something wen wrong while updating vehicle.: ', err);
      this.dialogRef.close(false);
    }, () => this.loaded = true);
  }

  public onNoClick(): void {
    console.log('on no click')
    this.dialogRef.close(false);
  }

}
