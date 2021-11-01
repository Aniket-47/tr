import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from "../actions/auth.action";
import { Iauth } from "../interface/auth";

export const initialState: Iauth = {
    currentStepper: 0
};

export const authReducer = createReducer(
	initialState,

	on(AuthActions.setStepper, (state, action) => {
		return {
            ...state,
            currentStepper: action.data
		};
	}),
);
