import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManageComponent } from './user-manage/user-manage.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewRoleComponent } from './view-role/view-role.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MaterialModule } from '@tr';



@NgModule({
  declarations: [
    UserManageComponent,
    AddUserComponent,
    ViewUserComponent,
    ViewRoleComponent,
    AddRoleComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PermissionModule { }
