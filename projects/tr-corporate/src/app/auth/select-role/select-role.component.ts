import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RouterConfigService } from '@tr/src/app/utility/services/routeGuards/router-config.service';
import { userRoles } from '../../utility/configs/app.constants';
import { setStepper, setStepperShow, setUserRole } from '../store/actions/auth.action';

import { Iauth } from '../store/interface/auth';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss'],
})
export class SelectRoleComponent implements OnInit, OnDestroy {
  roles: any[] = [];
  config: any;

  constructor(private router: Router, private store: Store<Iauth>, private configServ: RouterConfigService) {
    this.store.dispatch(setStepperShow({ data: true }));
    this.store.dispatch(setUserRole({data: 0}));
    this.config = configServ.routerconfig;
  }

  ngOnInit(): void {
    this.roles = userRoles;
  }

  ngOnDestroy() {
    this.store.dispatch(setStepperShow({ data: false }));
  }

  roleHandler(role: number) {
    const { id } = this.roles.find((e) => e.id === role);
    this.store.dispatch(setStepper({ data: 1 }));
    this.store.dispatch(setUserRole({ data: id}));
    this.router.navigate([this.config.REGISTER2, id]);
  }
}
