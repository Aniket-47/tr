import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './notification/notification.component';
import { MessageComponent } from './message/message.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    NotificationComponent,
    MessageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificationComponent,
    MessageComponent,
    SearchComponent
  ]
})
export class TrFeatureModule { }
