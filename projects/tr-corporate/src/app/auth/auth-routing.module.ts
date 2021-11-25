import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from '@tr/src/app/tr-feature/message/message.component';
import { AuthComponent } from './auth.component';
import { FPasswordComponent } from './f-password/f-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterSuccessComponent } from './r-success/r-success.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SelectRoleComponent } from './select-role/select-role.component';
import { RegisterGuard } from './shared/register.guard';
import { VerifyAccountComponent } from './verify-account/verify-token.component';

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
        path: 'register/:roleId',
        component: RegisterComponent,
        canActivate: [RegisterGuard]
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
        path: 'r-password/:token',
        component: ResetPasswordComponent
      },
      {
        path: 'r-password/invite/:type/:token',
        component: ResetPasswordComponent
      },
      {
        path: 'register-success',
        component: RegisterSuccessComponent
      },
      {
        path: 'verify-account/:token',
        component: VerifyAccountComponent
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
