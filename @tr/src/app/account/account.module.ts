import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { MaterialModule } from '@tr';
import { AccountRoutingModule } from './account-routing.module';


@NgModule({
  declarations: [
    ManageProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
