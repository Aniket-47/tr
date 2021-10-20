import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule, FeatureModule } from '@mucrest/ng-design';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FeatureModule,
    ComponentsModule,
  ],
  providers: [],
  exports: [
    ComponentsModule,
    FeatureModule,
    HeaderComponent
  ]
})
export class TRModule { }
