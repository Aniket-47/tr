import { Action, createReducer, on } from "@ngrx/store";
import * as UserActions from "../actions/user.action";
import { Iuser } from "../interfaces/user";

export const initialState: Iuser = {
	name: '',
	accountIDs: [],
	isLoggedIn: false,
};

export const userReducer = createReducer(
	initialState,

	on(UserActions.saveUserName, (state, action) => {
		return {
            ...state,
            name: action.data
		};
	}),

	on(UserActions.setUserStatus, (state, action) => {
		return {
            ...state,
            isLoggedIn: action.data
		};
	}),

	on(UserActions.setUserAccounts, (state, action) => {
		return {
            ...state,
            accountIDs: action.data
		};
	}),

	on(UserActions.removeUsers, () => initialState)
);
