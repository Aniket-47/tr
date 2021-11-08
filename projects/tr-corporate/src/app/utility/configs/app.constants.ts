export const enum LSkeys {
  BEARER_TOKEN = "bearerToken",
  USER_EMAIL = "userEmail",
  USER_NAME = "userName",
  DEVICE_GUID = "deviceGuid"
}

export const ValidationConstants = {
  passwordStrategy: {
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 15,
    PASSWORD_PATTON: ""
  },
  userAccountStrategy:{
    NAME_MIN_LENGTH: 3,
    NAME_MAX_LENGTH: 20,
    PHONE_MIN_LENGTH: 8,
  }
}
export const userRoles = [
  { id: 1, name: 'Corporate' },
  { id: 2, name: 'Staffing' },
];
