import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Iauth } from "../interface/auth";

const getAuthState = createFeatureSelector<Iauth>('auth');
 
export const getCurrentStepper = createSelector(
    getAuthState,
    state => state.currentStepper
);

export const getStepper = createSelector(
    getAuthState,
    state => state.stepper
);

export const getRoles = createSelector(
    getAuthState,
    state => state.roles
);

