import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    SideMenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
