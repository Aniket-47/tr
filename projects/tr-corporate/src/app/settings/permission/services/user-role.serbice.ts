import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { secure_api_routes } from '../../../utility/configs/apiConfig';

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {
    constructor(private http: HttpClient) {
    }

    getUserRoles(accountID: string, sort?: string, pageNo?: number, sortOrder?: string) {
        return this.http.get<any>(secure_api_routes.USER_ROLES, { headers: { 'accountID': accountID } })
    }

}
