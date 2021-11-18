import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { MaterialModule } from '@tr';
import { OrganisationProfileComponent } from './organisation-profile/organisation-profile.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { McCoreModule } from '@mucrest/ng-core';


@NgModule({
  declarations: [
    AccountComponent,
    OrganisationProfileComponent,
    ManageProfileComponent,
    AccountSecurityComponent
  ],
  imports: [
    CommonModule,
    McCoreModule,
    AccountRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
