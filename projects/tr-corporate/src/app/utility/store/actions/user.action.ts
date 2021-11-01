import { createAction, props } from "@ngrx/store";
import { USER_ACTIONS } from "../action.constants";
import { Iuser } from "../interfaces/user";

export const saveUserData = createAction(
	USER_ACTIONS.userDataAction,
	props<{ data: Iuser }>()
);

export const setUserStatus = createAction(
	USER_ACTIONS.userStatusAction,
	props<{ data: boolean }>()
);

export const removeUsers = createAction("[User] Remove Users");
