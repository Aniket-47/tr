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

	on(UserActions.resetUser, (state, action) => {
		return { ...initialState };
	}),

	on(UserActions.setUserFullName, (state, action) => {
		return {
			...state,
			fullName: action.data
		};
	}),


	on(UserActions.setUserName, (state, action) => {
		const { firstName, lastName, middleName } = action.data;
		return {
			...state,
			firstName,
			lastName,
			middleName
		};
	}),


	on(UserActions.setUserAddress, (state, action) => {
		return {
			...state,
			address: action.data
		};
	}),

	on(UserActions.setUserCity, (state, action) => {
		const { cityId, cityName } = action.data;
		return {
			...state,
			cityId,
			cityName
		};
	}),

	on(UserActions.setUserState, (state, action) => {
		const { stateId, stateName } = action.data;
		return {
			...state,
			stateId,
			stateName
		};
	}),

	on(UserActions.setUserCountry, (state, action) => {
		const { countryId, countryName } = action.data;
		return {
			...state,
			countryId,
			countryName
		};
	}),

	on(UserActions.setUserMobile, (state, action) => {
		return {
			...state,
			mobileNumber: action.data
		};
	}),

	on(UserActions.setUserStatus, (state, action) => {
		return {
			...state,
			isLoggedIn: action.data
		};
	}),
);
