import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children:[
      {
        path:'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path:'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo: 'auth'
      },
      {
        path:'**',
        redirectTo:'auth'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
