import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '@tr/src/app/utility/services/routeGuards/auth-guard.guard';
import { DemoComponent } from './advance-search/demo/demo.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'as',
        component: DemoComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
      },
      {
        path: '**',
        redirectTo: 'auth'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
