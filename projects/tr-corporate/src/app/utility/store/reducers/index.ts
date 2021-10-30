import {
	ActionReducerMap,
	createSelector,
	MetaReducer,
} from "@ngrx/store";

import {environment} from '../../../../environments/environment';

// reducer
import * as userData from "../reducers/user.reducer";
import * as appData from "../reducers/app.reducer";

// models
import { Iapp } from "../interfaces/app";
import { Iuser } from "../interfaces/user";

export interface State {
	user: Iuser;
	app: Iapp;
}

export const reducers: ActionReducerMap<State> = {
	user: userData.userReducer,
	app: appData.appReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
	? []
	: [];

