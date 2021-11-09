import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';
import { LSkeys } from './utility/configs/app.constants';
import { ROUTE_PERMISSION, ROUTE_CONFIGS } from './utility/configs/routerConfig';
import { PostLoginService } from './utility/services/post-login.service';
import { RouterConfigService } from './utility/services/router-config.service';

import { State } from './utility/store/reducers';
import { getUserStatus } from './utility/store/selectors/user.selector';
import { setUserStatus } from './utility/store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tr-corporate';
  isUserLoggedIn = false;
  constructor(
    private store: Store<State>,
    private lstorageService: LstorageService,
    private postLoginService: PostLoginService,
    private configServ: RouterConfigService) {
    this.configServ.routerconfig = ROUTE_CONFIGS;
    this.configServ.routerPermission = ROUTE_PERMISSION;
  }

  ngOnInit() {
    // set logged in status
    this.isUserLoggedIn = !!this.lstorageService.getItem(LSkeys.BEARER_TOKEN);
    this.store.dispatch(setUserStatus({ data: this.isUserLoggedIn }));

    // post login api calls
    this.store.select(getUserStatus).subscribe(isLoggedIn => {
      if (isLoggedIn) this.postLoginService.loadData();
    });
  }
}
