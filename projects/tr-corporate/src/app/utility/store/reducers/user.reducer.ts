import { Action, createReducer, on } from "@ngrx/store";
import * as UserActions from "../actions/user.action";
import { Iuser } from "../interfaces/user";

export const initialState: Iuser = {
	firstName: '',
    middleName: '',
	lastName: '',
	isLoggedIn: false,
};

export const userReducer = createReducer(
	initialState,

	on(UserActions.saveUserData, (state, action) => {
		const userData = action.data;
		return {
            ...state,
            userData
		};
	}),

	on(UserActions.setUserStatus, (state, action) => {
		return {
            ...state,
            isLoggedIn: action.data
		};
	}),

	on(UserActions.removeUsers, () => initialState)
);
