import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { secure_api_routes } from '../../utility/configs/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getUser() {
      return this.http.get(secure_api_routes.ACCOUNT);
  }

  updateUser(payload: any) {
      return this.http.post(secure_api_routes.ACCOUNT, payload);
  }

}
