import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UrlReplaceService } from './url-replace.service';
import { api_routes, secure_api_routes } from '../configs/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_routes;
  secure_api_routes;
  constructor(private http: HttpClient, private urlReplacer: UrlReplaceService) {
    this.api_routes = api_routes;
    this.secure_api_routes = secure_api_routes;
  }



  register(registerdata: any) {
    // this.urlReplacer.replace(this.api_routes.REGISTER)
    return this.http.post<any>(this.api_routes.REGISTER, registerdata)
  }


}
