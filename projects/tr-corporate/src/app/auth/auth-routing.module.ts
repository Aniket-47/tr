import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FPasswordComponent } from './f-password/f-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SelectRoleComponent } from './select-role/select-role.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'selectrole',
        component: SelectRoleComponent
      },
      {
        path: 'f-password',
        component: FPasswordComponent
      },
      {
        path: 'r-password',
        component: ResetPasswordComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
