import { createSelector } from "@ngrx/store";
import { IBusVert } from "../interfaces/business-vertical";
import { State } from "../reducers";

export const selectBusVertState = (state: State) => state.businessVerticles;

export const getBusinessVerticle = createSelector(
    selectBusVertState,
    (state: IBusVert[]) => state
);

