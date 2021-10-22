import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';

const routes: Routes = [{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

},{
  path : 'userdetail',
  component : UserDetailComponent
},
{
  path: 'settings',
  component: SettingsMenuComponent
}
=======
import { AppComponent } from './app.component';

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
>>>>>>> 23797a001d30d616aa5d6f3c711b7843dac201da
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
