import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

import { AuthenticationService } from './services';

import { AauthComponent, LoginComponent, SignupComponent } from './components';

export const __IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
];

export const __DECLARATIONS = [AauthComponent, LoginComponent, SignupComponent];

export const __PROVIDERS = [AuthenticationService];
