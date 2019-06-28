import { NgModule } from '@angular/core';
import { ServiceRoutes } from './service.routes';
import { SharedModule } from "@projectModules/shared/shared.module";

import {
  __IMPORTS,
  __DECLARATIONS,
  __PROVIDERS,
  __ENTRY_COMPONENTS
} from './components.barrel';

@NgModule({
  imports: [__IMPORTS, ServiceRoutes, SharedModule],
  declarations: [__DECLARATIONS],
  providers: [__PROVIDERS],
  entryComponents: [__ENTRY_COMPONENTS]
})
export class ServiceModule { }
