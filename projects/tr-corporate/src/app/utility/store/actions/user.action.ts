import { createAction, props } from "@ngrx/store";
import { USER_ACTIONS } from "../action.constants";

export const saveUserName = createAction(
	USER_ACTIONS.userDataAction,
	props<{ data: string }>()
);

export const setUserStatus = createAction(
	USER_ACTIONS.userStatusAction,
	props<{ data: boolean }>()
);

export const setUserAccounts = createAction(
	USER_ACTIONS.userStatusAction,
	props<{ data: Array<string> }>()
);

export const removeUsers = createAction("[User] Remove Users");
