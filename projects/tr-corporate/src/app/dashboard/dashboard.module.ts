import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashabordComponent } from './dashabord.component';
import { StatsComponent } from './stats/stats.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardModule, LayoutModule, MaterialModule } from '@tr';
import { ComponentsModule } from '@mucrest/ng-design';
import { MatBadgeModule } from '@angular/material/badge';




@NgModule({
  declarations: [
    DashabordComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
    MaterialModule,   
    CardModule,
    DashboardRoutingModule,
    MatBadgeModule
  ]
})
export class DashboardModule { }
