import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashabordComponent } from './dashabord.component';
import { StatsComponent } from './stats/stats.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardModule, LayoutModule, MaterialModule } from '@tr';
import { ComponentsModule } from '@mucrest/ng-design';
import { McCoreModule, TranslatePipe } from '@mucrest/ng-core';
import { TrFeatureModule } from '@tr/src/app/tr-feature/tr-feature.module';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';
import { LSkeys } from '../utility/configs/app.constants';



@NgModule({
  declarations: [
    DashabordComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
    McCoreModule,
    LayoutModule,
    ComponentsModule,
    MaterialModule,
    CardModule,
    TrFeatureModule,
    // McCardModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
  constructor(
    private lsServ: LstorageService) {
    const languageData = this.lsServ.getItem(LSkeys.LANGUAGE) || '';
    if (languageData) TranslatePipe.setLanguagePack(JSON.parse(languageData));
  }
}
