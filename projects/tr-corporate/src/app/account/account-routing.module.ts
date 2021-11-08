import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { AccountComponent } from './account.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { OrganisationProfileComponent } from './organisation-profile/organisation-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'manage-profile',
        component: ManageProfileComponent
      },
      {
        path: 'organisation-profile',
        component: OrganisationProfileComponent
      },  
      {
        path: 'account-security',
        component: AccountSecurityComponent
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
    ],
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
