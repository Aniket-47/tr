import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children:[
      {
        path:'dashboard',
        component: SettingsMenuComponent
      },
      {
        path: 'permission',
        loadChildren: () => import('./permission/permission.module').then(m => m.PermissionModule)
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo: 'dashboard'
      },
      {
        path:'**',
        redirectTo:'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
