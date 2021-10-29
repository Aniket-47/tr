import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ]
})
export class TrFeatureModule { }
