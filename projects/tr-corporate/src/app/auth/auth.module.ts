import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FPasswordComponent } from './f-password/f-password.component';
import {FeatureModule} from '@mucrest/ng-design';
import { SelectRoleComponent } from './select-role/select-role.component';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    FPasswordComponent,
    SelectRoleComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FeatureModule,
  ]
})
export class AuthModule { }
