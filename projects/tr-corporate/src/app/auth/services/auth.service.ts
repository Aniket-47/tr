import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Utility
import { UtilityService } from '../../utility/services/utility.service';
import { api_routes, secure_api_routes } from '../../utility/configs/apiConfig';

// Interfaces
import { Login_request, Login_response } from '../interfaces/login';
import { Register_response, Register_error } from '../interfaces/register';
import { Guid } from 'guid-typescript';

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
    const guid = Guid.create();
    return this.http.post<Login_response>(this.api_routes.LOGIN, logindata, { headers: { 'clientuniqueid': guid.toString() } });
  }

  validateEmail(email: string) {
    return this.http.post<string>(this.api_routes.VALIDATE_EMAIL, { "email": email })
  }

  validateAccount(token: string) {
    return this.http.post<string>(this.api_routes.VALIDATE_ACCOUNT, { "inviteKey": token })
  }

  passwordForget(email: any) {
    return this.http.post<string>(this.api_routes.FORGOT_PASSWORD, { "email": email })
  }


}
