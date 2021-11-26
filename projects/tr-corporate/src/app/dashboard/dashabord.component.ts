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
import { getUserFirstName, getUserFullName } from '../utility/store/selectors/user.selector';
import { LogoutService } from './shared/services/logout.service';
import { setUserRoles } from '../utility/store/actions/roles.action';
import { setUserAddress, setUserCity, setUserCountry, setUserFullName, setUserMail, setUserMobile, setUserName, setUserRole, setUserState, setUserStatus } from '../utility/store/actions/user.action';
import { IaccountDetials } from '../utility/store/interfaces/account';
import { DASHBOARD_LN } from './shared/dashboard.lang';
import { setBusinessVerticle } from '../utility/store/actions/business-vertical.action';
import { IBusVert } from '../utility/store/interfaces/business-vertical';
import { TranslatePipe } from '@mucrest/ng-core';
import { AccountListApiService } from './shared/services/account-list-api.service';
import { SnackBarService } from '../utility/services/snack-bar.service';


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

  ln = DASHBOARD_LN;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(
    private logoutServ: LogoutService,
    private lsServ: LstorageService,
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private accountServ: AccountListApiService,
    private snackbar: SnackBarService
  ) {
    this.isLoading$ = this.store.select(getIsLoading);
  }

  ngOnInit(): void {
    const preloadData: any[] = this.route.snapshot.data?.data;
    this.setDataInStore(preloadData);
    /** Set Language */
    const languageData = this.lsServ.getItem(LSkeys.LANGUAGE);
    if (languageData) TranslatePipe.setLanguagePack(JSON.parse(languageData));

    this.date = new Date();
    this.store.select(getAccountIds).subscribe(accounts => this.accountList = accounts);
    this.store.select(getUserFullName).subscribe(name => this.userName = name);

    const inviteToken = this.lsServ.getItem(LSkeys.INVITE_TOKEN);
    if (inviteToken) {
      this.accountServ.validateInvite({ inviteKey: inviteToken })
        .subscribe(res => {
          this.snackbar.open(res.message)
          this.lsServ.remove(LSkeys.INVITE_TOKEN);
        })
    }
  }

  setDataInStore(data: any[]) {
    if (data.length) {
      if (!data[0]?.error) {
        const account: IaccountDetials = data[0]?.data;
        this.store.dispatch(setAccountDeatils({ data: account }));
      }

      if (!data[1]?.error) {
        // console.log(data[1])
        const user = data[1].data;
        this.store.dispatch(setUserFullName({ data: `${user?.firstname} ${user?.lastname}` }));
        // this.store.dispatch(setUserAddress({ data: user?.address }));
        // this.store.dispatch(setUserCity({ data: { cityId: user?.cityid, cityName: user?.cityname } }));
        // this.store.dispatch(setUserState({ data: { stateId: user?.stateid, stateName: user?.statename } }));
        // this.store.dispatch(setUserCountry({ data: { countryId: user?.countryid, countryName: user?.countryname } }));
        this.store.dispatch(setUserMobile({ data: user?.mobilenumber }));
        this.store.dispatch(setUserName({ data: { firstName: user.firstname, middleName: user?.middlename, lastName: user?.lastname } }))
        this.store.dispatch(setUserMail({ data: user?.email }));
        this.store.dispatch(setUserRole({ data: { roletypename: user?.roletypename, roletypeid: user?.roletypeid } }));
        this.store.dispatch(setUserStatus({ data: user?.status }));

        // store user name
        this.lsServ.store(LSkeys.USER_NAME, `${user?.firstname}`);
      }


      if (!data[2]?.error) {
        const roles = data[2]?.data?.roles.map((e: any) => ({ roletypeid: e?.roletypeid, name: e?.name }));
        this.store.dispatch(setUserRoles({ data: roles }));
      }

      if (!data[3]?.error) {
        this.lsServ.remove(LSkeys.LANGUAGE);
        this.lsServ.store(LSkeys.LANGUAGE, JSON.stringify(data[3]?.data));
        /** Set Language(Ensured) */
        const languageData = this.lsServ.getItem(LSkeys.LANGUAGE);
        if (languageData) TranslatePipe.setLanguagePack(JSON.parse(languageData));
      }

      if (!data[4]?.error) {
        const buildData = data[4].data.map((e: IBusVert) => ({ businessverticalid: e.businessverticalid, name: e.name, parentid: e.parentid, parentname: e.parentname }))
        this.store.dispatch(setBusinessVerticle({ data: buildData }))
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
