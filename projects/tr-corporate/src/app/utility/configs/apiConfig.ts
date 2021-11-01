import { environment } from '../../../environments/environment';

const basePath = environment.apiDomain + '/api/v1';
const auth = basePath + '/auth';

export const api_routes = {
  // auth module
  REGISTER: `${auth}/registration`,
  VERIFICATION: `${auth}/accountverification`,
  VALIDATE_EMAIL: `${auth}/validateemail`,
  LOGIN: `${auth}/login`,
  FORGOT_PASSWORD: `${auth}/forgotpassword`
};

export const secure_api_routes = {
  // auth module
  CHANGE_PASSWORD: `${auth}/changepassword`,
  REFRESH_TOKEN: `${auth}/token/$refreshToken`,
  LOGOUT_ALL: `${auth}/logout/all`,
  RESET_PASSWORD: `${auth}/resetpassword/$resetPassToken`,
  LOGOUT: `${auth}/logout`,

  // permission
  ACCOUNT_LIST: `${auth}/user/account`
};
