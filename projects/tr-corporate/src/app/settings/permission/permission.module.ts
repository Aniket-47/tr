import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManageComponent } from './user-manage/user-manage.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewRoleComponent } from './view-role/view-role.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MaterialModule } from '@tr';
import { MFilterComponent } from './m-filter/m-filter.component';
import { PermissionComponent } from './permission.component';
import { RouterModule } from '@angular/router';
import { PermissionRoutingModule } from './permission-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserManageComponent,
    AddUserComponent,
    ViewUserComponent,
    ViewRoleComponent,
    AddRoleComponent,
    UserDetailComponent,
    MFilterComponent,
    PermissionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PermissionRoutingModule,
    ReactiveFormsModule
  ]
})
export class PermissionModule { }
