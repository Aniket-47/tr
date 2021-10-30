import { createSelector } from "@ngrx/store";
import { Iauth } from "../interface/auth";
import { AuthFeatureState } from "../reducers";

export const selectAppState = (state: AuthFeatureState) => state.auth;
 
export const getCurrentStepper = createSelector(
    selectAppState,
  (state: Iauth) => state.currentStepper
);

