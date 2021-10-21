import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRModule } from '@tr/tr.module';
import { SampleRoutingModule } from './sample-routing.module';
import { SampleComponent } from './sample.component';

@NgModule({
  declarations: [
    SampleComponent
  ],
  imports: [
    CommonModule,
    SampleRoutingModule,
    TRModule
  ]
})
export class SampleModule { }
