import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Iauth } from "../interface/auth";

const getAuthState = createFeatureSelector<Iauth>('auth');
 
export const getStepper = createSelector(
    getAuthState,
    state => state.stepper.stepList
);

export const isActiveStepper = createSelector(
    getAuthState,
    state => state.stepper.showStepper
);

export const getActiveStepperIndex = createSelector(
    getAuthState,
    state => state.stepper.active
);

export const getSelectedRole = createSelector(
    getAuthState,
    state => state.selectedRole
);
