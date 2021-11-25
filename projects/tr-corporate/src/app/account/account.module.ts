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

// Perfect Scrollbar
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { McCoreModule } from '@mucrest/ng-core';
//   const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//     wheelPropagation: true
// };


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
    ReactiveFormsModule,
    PerfectScrollbarModule
  ]
})
export class AccountModule { }
