import { createAction, props } from "@ngrx/store";
import { UserActions } from "../action.constants";

// reset user
export const resetUser = createAction(
	UserActions.USER_RESET_ACTION,
	props<{ data: boolean }>()
);

// fullname
export const setUserFullName = createAction(
	UserActions.USER_FULLNAME_ACTION,
	props<{ data: string }>()
);

// name
export const setUserName = createAction(
	UserActions.USER_NAME_ACTION,
	props<{ data: { firstName: string, lastName: string, middleName: string } }>()
);

// address
export const setUserAddress = createAction(
	UserActions.USER_ADDRESS_ACTION,
	props<{ data: string }>()
);

// city
export const setUserCity = createAction(
	UserActions.USER_CITY_ACTION,
	props<{ data: { cityId: string, cityName: string } }>()
);

// state
export const setUserState = createAction(
	UserActions.USER_STATE_ACTION,
	props<{ data: { stateId: string, stateName: string } }>()
);

// country
export const setUserCountry = createAction(
	UserActions.USER_COUNTRY_ACTION,
	props<{ data: { countryId: string, countryName: string } }>()
);

// Others
export const setUserMobile = createAction(
	UserActions.USER_MOBILE_ACTION,
	props<{ data: string }>()
);

// use status
export const setUserStatus = createAction(
	UserActions.USER_STATUS_ACTION,
	props<{ data: boolean }>()
);
