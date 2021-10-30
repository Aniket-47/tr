import { createAction, props } from "@ngrx/store";

export const setAppTheme = createAction(
	"[APP] Save app theme",
	props<{ data: string }>()
);

export const setAppLoader = createAction(
	"[APP] Save app loader",
	props<{ data: boolean }>()
);

