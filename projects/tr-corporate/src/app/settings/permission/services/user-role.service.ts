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

    getPermissions(accountID: string, roleId: string) {
        const url = `${secure_api_routes.PERMISSIONS_LIST}?roletypeid=${roleId}`
        return this.http.get(url, { headers: { 'accountID': accountID } });
    }

    getDummyData() {
        return this.http.get('assets/dummy_fetch_update.json');
    }

    saveRole(payload: any, accountID: string) {
        return this.http.post(secure_api_routes.ADD_ROLE, payload, { headers: { 'accountID': accountID } });
    }

    updatePersmissions(payload: any, accountID: string) {
        return this.http.put(secure_api_routes.PERMISSIONS_UPDTAE, payload, { headers: { 'accountID': accountID } });
    }

}
