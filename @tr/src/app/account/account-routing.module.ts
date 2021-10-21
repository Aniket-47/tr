import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';

const routes: Routes = [
  {
    path: 'manage-profile',
    component: ManageProfileComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'manage-profile'
  },
  {
    path:'**',
    redirectTo:'manage-profile'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
