import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from "../actions/auth.action";
import { Iauth } from "../interface/auth";

export const initialState: Iauth = {
	stepper: {
		active: 0,
		stepList: ['Company Type', 'Register'],
		showStepper: false,
	},
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
            stepper: {
				...state.stepper,
				active: action.data
			}
		};
	}),

	on(AuthActions.setStepperShow, (state, action) => {
		return {
            ...state,
            stepper: {
				...state.stepper,
				showStepper: action.data
			}
		};
	}),
);
