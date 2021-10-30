import { createAction, props } from "@ngrx/store";

export const setStepper = createAction(
	"[AUTH] Save stepper",
	props<{ data: number }>()
);

