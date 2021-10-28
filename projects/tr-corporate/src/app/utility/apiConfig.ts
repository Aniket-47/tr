export const api_routes = {
  REGISTER: 'registration',
  VERIFICATION: 'accountverification',
  VALIDATE_EMAIL: 'validateemail',
  LOGIN: 'login'
};

export const secure_api_routes = {
  CHANGE_PASSWORD: 'changepassword',
  REFRESH_TOKEN: 'token/$refreshToken',
  LOGOUT_ALL: 'logout/all',
  RESET_PASSWORD: 'resetpassword/$resetPassToken',
  FORGOT_PASSWORD: 'forgotpassword',
  LOGOUT: 'logout'
};
