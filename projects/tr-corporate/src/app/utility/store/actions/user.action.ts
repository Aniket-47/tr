import { createAction, props } from "@ngrx/store";
import { UserActions } from "../action.constants";

export const saveUserName = createAction(
	UserActions.USER_DATA_ACTION,
	props<{ data: string }>()
);

export const setUserStatus = createAction(
	UserActions.USER_STATUS_ACTION,
	props<{ data: boolean }>()
);

export const setUserAccounts = createAction(
	UserActions.USER_ACCOUNTS_SET_ACTION,
	props<{ data: { accountid: string; name: string; }[] }>()
);

export const removeUsers = createAction(UserActions.USER_REMOVE_ACTION);
