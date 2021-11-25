import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Utility
import { UtilityService } from '../../utility/services/utility.service';
import { api_routes, secure_api_routes } from '../../utility/configs/apiConfig';

// Interfaces
import { Login_request, Login_response } from '../interfaces/login';
import { Register_response, Register_error } from '../interfaces/register';
import { ResetPassword_response, ResetPassword_request } from './../interfaces/reset-password';

// Local storage
import { Guid } from 'guid-typescript';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';
import { LSkeys } from '../../utility/configs/app.constants';
import { ForgotPassword_response } from '../interfaces/forgot-password';
import { NewInvitedUser_request, NewInvitedUser_response } from '../interfaces/invited-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_routes;
  secure_api_routes;
  constructor(private http: HttpClient, private utilityServ: UtilityService, private lsServ: LstorageService) {
    this.api_routes = api_routes;
    this.secure_api_routes = secure_api_routes;
  }


  register(registerdata: any) {
    // this.utilityServ.urlReplace(this.api_routes.REGISTER)
    return this.http.post<Register_response | Register_error>(this.api_routes.REGISTER, registerdata);
  }

  login(logindata: Login_request) {
    const guid = (Guid.create()).toString();
    this.lsServ.store(LSkeys.DEVICE_GUID, guid);
    return this.http.post<Login_response>(this.api_routes.LOGIN, logindata, { headers: { 'clientuniqueid': guid, 'skipError': 'true' } });
  }

  validateEmail(email: string) {
    return this.http.post<string>(this.api_routes.VALIDATE_EMAIL, { "email": email })
  }

  validateAccount(token: string) {
    return this.http.post<string>(this.api_routes.VALIDATE_ACCOUNT, { "inviteKey": token })
  }

  passwordForget(email: any) {
    return this.http.post<ForgotPassword_response>(this.api_routes.FORGOT_PASSWORD, { "email": email })
  }

  passwordReset(token: string, data: ResetPassword_request) {
    const apiUrl = this.utilityServ.urlReplace(this.api_routes.RESET_PASSWORD, encodeURIComponent(token));
    return this.http.put<ResetPassword_response>(apiUrl, data)
  }

  inviteSetPassword(data:NewInvitedUser_request)
  {
    const guid = (Guid.create()).toString();
    this.lsServ.store(LSkeys.DEVICE_GUID, guid);
    return this.http.post<NewInvitedUser_response>(this.api_routes.INVTE_SET_PASWORD, data, { headers: { 'clientuniqueid': guid, 'skipError': 'true' } });
  }

}
