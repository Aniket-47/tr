import { GetUser_request, GetUser_response } from './../interfaces/get-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UtilityService } from '../../../utility/services/utility.service';
import { api_routes, secure_api_routes } from '../../../utility/configs/apiConfig';

// Interdaces
import { AddUser_response, AddUser_request } from './../interfaces/add-user';
import { UpdateUser_request, UpdateUser_response } from '../interfaces/update-user';
import { DeactivateUser_request, DeactivateUser_response } from '../interfaces/deactivate-user';
import { DeleteUser_request, DeleteUser_response } from '../interfaces/delete-user';

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

  getUser(data: GetUser_request) {
    return this.http.post<GetUser_response>(this.secure_api_routes.ADD_USER, data)
  }
  createUser(accountID: string, data: AddUser_request) {
    return this.http.post<AddUser_response>(this.secure_api_routes.ADD_USER, data, { headers: { 'accountID': accountID } })
  }
  updateUser(data: UpdateUser_request) {
    return this.http.post<UpdateUser_response>(this.secure_api_routes.UPDATE_USER, data)
  }
  deactivateUser(data: DeactivateUser_request) {
    return this.http.post<DeactivateUser_response>(this.secure_api_routes.DEACTIVATE_USER, data)
  }
  deleteUser(data: DeleteUser_request) {
    return this.http.post<DeleteUser_response>(this.secure_api_routes.DELETE_USER, data)
  }
}
