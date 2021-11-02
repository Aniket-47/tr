import { createSelector } from "@ngrx/store";
import { Iuser } from "../interfaces/user";
import { State } from "../reducers";

export const selectAppState = (state: State) => state.user;
 
export const getUserStatus = createSelector(
    selectAppState,
    (state: Iuser) => state.isLoggedIn
);

export const getUserName = createSelector(
    selectAppState,
    (state: Iuser) => state.name
);

export const getDefaultAccountId = createSelector(
    selectAppState,
    (state: Iuser) => state.accountIDs.length ? state.accountIDs : []
);

export const getDefaultAccountIds = createSelector(
  selectAppState,
  (state: Iuser) => state.accountIDs
);
