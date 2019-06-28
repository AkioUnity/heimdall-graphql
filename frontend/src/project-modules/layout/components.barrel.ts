import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatTooltipModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatExpansionModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavService } from "./services";

import {
  LayoutComponent,
  HeaderComponent,
  FooterComponent,
  LeftNavComponent,
  NavItemComponent,
  SubHeaderComponent,
  FlashMessageComponent
} from './components';

export const __IMPORTS = [
  CommonModule,
  RouterModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatTooltipModule,
  FlexLayoutModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatExpansionModule
];

export const __DECLARATIONS = [
  LayoutComponent,
  HeaderComponent,
  FooterComponent,
  LeftNavComponent,
  NavItemComponent,
  SubHeaderComponent,
  FlashMessageComponent
];

export const __PROVIDERS = [NavService];