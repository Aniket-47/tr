import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from '@mucrest/ng-design';
import { RouterModule } from '@angular/router';
import { MHeaderComponent } from './m-header/m-header.component';
import { DHeaderComponent } from './d-header/d-header.component';
import { MaterialModule } from '@tr';


@NgModule({
  declarations: [
    SideMenuComponent,
    HeaderComponent,
    MHeaderComponent,
    DHeaderComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MaterialModule
  ],
  exports:[
    SideMenuComponent,
    HeaderComponent,
    MHeaderComponent,
    DHeaderComponent
  ]
})
export class LayoutModule { }
