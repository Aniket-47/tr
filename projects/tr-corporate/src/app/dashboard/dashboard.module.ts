import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashabordComponent } from './dashabord.component';
import { StatsComponent } from './stats/stats.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardModule, LayoutModule, MaterialModule } from '@tr';
import { ComponentsModule } from '@mucrest/ng-design';
import { TrFeatureModule } from '@tr/src/app/tr-feature/tr-feature.module';



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
    TrFeatureModule,
    // McCardModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
