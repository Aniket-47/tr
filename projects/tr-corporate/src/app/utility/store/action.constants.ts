// App
const appThemeAction = "[App] Save app theme";
const appLoaderAction = "[App] Save app loader";

export const APP_ACTIONS = { appThemeAction, appLoaderAction };

// user
export const enum UserActions {
    USER_DATA_ACTION = "[USER] Set user data",
    USER_STATUS_ACTION = "[USER] Set user login status",
    USER_ADDRESS_ACTION = "[USER] Set user address",
    USER_REMOVE_ACTION = "[USER] Remove user data",
}

// account
export const enum AccountActions {
    ACC_LIST_ACTION = "[ACCOUNT] Set account list",
    ACC_DETAILS_ACTION = "[ACCOUNT] Set account deatils",
}
