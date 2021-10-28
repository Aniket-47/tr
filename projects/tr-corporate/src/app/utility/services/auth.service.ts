import { Register_response, Register_error } from './../interfaces/api/register';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UtilityService } from './utility';
import { api_routes, secure_api_routes } from '../configs/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_routes;
  secure_api_routes;
  constructor(private http: HttpClient, private utilityServ: UtilityService) {
    this.api_routes = api_routes;
    this.secure_api_routes = secure_api_routes;
  }



  register(registerdata: any) {
    this.utilityServ.urlReplace(this.api_routes.REGISTER)
    return this.http.post<Register_response|Register_error>(this.api_routes.REGISTER, registerdata)
  }


}
