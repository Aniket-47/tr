import { ChangePassword_response } from '../interfaces/changed-password';
import { ShortName_response } from './../interfaces/short-name';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { secure_api_routes } from '../../utility/configs/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  // **** Account ****
  getAccount(accountId: string) {
    const headers = new HttpHeaders().append('accountID', accountId);
    return this.http.get(secure_api_routes.ACCOUNT, { headers });
  }

  updateAccount(payload: any, accountId: string) {
    const headers = new HttpHeaders().append('accountID', accountId);
    return this.http.post(secure_api_routes.ACCOUNT, payload, { headers });
  }

  // **** User ****
  getUser() {
    return this.http.get(secure_api_routes.USER);
  }

  updateUser(payload: any) {
    return this.http.put(secure_api_routes.USER_UPDATE, payload);
  }

  getCountryList() {
    return this.http.get(secure_api_routes.COUNTRY_LIST);
  }

  getStateList(isoCode: string) {
    const url = `${secure_api_routes.STATE_LIST}/${isoCode}`
    return this.http.get(url);
  }

  getCityList(isoCode: string, stateCode: string) {
    const url = `${secure_api_routes.CITY_LIST}/${isoCode}/${stateCode}`
    return this.http.get(url);
  }

  getIndustryList() {
    const url = `${secure_api_routes.INDUSTRY_LIST}`;
    return this.http.get(url);
  }

  getShortName(shortName: string) {
    const url = `${secure_api_routes.SHORT_NAME}`;
    return this.http.post<ShortName_response>(url, { 'shortname': shortName });
  }

  changePassword(payload: any) {
    const url = `${secure_api_routes.CHANGE_PASSWORD}`; 
    return this.http.post<ChangePassword_response>(url, payload)
  }
}
