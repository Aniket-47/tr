import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from "../actions/auth.action";
import { Iauth } from "../interface/auth";

export const initialState: Iauth = {
	stepper: {
		active: 0,
		stepList: ['Org Type', 'Register', 'Verify'],
		showStepper: false,
	},
	selectedRole: 0
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

	on(AuthActions.setUserRole, (state, action) => {
		return {
            ...state,
			selectedRole: action.data
		};
	}),
);
