import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Iauth } from "../interface/auth";

const getAuthState = createFeatureSelector<Iauth>('auth');
 
export const getCurrentStepper = createSelector(
    getAuthState,
    state => state.currentStepper
);

