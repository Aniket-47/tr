import { createAction, props } from "@ngrx/store";
import { Iuser } from "../interfaces/user";

export const saveUserData = createAction(
	"[USER] Save user data",
	props<{ data: Iuser }>()
);

export const setUserStatus = createAction(
	"[USER] Save User status",
	props<{ data: boolean }>()
);

export const removeUsers = createAction("[User] Remove Users");
