import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, forkJoin, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AccountList_response } from '../../dashboard/interfaces/account-list';
import { secure_api_routes } from '../configs/apiConfig';
import { setAccountList } from '../store/actions/account.action';
import { State } from '../store/reducers';

@Injectable({
  providedIn: 'root'
})
export class PostLoginService {

  constructor(
    private http: HttpClient,
    private store: Store<State>) { }

  loadPostLoginData() {
    return this.http.get<AccountList_response>(secure_api_routes.ACCOUNT_LIST)
      .pipe(mergeMap(res => {
        if (!res.error) {
          const accountList = res.data;
          this.store.dispatch(setAccountList({ data: accountList }));
          return this.preLoadData(accountList[0].accountid);
        } else return [];
      }))
  }

  preLoadData(accountId: string) {
    const headers = new HttpHeaders().append('accountID', accountId);
    const apis = [
      this.http.get(secure_api_routes.ACCOUNT, { headers }),
      this.http.get(secure_api_routes.USER),
      this.http.get(secure_api_routes.DEFAULT_ROLES)
    ];

    return forkJoin(apis);
  }
}

