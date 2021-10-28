import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Utility
import { UtilityService } from '../../utility/services/utility';
import { api_routes, secure_api_routes } from '../../utility/configs/apiConfig';

// Interfaces
import { Login_request } from '../interfaces/login';
import { Register_response, Register_error } from '../interfaces/register';

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
    // this.utilityServ.urlReplace(this.api_routes.REGISTER)
    return this.http.post<Register_response | Register_error>(this.api_routes.REGISTER, registerdata);
  }

  login(logindata: Login_request) {
    return this.http.post<Login_request>(this.api_routes.LOGIN, logindata);
  }

}
