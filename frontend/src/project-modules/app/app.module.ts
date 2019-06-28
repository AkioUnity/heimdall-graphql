import { NgModule } from '@angular/core';

import { AppComponent } from './components';
import { AppRoutes } from './app.routes';
import {
  __IMPORTS,
  __DECLARATIONS,
  __PROVIDERS
} from './components.barrel';

@NgModule({
  declarations: [__DECLARATIONS],
  imports: [__IMPORTS, AppRoutes
  ],
  providers: [__PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
