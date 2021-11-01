import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { CandidateComponent } from './candidate.component';
import { RouterModule } from '@angular/router';
import { CandidatedRoutingModule } from './candidate-routing.module';



@NgModule({
  declarations: [
    AddCandidateComponent,
    CandidateComponent
  ],
  imports: [
    CommonModule,
    CandidatedRoutingModule
  ]
})
export class CandidateModule { }
