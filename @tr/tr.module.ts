import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule, FeatureModule } from '@mucrest/ng-design';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FeatureModule,
    ComponentsModule
  ],
  providers: [],
  exports: [ComponentsModule, FeatureModule]
})
export class TRModule { }
