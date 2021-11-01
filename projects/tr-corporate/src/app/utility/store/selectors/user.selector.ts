import { createSelector } from "@ngrx/store";
import { Iuser } from "../interfaces/user";
import { State } from "../reducers";

export const selectAppState = (state: State) => state.user;
 
export const getUserStatus = createSelector(
    selectAppState,
  (state: Iuser) => state.isLoggedIn
);

export const getUser = createSelector(
    selectAppState,
  (state: Iuser) => state
);
