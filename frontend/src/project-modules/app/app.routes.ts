import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '@projectModules/layout/components';
import { DashboardComponent } from "./components";

const routes: Routes = [
  { path: '', redirectTo: 'auth/signup', pathMatch: 'full' },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'vehicles', loadChildren: '../vehicle/vehicle.module#VehicleModule' },
      { path: 'services', loadChildren: '../service/service.module#ServiceModule' }
    ]
  },
  { path: 'auth', loadChildren: '../public/public.module#PublicModule' },
  { path: '**', redirectTo: 'auth/signup' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
