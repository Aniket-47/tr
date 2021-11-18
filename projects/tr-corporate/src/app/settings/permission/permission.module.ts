import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManageComponent } from './user-manage/user-manage.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewRoleComponent } from './view-role/view-role.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LayoutModule, MaterialModule } from '@tr';
import { MFilterComponent } from './m-filter/m-filter.component';
import { PermissionComponent } from './permission.component';
import { PermissionRoutingModule } from './permission-routing.module';


// Perfect Scrollbar
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { McCoreModule } from '@mucrest/ng-core';
  const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelPropagation: true
  };

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
    McCoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    PermissionRoutingModule,
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [
    MFilterComponent
  ]
})
export class PermissionModule { }
