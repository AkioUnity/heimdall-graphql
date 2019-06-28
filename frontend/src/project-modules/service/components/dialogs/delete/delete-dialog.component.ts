import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ServiceService } from '@projectModules/service/services';
import { ServiceModel } from '@projectModules/service/models';

@Component({
  selector: 'service-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  public loaded: boolean = true;
  public attributeLabels = ServiceModel.attributeLabels;
  public service: ServiceModel;
  public id: number;

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private serviceService: ServiceService) {
    this.service = this.data.service;
    this.id = this.data.id;
  }

  public confirmDelete(): void {
    this.loaded = false;
    this.serviceService.delete(this.id).subscribe(res => {
      this.dialogRef.close(true);
    }, err => {
      console.log('Something wen wrong while deleting service.: ', err);
      this.dialogRef.close(false);
    }, () => this.loaded = true);
  }

  public onNoClick(): void {
    this.dialogRef.close(false);
  }
}
