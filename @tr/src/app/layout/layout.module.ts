import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from '@mucrest/ng-design';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SideMenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MatButtonModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class LayoutModule { }
