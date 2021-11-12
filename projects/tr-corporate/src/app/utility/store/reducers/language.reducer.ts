import { Action, createReducer, on } from "@ngrx/store";
import * as LanguageActions from "../actions/language.action";

export const initialState = {
    list: {}
};

export const languageReducer = createReducer(
    initialState,

    on(LanguageActions.setLanguage, (state, action) => {
        return {
            ...state,
            list: action.data
        };
    }),
);
