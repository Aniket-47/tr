import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo/demo.component';
import { MaterialModule } from '@tr';



@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[DemoComponent]
})
export class AdvanceSearchModule { }
