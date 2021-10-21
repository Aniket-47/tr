import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const matModules = [
  CommonModule,
  MatInputModule,
  MatIconModule,
  MatTreeModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatSlideToggleModule
]







@NgModule({
  declarations: [],
  imports: [
...matModules
  ],
  exports: [
...matModules
  ]
})
export class MaterialModule { }
