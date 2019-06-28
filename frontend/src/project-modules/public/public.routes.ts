import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AauthComponent, LoginComponent, SignupComponent } from './components';

const routes: Routes = [
  { path: 'auth', redirectTo: 'auth/signp', pathMatch: 'full' }, // Todo: low, Not working, find a solution for this re-routing
  {
    path: '', component: AauthComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutes { }
