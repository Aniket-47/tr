import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const matModules = [
  CommonModule,
  MatInputModule,
  MatIconModule,
  MatTreeModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule
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
