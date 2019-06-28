import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';

import { LayoutService } from '@projectModules/layout/services';
import { VehicleService } from '@projectModules/vehicle/services';
import { VehicleModel } from '@projectModules/vehicle/models';
import { GLOBALS_CONSTANTS } from "@app/config";

import { FormDialogComponent } from '../dialogs/form/form-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';
@Component({
  selector: 'vehicle-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  public loaded: boolean = false;
  public displayedColumns = ['id', 'year', 'make', 'model', 'engineTrim', 'engineType', 'engineSize', 'fuelFilter', 'airFilter', 'cabinAirFilter', 'transmissionFilter', 'oilFilter', 'oilType', 'oilCapacity', 'coolantCapacity', 'createdAt', 'updatedAt', 'actions'];
  public attributeLabels = VehicleModel.attributeLabels;
  public dataSource: MatTableDataSource<VehicleModel>;

  constructor(
    private layoutService: LayoutService,
    public vehicleService: VehicleService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.layoutService.setPageTitle('Vehicle List');

    this.list();

    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) return;
        this.dataSource.filter = this.filter.nativeElement.value.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      });
  }

  private list() {
    this.vehicleService.list().subscribe(res => {
      this.dataSource = new MatTableDataSource(res['rows']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loaded = true;
    }, error => console.log('error in list: ', error));
  }


  public create() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { pageMode: GLOBALS_CONSTANTS.PAGE_MODE.CREATE }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.list();
    });
  }

  public edit(id: number, vehicle: VehicleModel) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { pageMode: GLOBALS_CONSTANTS.PAGE_MODE.UPDATE, id, vehicle }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.list();
    });
  }

  public delete(id: number, vehicle: VehicleModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id, vehicle }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.list();
    });
  }

}
