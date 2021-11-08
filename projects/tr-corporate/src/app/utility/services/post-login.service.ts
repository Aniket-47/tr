import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { AccountList_response } from '../../dashboard/interfaces/account-list';
import { secure_api_routes } from '../configs/apiConfig';
import { setAccountDeatils, setAccountList } from '../store/actions/account.action';
import { setUserRoles } from '../store/actions/roles.action';
import { setUserAddress, setUserCity, setUserCountry, setUserFullName, setUserMobile, setUserName, setUserState } from '../store/actions/user.action';
import { IaccountDetials } from '../store/interfaces/account';
import { State } from '../store/reducers';

@Injectable({
  providedIn: 'root'
})
export class PostLoginService {

  constructor(
    private http: HttpClient,
    private store: Store<State>) { }

  loadData() {
    console.log('Called')
    this.http.get<AccountList_response>(secure_api_routes.ACCOUNT_LIST).subscribe((res) => {
      if (!res.error) {
        const accountList = res.data;
        this.store.dispatch(setAccountList({ data: accountList }));
        if (Array.isArray(accountList) && accountList.length) this.preLoadData(accountList[0].accountid);
      }
    });
  }

  preLoadData(accountId: string) {
    const headers = new HttpHeaders().append('accountID', accountId);
    const apis = [
      this.http.get(secure_api_routes.ACCOUNT, { headers }),
      this.http.get(secure_api_routes.USER),
      this.http.get(secure_api_routes.USER_ROLES, { headers })
    ];

    forkJoin(apis).subscribe((res: any) => {
      if (res.length) {
        if (!res[0]?.error) {
          const account: IaccountDetials = res[0]?.data;
          this.store.dispatch(setAccountDeatils({ data: account }));
        }

        if (!res[1]?.error) {
          const user = res[1].data;
          this.store.dispatch(setUserFullName({ data: `${user?.firstname} ${user?.lastname}` }));
          this.store.dispatch(setUserAddress({ data: user?.address }));
          this.store.dispatch(setUserName({ data: { firstName: user?.firstname, middleName: user?.middleName, lastName: user?.lastname } }));
          this.store.dispatch(setUserCity({ data: { cityId: user?.cityid, cityName: user?.cityname } }));
          this.store.dispatch(setUserState({ data: { stateId: user?.stateid, stateName: user?.statename } }));
          this.store.dispatch(setUserCountry({ data: { countryId: user?.countryid, countryName: user?.countryname } }));
          this.store.dispatch(setUserMobile({ data: user?.mobilenumber }));
        }


        if (!res[2]?.error) {
          const roles = res[2]?.data;
          this.store.dispatch(setUserRoles({ data: roles }));
        }
      }
    });
  }
}
