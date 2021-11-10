import {
	ActionReducerMap,
	createSelector,
	MetaReducer,
} from "@ngrx/store";

import { environment } from '../../../../environments/environment';

// reducer
import * as userData from "../reducers/user.reducer";
import * as appData from "../reducers/app.reducer";
import * as accountData from "../reducers/account.reducer";
import * as roleData from "../reducers/roles.reducer"
import * as languageData from '../reducers/language.reducer'

// models
import { Iapp } from "../interfaces/app";
import { Iuser } from "../interfaces/user";
import { Iaccount } from "../interfaces/account";
import { Iroles } from "../interfaces/role";

export interface State {
	app: Iapp;
	user: Iuser;
	account: Iaccount,
	roles: Iroles,
	language: any
}

export const reducers: ActionReducerMap<State> = {
	user: userData.userReducer,
	app: appData.appReducer,
	account: accountData.accountReducer,
	roles: roleData.rolesReducer,
	language: languageData.languageReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
	? []
	: [];

