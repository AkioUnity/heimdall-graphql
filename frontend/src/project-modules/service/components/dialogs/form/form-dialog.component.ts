import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ServiceService } from '@projectModules/service/services';
import { ServiceModel } from '@projectModules/service/models';
import { GLOBALS_CONSTANTS } from "@app/config";

@Component({
  selector: 'service-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})

export class FormDialogComponent implements OnInit {
  public loaded: boolean = false;
  public pageTitle: string = 'Add New Service';
  private id: number = null; // service id, incase of edit

  public attributeLabels = ServiceModel.attributeLabels;
  public fg: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // TODO: normal, have to implement types
    private fb: FormBuilder,
    public serviceService: ServiceService) { }

  ngOnInit() {
    this.fg = this.fb.group(new ServiceModel().validationRules());

    if (this.data.pageMode === GLOBALS_CONSTANTS.PAGE_MODE.UPDATE) {
      this.pageTitle = 'Edit Service';
      this.id = this.data.id;
      this.fg.patchValue(this.data.service);
    }

    this.loaded = true;
  }


  public submit(service: ServiceModel) {
    this.loaded = false;
    if (this.data.pageMode === GLOBALS_CONSTANTS.PAGE_MODE.CREATE) this.createService(service);
    else this.updateService(this.id, service);
  }

  private createService(service: ServiceModel) {
    this.serviceService.create(service).subscribe(res => {
      console.log('service created successfully: ', res);
      // this.serviceService.addIssue(res);
      this.dialogRef.close(true);
    }, err => {
      console.log('Something wen wrong while creating service.: ', err);
      this.dialogRef.close(false);
    }, () => this.loaded = true);
  }

  private updateService(id: number, service: ServiceModel) {
    this.serviceService.update(id, service).subscribe(res => {
      console.log('service updated successfully: ', res);
      // this.serviceService.updateIssue(service); // TODO: normal, have to implement proper refresh of datatable
      this.dialogRef.close(true);
    }, err => {
      console.log('Something wen wrong while updating service.: ', err);
      this.dialogRef.close(false);
    }, () => this.loaded = true);
  }

  public onNoClick(): void {
    console.log('on no click')
    this.dialogRef.close(false);
  }

}
