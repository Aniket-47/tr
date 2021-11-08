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

// models
import { Iapp } from "../interfaces/app";
import { Iuser } from "../interfaces/user";
import { Iaccount } from "../interfaces/account";

export interface State {
	user: Iuser;
	app: Iapp;
	account: Iaccount
}

export const reducers: ActionReducerMap<State> = {
	user: userData.userReducer,
	app: appData.appReducer,
	account: accountData.accountReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
	? []
	: [];

