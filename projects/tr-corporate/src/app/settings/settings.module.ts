import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsSideMenuComponent } from './settings-side-menu/settings-side-menu.component';
import { CardModule, MaterialModule } from '@tr';
import { SettingsRoutingModule } from './settings-routing.module';
import { RouterModule } from '@angular/router';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';



@NgModule({
  declarations: [
    SettingsComponent,
    SettingsMenuComponent,
    SettingsSideMenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    CardModule,
    SettingsRoutingModule,
    PerfectScrollbarModule
  ]
})
export class SettingsModule { }
