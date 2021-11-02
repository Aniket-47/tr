import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setStepper, setStepperShow } from '../store/actions/auth.action';

import { Iauth } from '../store/interface/auth';
import { getRoles } from '../store/selectors/auth.selector';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit, OnDestroy {
  roles: any[]= [];

  constructor(private router: Router, private store: Store<Iauth>) {
    this.store.dispatch(setStepperShow({data: true}));
   }

  ngOnInit(): void {
    this.store.select(getRoles).subscribe(roles => this.roles = roles);
  }
  
  ngOnDestroy() {
    this.store.dispatch(setStepperShow({data: false}));
  }
  
  roleHandler(role: number) {
    const {id} = this.roles.find(e => e.id === role);
    this.store.dispatch(setStepper({data: 1}));
    this.router.navigate(['/auth/register', id]);
  }

}
