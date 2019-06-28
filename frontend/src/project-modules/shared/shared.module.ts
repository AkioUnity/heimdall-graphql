import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  __IMPORTS,
  __DECLARATIONS,
} from './components.barrel';

@NgModule({
  imports: [CommonModule, __IMPORTS],
  declarations: [__DECLARATIONS],
  exports: [__DECLARATIONS]
})
export class SharedModule { }
