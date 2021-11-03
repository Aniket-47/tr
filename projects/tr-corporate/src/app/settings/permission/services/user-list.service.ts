import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_routes, secure_api_routes } from '../../../utility/configs/apiConfig';
import { UtilityService } from '../../../utility/services/utility.service';
import { UserList_request } from '../interfaces/user-list';
import { Store } from '@ngrx/store';
import { State } from '../../../utility/store/reducers';
import { getDefaultAccountId } from '../../../utility/store/selectors/user.selector';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private api_routes;
  private secure_api_routes;
  constructor(private http: HttpClient, private utilityServ: UtilityService) {
    this.api_routes = api_routes;
    this.secure_api_routes = secure_api_routes;
  }

  getUserList(accountID: string) {
    return this.http.get<any>(this.secure_api_routes.USER_LIST, { headers: { 'accountID': accountID } }).pipe(
      map(res => {
        const data = res.data.map((e: any) => ({ ...e, lastUpdated: e["last Updated"] }))
        return { ...res, data }
      })
    )
  }

}
