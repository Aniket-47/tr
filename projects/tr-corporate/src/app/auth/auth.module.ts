import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FPasswordComponent } from './f-password/f-password.component';
import { SelectRoleComponent } from './select-role/select-role.component';
import { CardModule, LayoutModule, MaterialModule, McModule } from '@tr';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterSuccessComponent } from './r-success/r-success.component';

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    FPasswordComponent,
    SelectRoleComponent,
    ResetPasswordComponent,
    RegisterSuccessComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    LayoutModule,
    McModule,
    CardModule,
    MaterialModule,
    AuthRoutingModule
  ],
})
export class AuthModule { }
