import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BriefCardComponent } from './brief-card/brief-card.component';
import { BriefNewlineCardComponent } from './brief-newline-card/brief-newline-card.component';
import { McModule } from '../mc/mc.module';



@NgModule({
  declarations: [
    BriefCardComponent,
    BriefNewlineCardComponent
  ],
  imports: [
    CommonModule,
    McModule
  ],
  exports: [
    BriefCardComponent,
    BriefNewlineCardComponent
  ]
})
export class CardModule { }
