import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { MaterialModule } from '@tr';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { OrganisationProfileComponent } from './organisation-profile/organisation-profile.component';


@NgModule({
  declarations: [
    ManageProfileComponent,
    AccountComponent,
    OrganisationProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
