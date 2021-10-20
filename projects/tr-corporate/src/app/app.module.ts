import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TRModule } from '@tr/tr.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';

import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    SettingsMenuComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TRModule,
    AuthModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,

// mat imports
    MatInputModule,
    MatTreeModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
