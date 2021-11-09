import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';
import { Observable } from 'rxjs';
import { LSkeys } from '../utility/configs/app.constants';
import { ROUTE_CONFIGS } from '../utility/configs/routerConfig';
import { setAccountList } from '../utility/store/actions/account.action';
import { setUserStatus } from '../utility/store/actions/user.action';
import { State } from '../utility/store/reducers';
import { getAccountIds } from '../utility/store/selectors/account.selector';
import { getIsLoading } from '../utility/store/selectors/app.selector';
import { getUserFullName } from '../utility/store/selectors/user.selector';
import { AccountListApiService } from './services/account-list-api.service';
import { LogoutService } from './services/logout.service';


@Component({
  selector: 'app-dashabord',
  templateUrl: './dashabord.component.html',
  styleUrls: ['./dashabord.component.scss']
})
export class DashabordComponent implements OnInit {

  panelOpenState = false;
  date: any;
  hidden = false;
  colorActivation = false;
  msgColorActivation = false;
  searchToggle = false;
  resMsgLogout: string = "";
  isLoading$!: Observable<boolean>;
  MANAGE_PROFILE_ROUTE = ROUTE_CONFIGS.ACCOUNT_MANAGE_PROFILE;

  accountList: { accountid: string; name: string; }[] = [];
  userName!: string;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(
    private accountListApiServ: AccountListApiService,
    private logoutServ: LogoutService,
    private lsServ: LstorageService,
    private store: Store<State>,
    private router: Router) {
    this.isLoading$ = this.store.select(getIsLoading);
  }

  ngOnInit(): void {
    this.date = new Date();
    this.store.select(getAccountIds).subscribe(accounts => this.accountList = accounts);
    this.store.select(getUserFullName).subscribe(name => this.userName = name);
    // this.accountListApiServ.getAccountList().subscribe(res => {
    //   if (!res.error) {
    //     this.accountList = res.data;
    //     this.store.dispatch(setAccountList({ data: this.accountList }))
    //   }
    // });

  }

  toggleSearch() {
    this.searchToggle = !this.searchToggle;
  }

  logout() {
    this.resMsgLogout = "";
    this.logoutServ.logout()
    this.lsServ.remove(LSkeys.BEARER_TOKEN);
    this.store.dispatch(setUserStatus({ data: false }));
    this.router.navigate(["./"])

  }
  onEvent(event: any) {
    event.stopPropagation();
  }
}
