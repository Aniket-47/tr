import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from "../actions/auth.action";
import { Iauth } from "../interface/auth";

export const initialState: Iauth = {
    currentStepper: 0,
	stepper: ['Company Type', 'Register'],
	roles: [
		{id: 1, name: 'Corporate'},
		{id: 2, name: 'Staffing'},
		{id: 3, name: 'JobSeeker'}
	]
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
