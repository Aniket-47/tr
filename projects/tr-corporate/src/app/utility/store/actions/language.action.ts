import { createAction, props } from "@ngrx/store";
import { LanguageActions } from "../action.constants";

export const setLanguage = createAction(
    LanguageActions.LANGUAGE_SET_ACTION,
    props<{ data: any }>()
);


