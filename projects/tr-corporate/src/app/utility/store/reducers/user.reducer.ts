import { Action, createReducer, on } from "@ngrx/store";
import * as UserActions from "../actions/user.action";
import { Iuser } from "../interfaces/user";

export const initialState: Iuser = {
	isLoggedIn: false,
	fullName: '',
	firstName: '',
	lastName: '',
	middleName: '',
	address: '',
	cityId: '',
	cityName: '',
	countryId: '',
	countryName: '',
	mobileNumber: '',
	stateId: '',
	stateName: '',
};

export const userReducer = createReducer(
	initialState,

	on(UserActions.setUserFullName, (state, action) => {
		return {
			...state,
			fullName: action.data
		};
	}),

	on(UserActions.setUserStatus, (state, action) => {
		return {
			...state,
			isLoggedIn: action.data
		};
	}),
);
