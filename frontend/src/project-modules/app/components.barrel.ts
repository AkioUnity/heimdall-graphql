import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { LayoutModule } from "@projectModules/layout/layout.module";

import { AppComponent, DashboardComponent } from './components';
import { AuthGuard } from './services';

export const __IMPORTS = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  LayoutModule
];

export const __DECLARATIONS = [
  AppComponent,
  DashboardComponent
];

export const __PROVIDERS = [AuthGuard];