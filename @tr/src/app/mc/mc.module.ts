import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureModule, ComponentsModule } from '@mucrest/ng-design';

const modules = [
  FeatureModule,
  ComponentsModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class McModule { }
