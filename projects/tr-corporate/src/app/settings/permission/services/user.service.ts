import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_routes, secure_api_routes } from '../../../utility/configs/apiConfig';
import { UtilityService } from '../../../utility/services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api_routes;
  private secure_api_routes;
  constructor(private http: HttpClient, private utilityServ: UtilityService) {
    this.api_routes = api_routes;
    this.secure_api_routes = secure_api_routes;
  }

  createUser() {

  }
}
