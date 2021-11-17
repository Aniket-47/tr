import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { CardModule, LayoutModule, MaterialModule, McModule } from '@tr';

// components
import { LoginComponent } from './login/login.component';
import { FPasswordComponent } from './f-password/f-password.component';
import { SelectRoleComponent } from './select-role/select-role.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterSuccessComponent } from './r-success/r-success.component';
import { VerifyAccountComponent } from './verify-account/verify-token.component';

// store
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducers';

// Perfect Scrollbar
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
  const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelPropagation: true
  };


  
@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    FPasswordComponent,
    SelectRoleComponent,
    ResetPasswordComponent,
    RegisterSuccessComponent,
    VerifyAccountComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    StoreModule.forFeature('auth', authReducer),
    LayoutModule,
    McModule,
    CardModule,
    AuthRoutingModule,
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AuthModule { }
