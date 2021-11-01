import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Utility
import { UtilityService } from '../../utility/services/utility';
import { api_routes, secure_api_routes } from '../../utility/configs/apiConfig';

// Interfaces
import { AccountList_response } from '../interfaces/account-list';


@Injectable({
  providedIn: 'root'
})
export class AccountListApiService {
  private api_routes;
  private secure_api_routes;
  constructor(private http: HttpClient, private utilityServ: UtilityService) {
    this.api_routes = api_routes;
    this.secure_api_routes = secure_api_routes;
  }


  getAccountList() {
    return this.http.get<AccountList_response>(secure_api_routes.ACCOUNT_LIST)
  }
}
