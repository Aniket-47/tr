import { createAction, props } from "@ngrx/store";
import { APP_ACTIONS } from "../action.constants";

export const setAppTheme = createAction(
	APP_ACTIONS.appThemeAction,
	props<{ data: string }>()
);

export const setAppLoader = createAction(
	APP_ACTIONS.appLoaderAction,
	props<{ data: boolean }>()
);

