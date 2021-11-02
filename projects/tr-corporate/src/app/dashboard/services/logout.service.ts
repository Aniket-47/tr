import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';

// Utility
import { api_routes, secure_api_routes } from '../../utility/configs/apiConfig';
import { LSkeys } from '../../utility/configs/app.constants';
import { UtilityService } from '../../utility/services/utility.service';

// Interfaces
import { Logout_response } from '../interfaces/logout';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private api_routes;
  private secure_api_routes;
  constructor(private http: HttpClient, private utilityServ: UtilityService, private lsServ: LstorageService) {
    this.api_routes = api_routes;
    this.secure_api_routes = secure_api_routes;
  }

  logout(){
    const guid = this.lsServ.getItem(LSkeys.DEVICE_GUID) || "";
    return this.http.post<Logout_response>(secure_api_routes.LOGOUT, {}, { headers: { 'clientuniqueid': guid } })
  }
}
