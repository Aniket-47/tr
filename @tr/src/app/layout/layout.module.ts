import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from '@mucrest/ng-design';
import { RouterModule } from '@angular/router';
import { MHeaderComponent } from './m-header/m-header.component';
import { DHeaderComponent } from './d-header/d-header.component';
import { MaterialModule } from '@tr';
import { PageHeaderComponent } from './page-header/page-header.component';


@NgModule({
  declarations: [
    SideMenuComponent,
    HeaderComponent,
    MHeaderComponent,
    DHeaderComponent,
    PageHeaderComponent

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
    DHeaderComponent,
    PageHeaderComponent
  ]
})
export class LayoutModule { }
