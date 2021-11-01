import { createAction, props } from "@ngrx/store";

export const setStepper = createAction(
	"[Auth] Save stepper",
	props<{ data: number }>()
);

export const setStepperShow = createAction(
	"[Auth] Set stepper show",
	props<{ data: boolean }>()
);

