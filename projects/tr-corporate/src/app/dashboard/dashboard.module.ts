import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashabordComponent } from './dashabord.component';
import { StatsComponent } from './stats/stats.component';



@NgModule({
  declarations: [
  
    DashabordComponent,
       StatsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
