import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from '@mucrest/ng-design';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MHeaderComponent } from './m-header/m-header.component';



@NgModule({
  declarations: [
    SideMenuComponent,
    HeaderComponent,
    MHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MatButtonModule
  ],
  exports:[
    SideMenuComponent,
    HeaderComponent,
    MHeaderComponent
  ]
})
export class LayoutModule { }
