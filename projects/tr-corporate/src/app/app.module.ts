import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@tr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
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

=======
// import { AuthModule } from './auth/auth.module';
>>>>>>> 23797a001d30d616aa5d6f3c711b7843dac201da

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    UserDetailComponent,
    SettingsMenuComponent

=======
>>>>>>> 23797a001d30d616aa5d6f3c711b7843dac201da
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // TRModule,
    // AuthModule,
    AppRoutingModule,
<<<<<<< HEAD
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
=======
    MaterialModule
>>>>>>> 23797a001d30d616aa5d6f3c711b7843dac201da
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
