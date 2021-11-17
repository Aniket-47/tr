import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';
import { Observable } from 'rxjs';
import { LSkeys } from '../utility/configs/app.constants';
import { ROUTE_CONFIGS } from '../utility/configs/routerConfig';
import { setAccountDeatils } from '../utility/store/actions/account.action';
import { State } from '../utility/store/reducers';
import { getAccountIds } from '../utility/store/selectors/account.selector';
import { getIsLoading } from '../utility/store/selectors/app.selector';
import { getUserFirstName } from '../utility/store/selectors/user.selector';
import { LogoutService } from './shared/services/logout.service';
import { setUserRoles } from '../utility/store/actions/roles.action';
import { setUserAddress, setUserCity, setUserCountry, setUserFullName, setUserMobile, setUserName, setUserState } from '../utility/store/actions/user.action';
import { IaccountDetials } from '../utility/store/interfaces/account';


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
  routerConfig = ROUTE_CONFIGS;

  accountList: { accountid: string; name: string; }[] = [];
  userName!: string;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(
    private logoutServ: LogoutService,
    private lsServ: LstorageService,
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router) {
    this.isLoading$ = this.store.select(getIsLoading);
  }

  ngOnInit(): void {
    const preloadData: any[] = this.route.snapshot.data?.data;
    this.setDataInStore(preloadData);

    this.date = new Date();
    this.store.select(getAccountIds).subscribe(accounts => this.accountList = accounts);
    this.store.select(getUserFirstName).subscribe(name => this.userName = name);
  }

  setDataInStore(data: any[]) {
    if (data.length) {
      if (!data[0]?.error) {
        const account: IaccountDetials = data[0]?.data;
        this.store.dispatch(setAccountDeatils({ data: account }));
      }

      if (!data[1]?.error) {
        const user = data[1].data;
        this.store.dispatch(setUserFullName({ data: `${user?.firstname} ${user?.lastname}` }));
        this.store.dispatch(setUserAddress({ data: user?.address }));
        this.store.dispatch(setUserName({ data: { firstName: user?.firstname, middleName: user?.middleName, lastName: user?.lastname } }));
        this.store.dispatch(setUserCity({ data: { cityId: user?.cityid, cityName: user?.cityname } }));
        this.store.dispatch(setUserState({ data: { stateId: user?.stateid, stateName: user?.statename } }));
        this.store.dispatch(setUserCountry({ data: { countryId: user?.countryid, countryName: user?.countryname } }));
        this.store.dispatch(setUserMobile({ data: user?.mobilenumber }));

        this.lsServ.store(LSkeys.USER_NAME, `${user?.firstname}`);
      }


      if (!data[2]?.error) {
        const roles = data[2]?.data.map((e: any) => ({ roletypeid: e?.roletypeid, name: e?.name }));
        this.store.dispatch(setUserRoles({ data: roles }));
      }

      if (!data[3]?.error) {
        this.lsServ.remove(LSkeys.LANGUAGE);
        this.lsServ.store(LSkeys.LANGUAGE, JSON.stringify(data[3]?.data));
      }
    }
  }

  toggleSearch() {
    this.searchToggle = !this.searchToggle;
  }

  logout() {
    this.resMsgLogout = "";
    this.logoutServ.logout();
    this.logoutServ.clearSavedData();
    this.router.navigate(["./"])
  }
  onEvent(event: any) {
    event.stopPropagation();
  }
}
