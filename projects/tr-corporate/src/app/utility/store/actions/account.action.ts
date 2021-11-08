import { createAction, props } from "@ngrx/store";
import { AccountActions } from "../action.constants";
import { IaccountDetials, IaccountList } from "../interfaces/account";

export const setAccountList = createAction(
    AccountActions.ACC_LIST_ACTION,
    props<{ data: IaccountList[] }>()
);

export const setAccountDeatils = createAction(
    AccountActions.ACC_DETAILS_ACTION,
    props<{ data: IaccountDetials }>()
);

