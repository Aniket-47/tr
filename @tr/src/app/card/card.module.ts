import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BriefCardComponent } from './brief-card/brief-card.component';
import { McCardModule } from '@mucrest/ng-design';



@NgModule({
  declarations: [
    BriefCardComponent
  ],
  imports: [
    CommonModule,
    McCardModule
  ],
  exports: [
    BriefCardComponent
  ]
})
export class CardModule { }
