export const ROUTE_CONFIGS = {
  AUTH: '/auth',
  LOGIN: '/auth/login',
  REGISTER1: '/auth/selectrole',
  REGISTER2: '/auth/regiister',
  DASHBOARD: '/dashboard',
  SETTINGS_DASHBOARD: '/dashboard/settings'
}

export const routerPermission = {
    SETTINGS_DASHBOARD: true
}

export const routerConfig = {
  auth: '/auth/login',
  dashboard: '/dashboard',
  permissions: [
    { url: '/dashboard/settings/dashboard', access: true },
    { url: '/dashboard/settings/permission/users', access: false }
  ]
};

