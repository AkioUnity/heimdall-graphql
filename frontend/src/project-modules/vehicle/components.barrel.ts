import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { VehicleService } from "./services";
import { ListComponent, FormDialogComponent, DeleteDialogComponent } from './components';

export const __IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  FlexLayoutModule
];

export const __DECLARATIONS = [
  ListComponent,
  FormDialogComponent,
  DeleteDialogComponent
];

export const __PROVIDERS = [VehicleService];

export const __ENTRY_COMPONENTS = [FormDialogComponent, DeleteDialogComponent];
