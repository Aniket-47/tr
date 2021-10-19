import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ComponentsModule, FeatureModule} from '@mucrest/ng-design';
import { MaterialModule } from 'projects/tr-corporate/src/app/material.moule';
import { PermissionAccordionComponent } from './permission-accordion/permission-accordion.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AccountRoleComponent } from './account-role/account-role.component';

@NgModule({
  declarations: [
  
    PermissionAccordionComponent,
       UserManagementComponent,
       AccountRoleComponent
  ],
  imports: [
    CommonModule,
    FeatureModule,
    MaterialModule
  ],
  exports:[
    PermissionAccordionComponent,
    UserManagementComponent,
    AccountRoleComponent
  ],
  providers: [],
})
export class TRModule { }
