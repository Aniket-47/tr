import { environment } from './../../environments/environment';


export const api_routes = {
  REGISTER: '${environment.authApiBasePath}/registration',
  VERIFICATION: '${environment.authApiBasePath}/accountverification',
  VALIDATE_EMAIL: '${environment.authApiBasePath}/validateemail',
  LOGIN: '${environment.authApiBasePath}/login'
};

export const secure_api_routes = {
  CHANGE_PASSWORD: '${environment.authApiBasePath}/changepassword',
  REFRESH_TOKEN: '${environment.authApiBasePath}/token/$refreshToken',
  LOGOUT_ALL: '${environment.authApiBasePath}/logout/all',
  RESET_PASSWORD: '${environment.authApiBasePath}/resetpassword/$resetPassToken',
  FORGOT_PASSWORD: '${environment.authApiBasePath}/forgotpassword',
  LOGOUT: '${environment.authApiBasePath}/logout'
};
