import { createAction, props } from "@ngrx/store";

export const setStepper = createAction(
	"[Auth] Save stepper",
	props<{ data: number }>()
);

