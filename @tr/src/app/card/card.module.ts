import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BriefCardComponent } from './brief-card/brief-card.component';
import { McCardModule } from '@mucrest/ng-design';
import { BriefNewlineCardComponent } from './brief-newline-card/brief-newline-card.component';



@NgModule({
  declarations: [
    BriefCardComponent,
    BriefNewlineCardComponent
  ],
  imports: [
    CommonModule,
    McCardModule
  ],
  exports: [
    BriefCardComponent,
    BriefNewlineCardComponent
  ]
})
export class CardModule { }
