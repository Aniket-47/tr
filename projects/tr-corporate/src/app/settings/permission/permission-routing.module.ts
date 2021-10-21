import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MFilterComponent } from './m-filter/m-filter.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { ViewRoleComponent } from './view-role/view-role.component';

const routes: Routes = [
  {
    path:'users',
    component: UserManageComponent
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
    path:'',
    pathMatch:'full',
    redirectTo: 'users'
  },
  {
    path:'**',
    redirectTo:'users'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
