import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleComponent } from './add-role/add-role.component';
import { MFilterComponent } from './m-filter/m-filter.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { ViewRoleComponent } from './view-role/view-role.component';

const routes: Routes = [
  {
    path:'users',
    component: UserManageComponent
  },
  {
    path:'usersdetails',
    component: UserDetailComponent
  },
  {
    path:'roles',
    component: ViewRoleComponent
  },
  {
    path:'filter',
    component: MFilterComponent
  },
  {
    path:'role',
    component: AddRoleComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'users'
  },
  {
    path:'**',
    redirectTo:'users',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
