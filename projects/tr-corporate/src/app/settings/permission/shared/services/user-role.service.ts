import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { secure_api_routes } from '../../../../utility/configs/apiConfig';

interface IroleData {
    isView: boolean;
    isEdit: boolean;
    isNew: boolean;
    selectedRole: {
        roletypeid: number;
        rolename: string;
        accountroleid?: string
        isCustom?: boolean
    } | null
}

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {
    roleData: IroleData = {
        isView: false,
        isEdit: false,
        isNew: false,
        selectedRole: null
    }
    private roleDataSource = new BehaviorSubject(this.roleData);
    currentRoleData = this.roleDataSource.asObservable();

    constructor(private http: HttpClient) {
    }

    setCurrentRole(data: IroleData) {
        this.roleDataSource.next(data)
    }

    resetSelectedRole() {
        const roleData = {
            isView: false,
            isEdit: false,
            isNew: false,
            selectedRole: null
        }

        this.setCurrentRole(roleData);
    }

    getUserRoles(accountID: string, offset: number = 0, limit: number = 10, sort?: string, sortOrder?: string,) {
        let url = `${secure_api_routes.USER_ROLES}?offset=${offset}&limit=${limit}`;
        if (sort) url = `${url}&orderby=${sort}`;
        if (sortOrder) url = `${url}&order=${sortOrder}`;

        return this.http.get<any>(url, { headers: { 'accountID': accountID } })
    }

    getPermissions(accountID: string, roletypeid: string) {
        const url = `${secure_api_routes.PERMISSIONS_LIST}?roletypeid=${roletypeid}`
        return this.http.get(url, { headers: { 'accountID': accountID } });
    }

    getDummyData() {
        return this.http.get('assets/dummy_fetch_update.json');
    }

    saveRole(payload: any, accountID: string) {
        return this.http.post(secure_api_routes.ADD_ROLE, payload, { headers: { 'accountID': accountID } });
    }

    updateRole(payload: any) {
        return this.http.put(secure_api_routes.UPDATE_ROLE, payload);
    }

    updatePersmissions(payload: any, accountID: string) {
        return this.http.put(secure_api_routes.PERMISSIONS_UPDTAE, payload, { headers: { 'accountID': accountID } });
    }

    deleteRole(roletypeid: number) {
        const url = `${secure_api_routes.DELETE_ROLE}?accountroleid=${roletypeid}`;
        return this.http.patch(url, {});
    }

}
