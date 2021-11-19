import { Action, createReducer, on } from "@ngrx/store";
import * as BusVetActions from '../actions/business-vertical.action';
import { IBusVert } from "../interfaces/business-vertical";

export const initialState: IBusVert[] = []

export const busVertReducer = createReducer(
    initialState,

    on(BusVetActions.setBusinessVerticle, (state, action) => {
        return {
            ...state,
            ...action.data
        };
    }),
);
