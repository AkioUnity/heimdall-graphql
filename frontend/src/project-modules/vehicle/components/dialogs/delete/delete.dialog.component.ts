import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { VehicleService } from '@projectModules/vehicle/services';
import { VehicleModel } from '@projectModules/vehicle/models';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.component.html',
  styleUrls: ['./delete.dialog.component.css']
})
export class DeleteDialogComponent {
  public loaded: boolean = true;
  public attributeLabels = VehicleModel.attributeLabels;
  public vehicle: VehicleModel;
  public id: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private vehicleService: VehicleService) {
    this.vehicle = this.data.vehicle;
    this.id = this.data.id;
  }

  public confirmDelete(): void {
    this.loaded = false;
    this.vehicleService.delete(this.id).subscribe(res => {
      console.log('vehicle deleted successfully: ', res);
      this.dialogRef.close(true);
    }, err => {
      console.log('Something wen wrong while deleting vehicle.: ', err);
      this.dialogRef.close(false);
    }, () => this.loaded = true);
  }

  public onNoClick(): void {
    console.log('on no click')
    this.dialogRef.close(false);
  }
}
