import { NgModule } from '@angular/core';

import {
  __IMPORTS,
  __DECLARATIONS,
  __PROVIDERS
} from './components.barrel';

@NgModule({
  imports: [__IMPORTS],
  declarations: [__DECLARATIONS],
  providers: [__PROVIDERS]
})
export class LayoutModule { }
