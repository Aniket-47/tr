import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setStepper } from '../store/actions/auth.action';

import { Iauth } from '../store/interface/auth';
import { getCurrentStepper, getRoles, getStepper } from '../store/selectors/auth.selector';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit {
  stepperPages: string[] = [];
  currentStep = 0;
  roles: any[]= [];

  constructor(private router: Router, private store: Store<Iauth>) { }

  ngOnInit(): void {
    this.store.select(getRoles).subscribe(roles => this.roles = roles);
    this.store.select(getCurrentStepper).subscribe(data => this.currentStep = data);
    this.store.select(getStepper).subscribe(data => this.stepperPages = data);
  }
  
  roleHandler(role: number) {
    const {id} = this.roles.find(e => e.id === role);
    this.store.dispatch(setStepper({data: 1}));
    this.router.navigate(['/auth/register', id]);
  }

}
