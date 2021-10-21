import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { MaterialModule } from '@tr';
import { SettingsRoutingModule } from './settings-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SettingsComponent,
    SettingsMenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
