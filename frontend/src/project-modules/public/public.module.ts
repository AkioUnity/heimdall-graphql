import { NgModule } from '@angular/core';
import { PublicRoutes } from './public.routes';
import { SharedModule } from '@projectModules/shared/shared.module';

import {
  __IMPORTS,
  __DECLARATIONS,
  __PROVIDERS
} from './components.barrel';

@NgModule({
  imports: [__IMPORTS, PublicRoutes, SharedModule],
  declarations: [__DECLARATIONS],
  providers: [__PROVIDERS],
  exports: [__DECLARATIONS, __IMPORTS]
})
export class PublicModule { }
