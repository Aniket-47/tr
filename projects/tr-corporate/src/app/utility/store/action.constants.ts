// App
const appThemeAction = "[App] Save app theme";
const appLoaderAction = "[App] Save app loader";

export const APP_ACTIONS = { appThemeAction, appLoaderAction} ;

// user
export const enum UserActions {
    USER_DATA_ACTION = "[USER] Set user data",
    USER_STATUS_ACTION = "[USER] Set user login status",
    USER_ACCOUNTS_SET_ACTION = "[USER] Set user account data",
    USER_REMOVE_ACTION = "[USER] Remove user data",
}
