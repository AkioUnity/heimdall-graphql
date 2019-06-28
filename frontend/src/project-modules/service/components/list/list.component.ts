import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';

import { LayoutService } from '@projectModules/layout/services';
import { ServiceService } from '@projectModules/service/services';
import { ServiceModel } from '@projectModules/service/models';
import { GLOBALS_CONSTANTS } from "@app/config";

import { FormDialogComponent } from '../dialogs/form/form-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete-dialog.component';
@Component({
  selector: 'service-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  public loaded: boolean = false;
  public displayedColumns = ['id', 'name', 'baseServiceCharge', 'fee', 'numberOfLabors', 'estimatedServiceTime', 'createdAt', 'updatedAt', 'actions'];
  public attributeLabels = ServiceModel.attributeLabels;
  public dataSource: MatTableDataSource<ServiceModel>;

  constructor(
    private layoutService: LayoutService,
    private serviceService: ServiceService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.layoutService.setPageTitle('Service List');

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
    this.serviceService.list().subscribe(res => {
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

  public edit(id: number, service: ServiceModel) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { pageMode: GLOBALS_CONSTANTS.PAGE_MODE.UPDATE, id, service }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.list();
    });
  }

  public delete(id: number, service: ServiceModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id, service }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.list();
    });
  }

}
