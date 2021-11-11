import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';
import { LSkeys } from './utility/configs/app.constants';
import { ROUTE_PERMISSION, ROUTE_CONFIGS } from './utility/configs/routerConfig';
import { RouterConfigService } from './utility/services/router-config.service';

import { State } from './utility/store/reducers';
import { setUserStatus } from './utility/store/actions/user.action';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tr-corporate';
  isUserLoggedIn = false;
  loading = false;

  constructor(
    private store: Store<State>,
    private router: Router,
    private lstorageService: LstorageService,
    private configServ: RouterConfigService) {
    this.configServ.routerconfig = ROUTE_CONFIGS;
    this.configServ.routerPermission = ROUTE_PERMISSION;

    this.router.events.subscribe((event: any) => {
      this.checkRouterEvent(event);
    });
  }

  ngOnInit() {
    // set logged in status
    this.isUserLoggedIn = !!this.lstorageService.getItem(LSkeys.BEARER_TOKEN);
    this.store.dispatch(setUserStatus({ data: this.isUserLoggedIn }));
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

}
