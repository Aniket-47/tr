import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashabordComponent } from './dashabord.component';
import { StatsComponent } from './stats/stats.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutModule } from '@tr';
import { ComponentsModule } from '@mucrest/ng-design';




@NgModule({
  declarations: [
    DashabordComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
