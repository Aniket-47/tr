import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_routes, secure_api_routes } from '../../../utility/configs/apiConfig';
import { UtilityService } from '../../../utility/services/utility.service';
import { UserList_response } from '../interfaces/user-list';

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

  getUserList(accountID: string, sort?: string, pageNo?: number, sortOrder?: string) {
    let url = `${this.secure_api_routes.USER_LIST}?limit=10`
    if (sort) {
      url = `${url}&orderby=${sort}`;
    }
    if (sortOrder) {
      url = `${url}&order=${sortOrder}`;
    }

    return this.http.get<UserList_response>(url, { headers: { 'accountID': accountID } })
  }

}
