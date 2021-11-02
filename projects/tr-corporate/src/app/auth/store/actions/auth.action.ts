import { createAction, props } from "@ngrx/store";

export const setStepper = createAction(
	"[Auth] Set stepper index",
	props<{ data: number }>()
);

export const setStepperShow = createAction(
	"[Auth] Set stepper show",
	props<{ data: boolean }>()
);

