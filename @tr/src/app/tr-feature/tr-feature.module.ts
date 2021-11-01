import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './notification/notification.component';
import { MessageComponent } from './message/message.component';
import { SearchComponent } from './search/search.component';
import { McModule } from '../mc/mc.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    NotificationComponent,
    MessageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    McModule,
  ],
  exports: [
    NotificationComponent,
    MessageComponent,
    SearchComponent
  ]
})
export class TrFeatureModule { }
