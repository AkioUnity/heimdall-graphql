import { NgModule } from '@angular/core';
import { VehicleRoutes } from './vehicle.routes';
import { SharedModule } from "@projectModules/shared/shared.module";

import {
  __IMPORTS,
  __DECLARATIONS,
  __PROVIDERS,
  __ENTRY_COMPONENTS
} from './components.barrel';

@NgModule({
  imports: [__IMPORTS, VehicleRoutes, SharedModule],
  declarations: [__DECLARATIONS],
  providers: [__PROVIDERS],
  entryComponents: [__ENTRY_COMPONENTS]
})
export class VehicleModule { }
