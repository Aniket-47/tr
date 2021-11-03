import { environment } from '../../../environments/environment';

const basePath = environment.apiDomain + '/api/v1';
const auth = basePath + '/auth';
const master = basePath + '/master';
const account = `${basePath}/account`;

export const api_routes = {
  // auth module
  REGISTER: `${auth}/registration`,
  VERIFICATION: `${auth}/accountverification`,
  VALIDATE_EMAIL: `${auth}/validateemail`,
  VALIDATE_ACCOUNT: `${auth}/accountverification`,
  LOGIN: `${auth}/login`,
  FORGOT_PASSWORD: `${auth}/forgotpassword`,
  RESET_PASSWORD: `${auth}/resetpassword/$resetPassToken`,
};

export const secure_api_routes = {
  // auth module
  CHANGE_PASSWORD: `${auth}/changepassword`,
  REFRESH_TOKEN: `${auth}/token/$refreshToken`,
  LOGOUT_ALL: `${auth}/logout/all`,
  LOGOUT: `${auth}/logout`,

  // permission
  ACCOUNT_LIST: `${auth}/user/account`,
  ACCOUNT: `${basePath}/account`,
  USER: `${auth}/user`,
  USER_UPDATE: `${auth}/user`,

  //master
  COUNTRY_LIST: `${master}/countries`,
  STATE_LIST: `${master}/states`,
  CITY_LIST: `${master}/cities`,
  INDUSTRY_LIST: `${master}/industries`,
  // ACCOUNT: `${auth}/account`,
  USER_LIST: `${basePath}/account/userslist`,
  USER_ROLES: `${account}/role`
};
