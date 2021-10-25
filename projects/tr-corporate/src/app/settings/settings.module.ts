import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsSideMenuComponent } from './settings-side-menu/settings-side-menu.component';
import { MaterialModule } from '@tr';
import { SettingsRoutingModule } from './settings-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SettingsComponent,
    SettingsSideMenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
