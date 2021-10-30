import {
	ActionReducerMap,
} from "@ngrx/store";


// reducer
import * as authData from "../reducers/auth.reducers";

// models
import { Iauth } from "../interface/auth";

export interface AuthFeatureState {
	auth: Iauth;
}

export const authFeatReducers: ActionReducerMap<AuthFeatureState> = {
	auth: authData.authReducer,
};


