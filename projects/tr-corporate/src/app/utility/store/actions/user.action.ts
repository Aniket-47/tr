import { createAction, props } from "@ngrx/store";
import { UserActions } from "../action.constants";

// fullname
export const setUserFullName = createAction(
	UserActions.USER_DATA_ACTION,
	props<{ data: string }>()
);

// address
export const setUserAddress = createAction(
	UserActions.USER_DATA_ACTION,
	props<{ data: string }>()
);

// use status
export const setUserStatus = createAction(
	UserActions.USER_STATUS_ACTION,
	props<{ data: boolean }>()
);
